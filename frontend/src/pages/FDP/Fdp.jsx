import { useState, useEffect } from 'react';
import { fdpAPI } from '../../services/api';
import '../../styles/table.css';

const Fdp = () => {
  const [fdps, setFdps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFdps = async () => {
      try {
        const res = await fdpAPI.getAll();
        setFdps(res.data || []);
      } catch (err) {
        console.error('Failed to fetch FDPs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFdps();
  }, []);

  return (
    <div className="page-container animate-fade-in delay-2">
      <div className="page-header-flex">
        <div>
          <h2>Faculty Development Programs (FDP)</h2>
          <p className="text-secondary">Monitor faculty development progress and achievements.</p>
        </div>
        <button className="action-btn">Add FDP Record</button>
      </div>

      <div className="glass-panel data-table-container">
        {loading ? (
          <div className="loading-state" style={{padding: '2rem'}}>Loading FDPs...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Skills Gained</th>
                <th>Staff ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {fdps.map((fdp) => (
                <tr key={fdp._id}>
                  <td>{fdp.topic}</td>
                  <td>{fdp.skillsGained?.join(', ')}</td>
                  <td>{fdp.staff?.staffId}</td>
                  <td>{fdp.dates && fdp.dates.length > 0 ? new Date(fdp.dates[0]).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
              {fdps.length === 0 && (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No FDPs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Fdp;
