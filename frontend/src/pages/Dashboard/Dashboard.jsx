import { useState, useEffect } from 'react';
import { FileText, Lightbulb, BookOpen, Activity } from 'lucide-react';
import { paperAPI, patentAPI, fdpAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ papers: 0, patents: 0, fdps: 0 });
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
        <h2>Dashboard Overview</h2>
        <p>A quick summary of all activities in the Event Tracker.</p>
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
        <div className="chart-placeholder">
          <p>No recent activity charts configured yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
