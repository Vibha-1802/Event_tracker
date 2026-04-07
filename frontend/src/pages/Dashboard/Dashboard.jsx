import { useState, useEffect } from 'react';
import { FileText, Lightbulb, BookOpen, Activity } from 'lucide-react';
import { paperAPI, patentAPI, fdpAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ papers: 0, patents: 0, fdps: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [papers, patents, fdps] = await Promise.all([
          paperAPI.getAll(),
          patentAPI.getAll(),
          fdpAPI.getAll()
        ]);
        setStats({
          papers: papers.count || 0,
          patents: patents.count || 0,
          fdps: fdps.count || 0,
        });

        const allItems = [
          ...(papers.data || []).map(p => ({ type: 'Paper', title: p.topic, staff: p.staff?.staffId, status: p.status, id: p._id })),
          ...(patents.data || []).map(p => ({ type: 'Patent', title: p.topic, staff: p.staff?.staffId, status: p.status, id: p._id })),
          ...(fdps.data || []).map(f => ({ type: 'FDP', title: f.topic, staff: f.staff?.staffId, status: 'Registered', id: f._id }))
        ];
        allItems.sort((a, b) => (a.id < b.id ? 1 : -1));
        setRecent(allItems.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
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
          <Card title="Total Papers" value={stats.papers} icon={FileText} color="210" delay="1" />
          <Card title="Total Patents" value={stats.patents} icon={Lightbulb} color="45" delay="2" />
          <Card title="Total FDPs" value={stats.fdps} icon={BookOpen} color="280" delay="3" />
          <Card title="System Activity" value="Online" icon={Activity} color="145" delay="1" />
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
