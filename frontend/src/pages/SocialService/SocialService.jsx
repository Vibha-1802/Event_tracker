import { useState, useEffect } from 'react';
import { socialAPI } from '../../services/api';
import Modal from '../../components/Modal/Modal';
import '../../styles/table.css';

const SocialService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    location: '', date: '', certificate: '', photos: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const photosArray = formData.photos.split(',').map(s => s.trim()).filter(s => s);
      await socialAPI.create({ 
        staffId: user.staffId, 
        location: formData.location,
        dates: [formData.date],
        certificate: formData.certificate,
        photos: photosArray
      });
      setIsModalOpen(false);
      fetchServices();
      setFormData({ location: '', date: '', certificate: '', photos: '' });
    } catch(err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await socialAPI.getAll();
      setServices(res.data || []);
    } catch (err) {
      console.error('Failed to fetch Social Services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="page-container animate-fade-in delay-2">
      <div className="page-header-flex">
        <div>
          <h2>Social Service</h2>
          <p className="text-secondary">Community work and social impact.</p>
        </div>
        <button className="action-btn" onClick={() => setIsModalOpen(true)}>Add Record</button>
      </div>

      <div className="glass-panel data-table-container">
        {loading ? (
          <div className="loading-state" style={{padding: '2rem'}}>Loading...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Staff ID</th>
                <th>Date</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc._id}>
                  <td>{svc.location}</td>
                  <td>{svc.staff?.staffId}</td>
                  <td>{svc.dates && svc.dates.length > 0 ? new Date(svc.dates[0]).toLocaleDateString() : 'N/A'}</td>
                  <td style={{display: 'flex', gap: '8px'}}>
                    {svc.certificate && <a href={svc.certificate} target="_blank" rel="noreferrer" className="status-badge status-published">View Certificate</a>}
                    {svc.photos && svc.photos.length > 0 && <a href={svc.photos[0]} target="_blank" rel="noreferrer" className="status-badge status-published">View Photos</a>}
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No social services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Social Service">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Location</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Certificate URL</label>
            <input type="url" placeholder="https://drive.google.com/..." value={formData.certificate} onChange={e => setFormData({...formData, certificate: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Photos URLs (Comma separated)</label>
            <input type="text" placeholder="https://..." value={formData.photos} onChange={e => setFormData({...formData, photos: e.target.value})} />
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

export default SocialService;
