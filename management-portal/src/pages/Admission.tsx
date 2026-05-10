import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Users, 
  GraduationCap, 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  Camera,
  ShieldCheck,
  Smartphone,
  Mail,
  AlertTriangle,
  Contact
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Admission.css';

const steps = [
  { id: 'personal', title: 'Personal', icon: <User size={20} /> },
  { id: 'family', title: 'Family', icon: <Users size={20} /> },
  { id: 'contact', title: 'Contact', icon: <Contact size={20} /> },
  { id: 'academic', title: 'Academic', icon: <GraduationCap size={20} /> },
  { id: 'documents', title: 'Documents', icon: <Upload size={20} /> }
];

const Admission = () => {
  const { classes, addStudent, students } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const nextAdmNo = `ADM2025${(students.length + 1).toString().padStart(3, '0')}`;

  const [formData, setFormData] = useState({
    name: '', dob: '', gender: 'Male', aadhaarNumber: '',
    bloodGroup: 'O+', religion: 'Hindu', motherTongue: 'Hindi',
    category: 'General', fatherName: '', motherName: '',
    fatherAadhaar: '', motherAadhaar: '', fatherVoterId: '', motherVoterId: '',
    parentOccupation: '', annualIncome: '', parentContact: '', emergencyContact: '',
    email: '', address: '', pinCode: '', district: '', state: '',
    classId: 'Nursery', section: 'A', medium: 'English', isRTE: false
  });
  
  const [documents, setDocuments] = useState<Record<string, File | null>>({
    studentPhoto: null,
    birthCertificate: null,
    studentAadhaar: null,
    parentAadhaar: null,
    voterId: null
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocuments({ ...documents, [docType]: e.target.files[0] });
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0: return formData.name.trim() !== '' && formData.dob.trim() !== '';
      case 1: return formData.fatherName.trim() !== '' && formData.motherName.trim() !== '';
      case 2: return formData.parentContact.trim() !== '' && formData.emergencyContact.trim() !== '' && formData.address.trim() !== '';
      case 3: return formData.classId.trim() !== '';
      default: return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } else {
      alert("Please fill all required fields (*) before proceeding.");
    }
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSubmitError('');
    try {
      await addStudent({
        ...formData,
        admissionNumber: nextAdmNo,
        status: 'Active',
        attendance: [],
        fees: [],
        marks: [],
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError('Failed to save admission. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="step-content">
            <div className="form-row">
              <div className="form-field flex-2">
                <label>Student Full Name *</label>
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-field">
                <label>Date of Birth *</label>
                <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Gender</label>
                <div className="gender-toggle">
                  {['Male', 'Female', 'Other'].map(g => (
                    <button key={g} type="button" className={formData.gender === g ? 'active' : ''} onClick={() => setFormData({...formData, gender: g as any})}>{g}</button>
                  ))}
                </div>
              </div>
              <div className="form-field">
                <label>Blood Group</label>
                <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})}>
                  <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Student Aadhaar Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX" value={formData.aadhaarNumber} onChange={e => setFormData({...formData, aadhaarNumber: e.target.value})} />
              </div>
              <div className="form-field">
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="step-content">
            <div className="form-row">
              <div className="form-field">
                <label>Father's Name *</label>
                <input type="text" placeholder="Father's Full Name" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
              </div>
              <div className="form-field">
                <label>Mother's Name *</label>
                <input type="text" placeholder="Mother's Full Name" value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Father's Aadhaar</label>
                <input type="text" placeholder="Aadhaar No" value={formData.fatherAadhaar} onChange={e => setFormData({...formData, fatherAadhaar: e.target.value})} />
              </div>
              <div className="form-field">
                <label>Mother's Aadhaar</label>
                <input type="text" placeholder="Aadhaar No" value={formData.motherAadhaar} onChange={e => setFormData({...formData, motherAadhaar: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Father's Voter ID</label>
                <input type="text" placeholder="Voter ID No" value={formData.fatherVoterId} onChange={e => setFormData({...formData, fatherVoterId: e.target.value})} />
              </div>
              <div className="form-field">
                <label>Mother's Voter ID</label>
                <input type="text" placeholder="Voter ID No" value={formData.motherVoterId} onChange={e => setFormData({...formData, motherVoterId: e.target.value})} />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="step-content">
            <div className="form-row">
              <div className="form-field">
                <label>Mobile Number (Primary) *</label>
                <div className="input-with-icon"><Smartphone size={16} /><input type="tel" placeholder="10-digit mobile" value={formData.parentContact} onChange={e => setFormData({...formData, parentContact: e.target.value})} /></div>
              </div>
              <div className="form-field">
                <label>Emergency Mobile No *</label>
                <div className="input-with-icon"><AlertTriangle size={16} /><input type="tel" placeholder="Emergency contact" value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} /></div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field flex-2">
                <label>Email Address</label>
                <div className="input-with-icon"><Mail size={16} /><input type="email" placeholder="example@mail.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
              </div>
            </div>
            <div className="form-field">
              <label>Full Residential Address *</label>
              <textarea rows={3} placeholder="Flat, House No, Street, Area..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="step-content">
            <div className="form-row">
              <div className="form-field">
                <label>Applying For Class *</label>
                <select value={formData.classId} onChange={e => setFormData({...formData, classId: e.target.value})}>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label>Medium of Instruction</label>
                <select value={formData.medium} onChange={e => setFormData({...formData, medium: e.target.value as any})}>
                  <option>English</option><option>Hindi</option>
                </select>
              </div>
            </div>
            <div className="rte-admission-card">
              <div className="rte-info">
                <h4>RTE Admission (Right to Education)</h4>
                <p>Flag if student is eligible for quota admission.</p>
              </div>
              <div className={`custom-toggle ${formData.isRTE ? 'active' : ''}`} onClick={() => setFormData({...formData, isRTE: !formData.isRTE})}><div className="toggle-handle"></div></div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="step-content">
            <div className="upload-grid">
              {[
                { id: 'studentPhoto', label: 'Student Photo', desc: 'JPG/PNG', icon: <Camera size={20} /> },
                { id: 'birthCertificate', label: 'Birth Cert.', desc: 'PDF/Image', icon: <ShieldCheck size={20} /> },
                { id: 'studentAadhaar', label: 'Stdnt Aadhaar', desc: 'PDF/Image', icon: <User size={20} /> },
                { id: 'parentAadhaar', label: 'Prt. Aadhaar', desc: 'Father/Mother', icon: <Users size={20} /> },
                { id: 'voterId', label: 'Voter ID Card', desc: 'Father/Mother Identity Proof', icon: <Smartphone size={20} />, fullWidth: true }
              ].map(doc => (
                <div key={doc.id} className={`upload-box ${doc.fullWidth ? 'full-width-upload' : ''} ${documents[doc.id] ? 'uploaded' : ''}`}>
                  <div className="icon-circle">
                    {documents[doc.id] ? <CheckCircle2 size={20} className="text-green-500" /> : doc.icon}
                  </div>
                  <h4>{doc.label}</h4>
                  <p>{documents[doc.id] ? documents[doc.id]?.name : doc.desc}</p>
                  
                  <input 
                    type="file" 
                    id={`file-${doc.id}`} 
                    className="hidden-file-input" 
                    onChange={(e) => handleFileUpload(e, doc.id)}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <label htmlFor={`file-${doc.id}`} className="upload-btn">
                    {documents[doc.id] ? 'Change File' : 'Upload'}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-screen">
        <div className="success-card premium-card">
          <div className="success-icon-wrap"><CheckCircle2 size={64} /></div>
          <h1>Admission Confirmed!</h1>
          <p>Admission No: <strong>{nextAdmNo}</strong></p>
          <div className="success-actions">
            <button className="primary-btn" onClick={() => window.location.reload()}>New Entry</button>
            <button className="secondary-btn">Print File</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admission-v2">
      <div className="admission-sidebar-info">
        <div className="premium-card school-badge-card"><div className="school-logo-small">LH</div><div><h3>Little Hearts</h3><p>Enrollment Panel</p></div></div>
        <div className="steps-vertical">
          {steps.map((step, idx) => (
            <div key={step.id} className={`step-item ${idx <= currentStep ? 'completed' : ''} ${idx === currentStep ? 'active' : ''}`}>
              <div className="step-number">{idx < currentStep ? <CheckCircle2 size={16} /> : step.icon}</div>
              <div className="step-label"><span>Step 0{idx + 1}</span><strong>{step.title}</strong></div>
            </div>
          ))}
        </div>
        <div className="premium-card live-preview-card">
          <div className="preview-tag">Live Card Preview</div>
          <div className="id-card-lite">
            <div className="id-photo-placeholder">{formData.name ? formData.name[0] : <User size={32} />}</div>
            <div className="id-details-lite"><h4>{formData.name || 'Student Name'}</h4><p>{formData.classId}</p><div className="id-adm-no">{nextAdmNo}</div></div>
          </div>
        </div>
      </div>
      <div className="admission-main-form">
        <div className="form-header-v2"><h2>Admission Form</h2><p>Provide full parent identity and contact details.</p></div>
        <div className="premium-card form-container-v2">
          <form onSubmit={handleSubmit}>
            <div className="form-body-v2">{renderStepContent()}</div>
            <div className="form-footer-v2">
              <button type="button" className="prev-btn" disabled={currentStep === 0 || isSaving} onClick={prevStep}><ArrowLeft size={18} /> Back</button>
              {submitError && <p style={{ color: '#dc2626', fontSize: '13px', margin: '0 auto' }}>{submitError}</p>}
              {currentStep < steps.length - 1 ? (
                <button type="button" className="next-btn primary-btn" onClick={nextStep}>Next <ArrowRight size={18} /></button>
              ) : (
                <button type="submit" className="submit-btn primary-btn" disabled={isSaving}>
                  {isSaving ? 'Saving...' : <><CheckCircle2 size={18} /> Confirm Admission</>}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;
