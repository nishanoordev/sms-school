import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, X, Clock, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Exams.css';

const Exams = () => {
  const { classes, examSchedules, addExam, deleteExam } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterClass, setFilterClass] = useState('All');
  const [form, setForm] = useState({
    examName: 'Term 1 Assessment', classId: '', subjectName: '',
    date: '', startTime: '09:00', endTime: '10:00', venue: '', totalMarks: '50'
  });

  const filtered = examSchedules.filter(e => filterClass === 'All' || e.classId === filterClass);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addExam({ id: Math.random().toString(36).substr(2,9), ...form, totalMarks: Number(form.totalMarks) });
    setForm({ examName:'Term 1 Assessment', classId:'', subjectName:'', date:'', startTime:'09:00', endTime:'10:00', venue:'', totalMarks:'50' });
    setShowForm(false);
  };

  const isPast = (date: string) => new Date(date) < new Date();

  return (
    <motion.div className="exams-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div><h1 className="page-title">Exam Schedule</h1><p className="page-subtitle">Manage test dates, subjects, and venues for all classes.</p></div>
        <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={18} /> Add Exam</button>
      </div>

      <div className="premium-card exam-filter-bar">
        <div className="class-filter-tabs">
          {['All', ...classes.map(c => c.id)].map(c => (
            <button key={c} className={`filter-tab ${filterClass === c ? 'active' : ''}`} onClick={() => setFilterClass(c)}>
              {c === 'All' ? 'All Classes' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="premium-card exam-table-card">
        <table className="exam-table">
          <thead>
            <tr><th>Exam Name</th><th>Class</th><th>Subject</th><th>Date</th><th>Time</th><th>Venue</th><th>Max Marks</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(exam => (
              <tr key={exam.id} className={isPast(exam.date) ? 'past-exam' : ''}>
                <td><strong>{exam.examName}</strong></td>
                <td><span className="exam-class-badge">{exam.classId}</span></td>
                <td><BookOpen size={14} style={{ marginRight: 6 }} />{exam.subjectName}</td>
                <td>{exam.date}</td>
                <td><Clock size={12} style={{ marginRight: 4 }} />{exam.startTime} – {exam.endTime}</td>
                <td>{exam.venue}</td>
                <td><strong>{exam.totalMarks}</strong></td>
                <td>
                  <span className={`exam-status-badge ${isPast(exam.date) ? 'completed' : 'upcoming'}`}>
                    {isPast(exam.date) ? 'Completed' : 'Upcoming'}
                  </span>
                </td>
                <td><button className="icon-btn-sm red" onClick={() => deleteExam(exam.id)}><Trash2 size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="empty-state-sm">No exams scheduled.</p>}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3>Add Exam Schedule</h3>
              <button className="close-modal-btn" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Exam Name</label>
                  <select value={form.examName} onChange={e => setForm({...form, examName: e.target.value})}>
                    <option>Term 1 Assessment</option><option>Term 2 Assessment</option><option>Annual Exam</option><option>Unit Test</option><option>Mock Test</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Class *</label>
                  <select required value={form.classId} onChange={e => setForm({...form, classId: e.target.value})}>
                    <option value="">Select Class</option>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Subject *</label><input required type="text" placeholder="Subject name" value={form.subjectName} onChange={e => setForm({...form, subjectName: e.target.value})} /></div>
                <div className="form-field"><label>Venue</label><input type="text" placeholder="e.g. Classroom A" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Date *</label><input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
                <div className="form-field"><label>Start Time</label><input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} /></div>
                <div className="form-field"><label>End Time</label><input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} /></div>
                <div className="form-field"><label>Total Marks</label><input type="number" value={form.totalMarks} onChange={e => setForm({...form, totalMarks: e.target.value})} /></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Add Exam</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
export default Exams;
