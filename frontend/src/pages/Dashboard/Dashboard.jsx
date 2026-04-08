import { useState, useEffect } from 'react';
import { FileText, Lightbulb, BookOpen, Heart } from 'lucide-react';
import { paperAPI, patentAPI, fdpAPI, socialAPI, combinedAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import './Dashboard.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState({ papers: 0, patents: 0, fdps: 0, social: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user.role === 'Admin') {
          const [papers, patents, fdps, socials] = await Promise.all([
            paperAPI.getAll(),
            patentAPI.getAll(),
            fdpAPI.getAll(),
            socialAPI.getAll()
          ]);
          setStats({
            papers: papers.count || 0,
            patents: patents.count || 0,
            fdps: fdps.count || 0,
            social: socials.count || 0
          });

          const allItems = [
            ...(papers.data || []).map(p => ({ type: 'Paper', title: p.topic, staff: p.staff?.staffId, status: p.status, id: p._id })),
            ...(patents.data || []).map(p => ({ type: 'Patent', title: p.topic, staff: p.staff?.staffId, status: p.status, id: p._id })),
            ...(fdps.data || []).map(f => ({ type: 'FDP', title: f.topic, staff: f.staff?.staffId, status: 'Registered', id: f._id })),
            ...(socials.data || []).map(s => ({ type: 'Social', title: s.location, staff: s.staff?.staffId, status: 'Registered', id: s._id }))
          ];
          allItems.sort((a, b) => (a.id < b.id ? 1 : -1));
          setRecent(allItems.slice(0, 5));
        } else {
          const myData = await combinedAPI.getByStaffId(user.staffId);
          setStats({
            papers: myData.paper ? myData.paper.length : 0,
            patents: myData.patent ? myData.patent.length : 0,
            fdps: myData.fdp ? myData.fdp.length : 0,
            social: myData.socialService ? myData.socialService.length : 0
          });
          
          const allItems = [
            ...(myData.paper || []).map(p => ({ type: 'Paper', title: p.topic, staff: p.staff?.staffId, status: p.status, id: p._id })),
            ...(myData.patent || []).map(p => ({ type: 'Patent', title: p.topic, staff: p.staff?.staffId, status: p.status, id: p._id })),
            ...(myData.fdp || []).map(f => ({ type: 'FDP', title: f.topic, staff: f.staff?.staffId, status: 'Registered', id: f._id })),
            ...(myData.socialService || []).map(s => ({ type: 'Social', title: s.location, staff: s.staff?.staffId, status: 'Registered', id: s._id }))
          ];
          allItems.sort((a, b) => (a.id < b.id ? 1 : -1));
          setRecent(allItems.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h2>{user.role === 'Admin' ? 'Admin Dashboard' : 'Professor Dashboard'}</h2>
        <p>Welcome back, {user.staffId}. Here is your overview.</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading dashboard...</div>
      ) : (
        <div className="stats-grid">
          <Card title="Your Papers" value={stats.papers} icon={FileText} color="210" delay="1" />
          <Card title="Your Patents" value={stats.patents} icon={Lightbulb} color="45" delay="2" />
          <Card title="Your FDPs" value={stats.fdps} icon={BookOpen} color="280" delay="3" />
          <Card title="Social Service" value={stats.social} icon={Heart} color="330" delay="4" />
        </div>
      )}

      {/* Decorative large glass panel for future content like charts */}
      <div className="glass-panel main-chart animate-fade-in delay-2">
        <div className="chart-header">
          <h3>Recent Activity</h3>
          <span className="badge">Updated just now</span>
        </div>
        <div className="recent-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {recent.length === 0 ? <p>No recent activity found.</p> : recent.map((item, idx) => (
             <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
               <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                 <span style={{color: 'var(--text-primary)', fontWeight: '500'}}>{item.title}</span>
                 <span style={{color: 'var(--text-secondary)', fontSize: '0.85rem'}}>{item.staff} • {item.type}</span>
               </div>
               <div>
                  <span className={`status-badge ${item.status === 'On Hold' ? 'status-on-hold' : 'status-published'}`}>{item.status}</span>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
