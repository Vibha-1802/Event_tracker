import { useState, useEffect } from 'react';
import { patentAPI } from '../../services/api';
import Modal from '../../components/Modal/Modal';
import '../../styles/table.css';
import '../../styles/table.css';

const Patents = () => {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    topic: '', domain: '', date: '', pdf: '', approvalProof: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const domains = formData.domain.split(',').map(d => d.trim());
      await patentAPI.create({ ...formData, domain: domains, staffId: user.staffId, status: 'On Hold' });
      setIsModalOpen(false);
      const res = await patentAPI.getAll();
      setPatents(res.data || []);
      setFormData({ topic: '', domain: '', date: '', pdf: '', approvalProof: '' });
    } catch(err) {
      console.error(err);
    }
  };

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
        <button className="action-btn" onClick={() => setIsModalOpen(true)}>Register New Patent</button>
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
                <th>Files</th>
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
                  <td style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    {patent.pdf && <a href={patent.pdf} target="_blank" rel="noreferrer" className="status-badge status-published">PDF</a>}
                    {patent.approvalProof && <a href={patent.approvalProof} target="_blank" rel="noreferrer" className="status-badge status-published">Proof</a>}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patent">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Topic</label>
            <input type="text" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Domain (Comma separated)</label>
            <input type="text" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>PDF URL (Google Drive, etc.)</label>
            <input type="url" value={formData.pdf} onChange={e => setFormData({...formData, pdf: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Approval Proof URL</label>
            <input type="url" value={formData.approvalProof} onChange={e => setFormData({...formData, approvalProof: e.target.value})} />
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

export default Patents;
