import { useState, useEffect } from 'react';
import { profileAPI } from '../../services/api';
import Modal from '../../components/Modal/Modal';
import '../../styles/table.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    name: '', age: '', phoneNumber: '', gmail: '', designation: '', department: '', expertise: '', joiningDate: '', photo: ''
  });

  const fetchProfile = async () => {
    try {
      const res = await profileAPI.getByStaffId(user.staffId);
      if (res.data && res.data.length > 0) {
        setProfile(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch Profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user.staffId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expertiseArr = formData.expertise ? formData.expertise.split(',').map(s => s.trim()).filter(s=>s) : [];
      await profileAPI.create({ 
        ...formData,
        expertise: expertiseArr,
        staffId: user.staffId
      });
      setIsModalOpen(false);
      fetchProfile();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container animate-fade-in delay-1">
      <div className="page-header-flex">
        <div>
          <h2>Professor Profile</h2>
          <p className="text-secondary">View and edit your personal information.</p>
        </div>
        {!profile && <button className="action-btn" onClick={() => setIsModalOpen(true)}>Create Profile</button>}
      </div>

      <div className="glass-panel" style={{padding: '2rem'}}>
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : profile ? (
          <div style={{display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center'}}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', border: '3px solid var(--border-color)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              {profile.staffId}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1}}>
              <h3 style={{fontSize: '1.8rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}}>{profile.name} <span style={{fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: '400'}}>({profile.designation})</span></h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem'}}>
                <p><strong>Staff ID:</strong> <span className="text-secondary">{profile.staffId}</span></p>
                <p><strong>Department:</strong> <span className="text-secondary">{profile.department}</span></p>
                <p><strong>Email:</strong> <span className="text-secondary">{profile.gmail}</span></p>
                <p><strong>Phone:</strong> <span className="text-secondary">{profile.phoneNumber}</span></p>
                <p><strong>Expertise:</strong> <span className="text-secondary">{Array.isArray(profile.expertise) ? profile.expertise.join(', ') : profile.expertise}</span></p>
                <p><strong>Joined:</strong> <span className="text-secondary">{profile.joiningDate ? new Date(profile.joiningDate).toLocaleDateString() : 'N/A'}</span></p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '2rem 0'}}>
             <p className="text-secondary" style={{marginBottom: '1rem'}}>No profile registered in the system yet.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Profile">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="input-group" style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
            <div style={{flex: 1}}>
              <label>Age</label>
              <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required style={{width: '100%'}} />
            </div>
            <div style={{flex: 1}}>
              <label>Phone Number</label>
              <input type="text" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} required style={{width: '100%'}} />
            </div>
          </div>
          <div className="input-group">
            <label>Gmail</label>
            <input type="email" value={formData.gmail} onChange={e => setFormData({...formData, gmail: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Designation</label>
            <input type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Department</label>
            <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Expertise</label>
            <input type="text" value={formData.expertise} onChange={e => setFormData({...formData, expertise: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Joining Date</label>
            <input type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} required />
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

export default Profile;
