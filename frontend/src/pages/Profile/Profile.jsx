import { useState, useEffect } from 'react';
import { profileAPI, combinedAPI, userAPI } from '../../services/api';
import { FileText, Lightbulb, BookOpen, Heart, Lock } from 'lucide-react';
import Modal from '../../components/Modal/Modal';
import '../../styles/table.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState({ paper: [], patent: [], fdp: [], social: [] });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    name: '', age: '', phoneNumber: '', gmail: '', designation: '', department: '', expertise: '', joiningDate: '', photo: ''
  });

  const fetchProfile = async () => {
    try {
      const dbData = await combinedAPI.getByStaffId(user.staffId);
      if (dbData.profile && dbData.profile.length > 0) {
        setProfile(dbData.profile[0]);
      }
      setActivities({
        paper: dbData.paper || [],
        patent: dbData.patent || [],
        fdp: dbData.fdp || [],
        social: dbData.socialService || []
      });
    } catch (err) {
      console.error('Failed to fetch Profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await userAPI.changePassword(user.staffId, passwordForm.newPassword);
      alert("Password updated successfully!");
      setIsPasswordModalOpen(false);
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert("Failed to reset password");
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
              <div style={{marginTop: '0.8rem'}}>
                <button 
                  onClick={() => setIsPasswordModalOpen(true)} 
                  style={{padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', transition: 'background 0.2s'}}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <Lock size={16} /> Reset Password
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '2rem 0'}}>
             <p className="text-secondary" style={{marginBottom: '1rem'}}>No profile registered in the system yet.</p>
          </div>
        )}
      </div>

      {!loading && (
        <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <h2 style={{fontSize: '1.3rem'}}>Professional Contributions</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
            
            {/* Papers */}
            <div className="glass-panel" style={{padding: '1.5rem'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', marginBottom: '1rem'}}><FileText size={18} /> Papers ({activities.paper.length})</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                {activities.paper.length === 0 ? <p className="text-secondary">No recorded papers.</p> : activities.paper.map(p => (
                  <div key={p._id} style={{padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <p style={{fontWeight: 500}}>{p.topic}</p>
                      <p className="text-secondary" style={{fontSize: '0.85rem'}}>{p.eventName} ({p.publisher})</p>
                    </div>
                    <span className="status-badge status-published">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Patents */}
            <div className="glass-panel" style={{padding: '1.5rem'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', marginBottom: '1rem'}}><Lightbulb size={18} /> Patents ({activities.patent.length})</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                {activities.patent.length === 0 ? <p className="text-secondary">No recorded patents.</p> : activities.patent.map(p => (
                  <div key={p._id} style={{padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <p style={{fontWeight: 500}}>{p.topic}</p>
                      <p className="text-secondary" style={{fontSize: '0.85rem'}}>{new Date(p.date).toLocaleDateString()}</p>
                    </div>
                    <span className="status-badge status-published">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FDP */}
            <div className="glass-panel" style={{padding: '1.5rem'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', marginBottom: '1rem'}}><BookOpen size={18} /> Faculty Dev Programs ({activities.fdp.length})</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                {activities.fdp.length === 0 ? <p className="text-secondary">No FDPs recorded.</p> : activities.fdp.map(f => (
                  <div key={f._id} style={{padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
                    <p style={{fontWeight: 500}}>{f.topic}</p>
                    <p className="text-secondary" style={{fontSize: '0.85rem'}}>Skills: {f.skillsGained?.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Service */}
            <div className="glass-panel" style={{padding: '1.5rem'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', marginBottom: '1rem'}}><Heart size={18} /> Social Service ({activities.social.length})</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                {activities.social.length === 0 ? <p className="text-secondary">No social service recorded.</p> : activities.social.map(s => (
                  <div key={s._id} style={{padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--border-color)'}}>
                    <p style={{fontWeight: 500}}>{s.location}</p>
                    <p className="text-secondary" style={{fontSize: '0.85rem'}}>{s.dates && s.dates.length > 0 ? new Date(s.dates[0]).toLocaleDateString() : 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

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

      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Reset Password">
        <form onSubmit={handlePasswordSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" required value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" required value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} />
          </div>
          <div className="modal-footer">
            <button type="button" className="action-btn" style={{background: 'var(--border-color)'}} onClick={() => setIsPasswordModalOpen(false)}>Cancel</button>
            <button type="submit" className="action-btn" style={{background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))'}}>Confirm Reset</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
