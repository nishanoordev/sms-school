import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Search, Trash2, Edit2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Subjects.css';

const Subjects = () => {
  const { subjects, classes, teachers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || 'N/A';
  const getTeacherName = (id: string) => teachers.find(t => t.id === id)?.name || 'Unassigned';

  return (
    <motion.div 
      className="subjects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Subject Management</h1>
          <p className="page-subtitle">Configure academic subjects and link them to classes and teachers.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn"><Plus size={18} /> Add New Subject</button>
        </div>
      </div>

      <div className="premium-card subjects-card">
        <div className="list-controls-subjects">
          <div className="search-box-sub">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="subjects-table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Code</th>
              <th>Assigned Class</th>
              <th>Primary Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <div className="sub-name-cell">
                    <div className="sub-icon"><BookOpen size={16} /></div>
                    <strong>{sub.name}</strong>
                  </div>
                </td>
                <td><code className="sub-code">{sub.code}</code></td>
                <td><span className="class-tag">{getClassName(sub.classId)}</span></td>
                <td>
                  <div className="teacher-cell-sub">
                    <User size={14} />
                    <span>{getTeacherName(sub.teacherId)}</span>
                  </div>
                </td>
                <td>
                  <div className="action-btns-sub">
                    <button className="icon-btn-sm-sub edit"><Edit2 size={16} /></button>
                    <button className="icon-btn-sm-sub delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Subjects;
