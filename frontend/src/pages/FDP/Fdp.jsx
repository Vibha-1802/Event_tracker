import { useState, useEffect } from 'react';
import { fdpAPI } from '../../services/api';
import Modal from '../../components/Modal/Modal';
import '../../styles/table.css';
import '../../styles/table.css';

const Fdp = () => {
  const [fdps, setFdps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    topic: '', skillsGained: '', date: '', certificate: '', photos: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skills = formData.skillsGained.split(',').map(s => s.trim());
      const photosArray = formData.photos ? formData.photos.split(',').map(s => s.trim()).filter(s=>s) : [];
      await fdpAPI.create({ ...formData, skillsGained: skills, dates: [formData.date], photos: photosArray, staffId: user.staffId });
      setIsModalOpen(false);
      const res = await fdpAPI.getAll();
      setFdps(res.data || []);
      setFormData({ topic: '', skillsGained: '', date: '', certificate: '', photos: '' });
    } catch(err) {
      console.error(err);
    }
  };

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
        <button className="action-btn" onClick={() => setIsModalOpen(true)}>Add FDP Record</button>
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
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              {fdps.map((fdp) => (
                <tr key={fdp._id}>
                  <td>{fdp.topic}</td>
                  <td>{fdp.skillsGained?.join(', ')}</td>
                  <td>{fdp.staff?.staffId}</td>
                  <td>{fdp.dates && fdp.dates.length > 0 ? new Date(fdp.dates[0]).toLocaleDateString() : 'N/A'}</td>
                  <td style={{display: 'flex', gap: '8px'}}>
                    {fdp.certificate && <a href={fdp.certificate} target="_blank" rel="noreferrer" className="status-badge status-published">Certificate</a>}
                    {fdp.photos && fdp.photos.length > 0 && <a href={fdp.photos[0]} target="_blank" rel="noreferrer" className="status-badge status-published">Photos</a>}
                  </td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add FDP Record">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Topic</label>
            <input type="text" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Skills Gained (Comma separated)</label>
            <input type="text" value={formData.skillsGained} onChange={e => setFormData({...formData, skillsGained: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Certificate URL</label>
            <input type="url" value={formData.certificate} onChange={e => setFormData({...formData, certificate: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Photos URLs (Comma separated)</label>
            <input type="text" value={formData.photos} onChange={e => setFormData({...formData, photos: e.target.value})} />
          </div>
          <div className="modal-footer">
            <button type="button" className="action-btn" style={{background: 'var(--border-color)'}} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="action-btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Fdp;
