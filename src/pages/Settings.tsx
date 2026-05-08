import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Building, User, MapPin, Camera, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Settings.css';

const Settings = () => {
  const { schoolProfile, updateSchoolProfile } = useApp();
  const [formData, setFormData] = useState(schoolProfile);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div 
      className="settings-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">School Profile Setup</h1>
          <p className="page-subtitle">Configure your school's official information for reports and ID cards.</p>
        </div>
      </div>

      <form className="premium-card settings-form" onSubmit={handleSubmit}>
        <div className="settings-grid">
          <div className="settings-left">
            <div className="logo-upload-section">
              <div className="logo-preview">
                {formData.logo ? <img src={formData.logo} alt="Logo" /> : <Building size={40} />}
              </div>
              <button type="button" className="secondary-btn-sm"><Camera size={16} /> Upload School Logo</button>
            </div>
          </div>

          <div className="settings-right">
            <div className="form-section-settings">
              <h3><Building size={20} /> Basic Information</h3>
              <div className="form-grid-settings">
                <div className="form-group-settings">
                  <label>School Name *</label>
                  <input type="text" className="premium-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group-settings">
                  <label>UDISE Code (Optional)</label>
                  <input type="text" className="premium-input" value={formData.udiseCode} onChange={e => setFormData({...formData, udiseCode: e.target.value})} />
                </div>
                <div className="form-group-settings">
                  <label>Academic Year</label>
                  <select className="premium-input" value={formData.academicYear} onChange={e => setFormData({...formData, academicYear: e.target.value})}>
                    <option>2025-26 (April-March)</option>
                    <option>2024-25 (April-March)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section-settings">
              <h3><User size={20} /> Leadership</h3>
              <div className="form-grid-settings">
                <div className="form-group-settings">
                  <label>Principal/Owner Name *</label>
                  <input type="text" className="premium-input" value={formData.principalName} onChange={e => setFormData({...formData, principalName: e.target.value})} />
                </div>
                <div className="form-group-settings">
                  <label>Contact Number *</label>
                  <input type="tel" className="premium-input" value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-section-settings">
              <h3><MapPin size={20} /> Location Details</h3>
              <div className="form-grid-settings">
                <div className="form-group-settings full-width">
                  <label>Full Address *</label>
                  <textarea className="premium-input" rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="form-group-settings">
                  <label>District</label>
                  <input type="text" className="premium-input" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
                </div>
                <div className="form-group-settings">
                  <label>State</label>
                  <input type="text" className="premium-input" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                </div>
                <div className="form-group-settings">
                  <label>PIN Code</label>
                  <input type="text" className="premium-input" value={formData.pinCode} onChange={e => setFormData({...formData, pinCode: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-actions-settings">
              <button type="submit" className="primary-btn" disabled={saved}>
                {saved ? <><CheckCircle2 size={18} /> Settings Saved</> : <><Save size={18} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Settings;
