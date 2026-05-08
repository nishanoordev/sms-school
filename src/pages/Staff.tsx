import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Mail, Phone, Book, GraduationCap, Trash2, X, IndianRupee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Staff.css';

const Staff = () => {
  const { teachers, addTeacher, deleteTeacher } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', qualification: '', designation: 'Teacher', dateOfJoining: '', 
    contact: '', email: '', salary: '', subjects: ''
  });

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.qualification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTeacher({
      id: Math.random().toString(36).substr(2, 9),
      employeeId: `EMP${String(teachers.length + 1).padStart(3, '0')}`,
      name: form.name,
      qualification: form.qualification,
      designation: form.designation,
      dateOfJoining: form.dateOfJoining,
      contact: form.contact,
      email: form.email,
      salary: Number(form.salary),
      subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean)
    });
    setForm({ name: '', qualification: '', designation: 'Teacher', dateOfJoining: '', contact: '', email: '', salary: '', subjects: '' });
    setShowForm(false);
  };

  return (
    <motion.div className="teachers-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Teacher Management</h1>
          <p className="page-subtitle">Register and manage faculty members and their academic assignments.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn" onClick={() => setShowForm(true)}><UserPlus size={18} /> Register Teacher</button>
        </div>
      </div>

      <div className="teachers-content">
        <div className="premium-card filter-card-teachers">
          <div className="search-box-teachers">
            <Search size={20} />
            <input type="text" placeholder="Search by name, qualification or subject..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="teachers-grid">
          {filteredTeachers.map((teacher) => (
            <motion.div key={teacher.id} className="premium-card teacher-card" whileHover={{ translateY: -5 }}>
              <div className="t-card-main">
                <div className="t-avatar-large">{teacher.name[0]}</div>
                <div className="t-details">
                  <h3>{teacher.name}</h3>
                  <p className="t-qual"><GraduationCap size={14} /> {teacher.qualification}</p>
                  {teacher.designation && <span className="t-designation">{teacher.designation}</span>}
                </div>
              </div>
              <div className="t-subjects-assigned">
                <h4><Book size={14} /> Assigned Subjects</h4>
                <div className="t-sub-tags">
                  {teacher.subjects.map(s => <span key={s} className="sub-tag">{s}</span>)}
                </div>
              </div>
              <div className="t-contact-info">
                <div className="contact-row"><Phone size={14} /> {teacher.contact}</div>
                {teacher.email && <div className="contact-row"><Mail size={14} /> {teacher.email}</div>}
                {teacher.salary && <div className="contact-row"><IndianRupee size={14} /> ₹{teacher.salary.toLocaleString()}/mo</div>}
              </div>
              <div className="t-card-actions">
                <button className="icon-btn-sm-sub delete" onClick={() => deleteTeacher(teacher.id)}><Trash2 size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3>Register New Teacher</h3>
              <button className="close-modal-btn" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="modal-form">
              <div className="form-row">
                <div className="form-field"><label>Full Name *</label><input required type="text" placeholder="Teacher's name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="form-field"><label>Qualification *</label><input required type="text" placeholder="e.g. B.Ed, NTT" value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} /></div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Designation</label>
                  <select value={form.designation} onChange={e => setForm({...form, designation: e.target.value})}>
                    <option>Teacher</option><option>Senior Teacher</option><option>HM</option><option>Vice Principal</option><option>Principal</option>
                  </select>
                </div>
                <div className="form-field"><label>Date of Joining</label><input type="date" value={form.dateOfJoining} onChange={e => setForm({...form, dateOfJoining: e.target.value})} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Mobile Number *</label><input required type="tel" placeholder="10-digit" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} /></div>
                <div className="form-field"><label>Email</label><input type="email" placeholder="email@school.edu" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Monthly Salary (₹)</label><input type="number" placeholder="e.g. 25000" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} /></div>
                <div className="form-field"><label>Subjects (comma-separated)</label><input type="text" placeholder="English, Drawing, Hindi" value={form.subjects} onChange={e => setForm({...form, subjects: e.target.value})} /></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Register Teacher</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Staff;
