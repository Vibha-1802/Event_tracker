import { useState, useEffect } from 'react';
import { paperAPI } from '../../services/api';
import Modal from '../../components/Modal/Modal';
import '../../styles/table.css';
import '../../styles/table.css';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    topic: '', domain: '', publisher: '', eventName: '', eventDates: '', location: '', pdf: '', certificate: '', photos: '', bill: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const domains = formData.domain.split(',').map(d => d.trim());
      const photosArray = formData.photos ? formData.photos.split(',').map(d => d.trim()).filter(d=>d) : [];
      // Map eventDates to array to strict match Mongoose Schema: [{type:Date}]
      const datesArray = formData.eventDates ? formData.eventDates.split(',').map(d => d.trim()).filter(d=>d) : [];
      await paperAPI.create({ ...formData, domain: domains, photos: photosArray, eventDates: datesArray, staffId: user.staffId, status: 'On Hold' });
      setIsModalOpen(false);
      const res = await paperAPI.getAll();
      setPapers(res.data || []);
      setFormData({ topic: '', domain: '', publisher: '', eventName: '', eventDates: '', location: '', pdf: '', certificate: '', photos: '', bill: '' });
    } catch(err) {
      console.error(err);
    }
  };

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
        <button className="action-btn" onClick={() => setIsModalOpen(true)}>Submit New Paper</button>
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
                <th>Files</th>
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
                  <td style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    {paper.pdf && <a href={paper.pdf} target="_blank" rel="noreferrer" className="status-badge status-published">PDF</a>}
                    {paper.certificate && <a href={paper.certificate} target="_blank" rel="noreferrer" className="status-badge status-published">Certificate</a>}
                    {paper.photos && paper.photos.length > 0 && <a href={paper.photos[0]} target="_blank" rel="noreferrer" className="status-badge status-published">Photos</a>}
                    {paper.bill && <a href={paper.bill} target="_blank" rel="noreferrer" className="status-badge status-published">Bill</a>}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit New Paper">
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
            <label>Publisher</label>
            <input type="text" value={formData.publisher} onChange={e => setFormData({...formData, publisher: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Event Name</label>
            <input type="text" value={formData.eventName} onChange={e => setFormData({...formData, eventName: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Event Dates</label>
            <input type="text" value={formData.eventDates} onChange={e => setFormData({...formData, eventDates: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>PDF URL (Google Drive, etc.)</label>
            <input type="url" value={formData.pdf} onChange={e => setFormData({...formData, pdf: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Certificate URL</label>
            <input type="url" value={formData.certificate} onChange={e => setFormData({...formData, certificate: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Photos URLs (Comma separated)</label>
            <input type="text" value={formData.photos} onChange={e => setFormData({...formData, photos: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Bill / Invoice URL</label>
            <input type="url" value={formData.bill} onChange={e => setFormData({...formData, bill: e.target.value})} />
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

export default Papers;
