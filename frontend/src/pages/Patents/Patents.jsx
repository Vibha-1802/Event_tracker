import { useState, useEffect } from 'react';
import { patentAPI } from '../../services/api';
import '../../styles/table.css';

const Patents = () => {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatents = async () => {
      try {
        const res = await patentAPI.getAll();
        setPatents(res.data || []);
      } catch (err) {
        console.error('Failed to fetch patents', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatents();
  }, []);

  const getStatusClass = (status) => {
    if (status?.toLowerCase() === 'accepted' || status?.toLowerCase() === 'grant') return 'status-published';
    if (status?.toLowerCase() === 'on hold') return 'status-on-hold';
    return '';
  };

  return (
    <div className="page-container animate-fade-in delay-1">
      <div className="page-header-flex">
        <div>
          <h2>Patents</h2>
          <p className="text-secondary">View and manage all registered patents.</p>
        </div>
        <button className="action-btn">Register New Patent</button>
      </div>

      <div className="glass-panel data-table-container">
        {loading ? (
          <div className="loading-state" style={{padding: '2rem'}}>Loading patents...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Domain</th>
                <th>Staff ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patents.map((patent) => (
                <tr key={patent._id}>
                  <td>{patent.topic}</td>
                  <td>{patent.domain?.join(', ')}</td>
                  <td>{patent.staff?.staffId}</td>
                  <td>{new Date(patent.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(patent.status)}`}>
                      {patent.status}
                    </span>
                  </td>
                </tr>
              ))}
              {patents.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No patents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Patents;
