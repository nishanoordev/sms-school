import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, Trash2, X, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Homework.css';

const Homework = () => {
  const { classes, teachers, homeworkAssignments, addHomework, deleteHomework } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterClass, setFilterClass] = useState('All');
  const [form, setForm] = useState({ classId: '', subjectName: '', title: '', description: '', assignedDate: new Date().toISOString().split('T')[0], dueDate: '', teacherName: '' });

  const filtered = homeworkAssignments.filter(h => filterClass === 'All' || h.classId === filterClass);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addHomework({ id: Math.random().toString(36).substr(2,9), ...form });
    setForm({ classId:'', subjectName:'', title:'', description:'', assignedDate: new Date().toISOString().split('T')[0], dueDate:'', teacherName:'' });
    setShowForm(false);
  };

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

  return (
    <motion.div className="homework-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div><h1 className="page-title">Homework & Assignments</h1><p className="page-subtitle">Assign and manage homework by class and subject.</p></div>
        <button className="primary-btn" onClick={()=>setShowForm(true)}><Plus size={18}/> Assign Homework</button>
      </div>

      <div className="premium-card hw-filter-bar">
        <div className="class-filter-tabs">
          {['All', ...classes.map(c=>c.id)].map(c => (
            <button key={c} className={`filter-tab ${filterClass===c?'active':''}`} onClick={()=>setFilterClass(c)}>
              {c === 'All' ? 'All Classes' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="hw-grid">
        {filtered.map(hw => (
          <motion.div key={hw.id} className={`premium-card hw-card ${isOverdue(hw.dueDate)?'overdue':''}`} whileHover={{ translateY: -3 }}>
            <div className="hw-card-header">
              <div className="hw-class-badge">{hw.classId}</div>
              <div className="hw-subject-tag"><BookOpen size={12}/> {hw.subjectName}</div>
              <button className="icon-btn-sm red" onClick={()=>deleteHomework(hw.id)}><Trash2 size={14}/></button>
            </div>
            <h3 className="hw-title">{hw.title}</h3>
            <p className="hw-desc">{hw.description}</p>
            <div className="hw-footer">
              <span><Calendar size={12}/> Assigned: {hw.assignedDate}</span>
              <span className={`due-date ${isOverdue(hw.dueDate)?'overdue-text':''}`}>Due: {hw.dueDate}</span>
            </div>
            <div className="hw-teacher">By: {hw.teacherName}</div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="empty-hw"><BookOpen size={48}/><p>No homework assigned.</p></div>}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header"><h3>Assign Homework</h3><button className="close-modal-btn" onClick={()=>setShowForm(false)}><X size={20}/></button></div>
            <form onSubmit={handleAdd} className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Class *</label>
                  <select required value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})}>
                    <option value="">Select Class</option>{classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-field"><label>Subject *</label><input required type="text" placeholder="e.g. English Rhymes" value={form.subjectName} onChange={e=>setForm({...form,subjectName:e.target.value})}/></div>
              </div>
              <div className="form-field"><label>Assignment Title *</label><input required type="text" placeholder="Brief title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
              <div className="form-field"><label>Description</label><textarea rows={3} placeholder="Detailed instructions..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div className="form-row">
                <div className="form-field"><label>Assigned Date</label><input type="date" value={form.assignedDate} onChange={e=>setForm({...form,assignedDate:e.target.value})}/></div>
                <div className="form-field"><label>Due Date *</label><input required type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></div>
              </div>
              <div className="form-field">
                <label>Assigned By</label>
                <select value={form.teacherName} onChange={e=>setForm({...form,teacherName:e.target.value})}>
                  <option value="">Select Teacher</option>{teachers.map(t=><option key={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={()=>setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Assign</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
export default Homework;
