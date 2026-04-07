import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import '../../styles/table.css';

const Admin = () => {
  const [onHoldPapers, setOnHoldPapers] = useState([]);
  const [onHoldPatents, setOnHoldPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHoldItems = async () => {
    setLoading(true);
    try {
      const [papers, patents] = await Promise.all([
        adminAPI.getOnHoldPapers(),
        adminAPI.getOnHoldPatents()
      ]);
      setOnHoldPapers(papers.data || []);
      setOnHoldPatents(patents.data || []);
    } catch (err) {
      console.error('Failed to fetch on-hold items', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldItems();
  }, []);

  const handleApprovePaper = async (id) => {
    try {
      await adminAPI.changePaperStatus(id, 'Published');
      fetchHoldItems();
    } catch (err) {
      console.error("Failed to approve paper", err);
      // Optional: show a toast
    }
  };

  const handleApprovePatent = async (id) => {
    try {
      await adminAPI.changePatentStatus(id, 'Accepted');
      fetchHoldItems();
    } catch (err) {
      console.error("Failed to approve patent", err);
    }
  };

  return (
    <div className="page-container animate-fade-in delay-3" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div className="page-header">
        <h2>Admin Management</h2>
        <p className="text-secondary">Approve or reject on-hold items.</p>
      </div>

      <div className="glass-panel data-table-container">
        <h3 style={{padding: '1.5rem', borderBottom: '1px solid hsla(0,0%,100%,0.05)'}}>On Hold Papers</h3>
        {loading ? (
          <div className="loading-state" style={{padding: '2rem'}}>Loading...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Staff ID</th>
                <th>Event Name</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {onHoldPapers.map((paper) => (
                <tr key={paper._id}>
                  <td>{paper.topic}</td>
                  <td>{paper.staff?.staffId}</td>
                  <td>{paper.eventName}</td>
                  <td>
                    <span className="status-badge status-on-hold">{paper.status}</span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => handleApprovePaper(paper._id)}>Approve</button>
                  </td>
                </tr>
              ))}
              {onHoldPapers.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No papers on hold.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="glass-panel data-table-container">
        <h3 style={{padding: '1.5rem', borderBottom: '1px solid hsla(0,0%,100%,0.05)'}}>On Hold Patents</h3>
        {loading ? (
          <div className="loading-state" style={{padding: '2rem'}}>Loading...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Staff ID</th>
                <th>Date</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {onHoldPatents.map((patent) => (
                <tr key={patent._id}>
                  <td>{patent.topic}</td>
                  <td>{patent.staff?.staffId}</td>
                  <td>{new Date(patent.date).toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge status-on-hold">{patent.status}</span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => handleApprovePatent(patent._id)}>Approve</button>
                  </td>
                </tr>
              ))}
              {onHoldPatents.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No patents on hold.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
