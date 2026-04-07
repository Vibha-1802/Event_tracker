import { useState, useEffect } from 'react';
import { paperAPI } from '../../services/api';
import '../../styles/table.css';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await paperAPI.getAll();
        setPapers(res.data || []);
      } catch (err) {
        console.error('Failed to fetch papers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const getStatusClass = (status) => {
    if (status?.toLowerCase() === 'published') return 'status-published';
    if (status?.toLowerCase() === 'on hold') return 'status-on-hold';
    return '';
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header-flex">
        <div>
          <h2>Papers</h2>
          <p className="text-secondary">Manage and view all technical papers.</p>
        </div>
        <button className="action-btn">Submit New Paper</button>
      </div>

      <div className="glass-panel data-table-container">
        {loading ? (
          <div className="loading-state" style={{padding: '2rem'}}>Loading papers...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Domain</th>
                <th>Publisher</th>
                <th>Staff ID</th>
                <th>Event Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper._id}>
                  <td>{paper.topic}</td>
                  <td>{paper.domain?.join(', ')}</td>
                  <td>{paper.publisher}</td>
                  <td>{paper.staff?.staffId}</td>
                  <td>{paper.eventName}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(paper.status)}`}>
                      {paper.status}
                    </span>
                  </td>
                </tr>
              ))}
              {papers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No papers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Papers;
