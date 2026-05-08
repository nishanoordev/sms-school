import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, Phone, MapPin, User, GraduationCap, IdCard, Printer, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Students.css';

const Students = () => {
  const { students, classes, schoolProfile, updateStudent } = useApp();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [showIDPreview, setShowIDPreview] = useState(false);

  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || 'N/A';

  const filteredStudents = students.filter(s => 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.admissionNumber.includes(searchTerm)) &&
    (classFilter === 'All Classes' || s.classId === classFilter)
  );

  return (
    <motion.div 
      className="students-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle">Academic Year 2025-26 · {students.length} Total Students</p>
        </div>
      </div>

      <div className="students-top-bar premium-card">
        <div className="search-bar-students">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by Name or Admission No..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group-students">
          <Filter size={18} />
          <select 
            className="filter-select-students"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="All Classes">All Classes</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="students-content-grid">
        <div className="students-table-container premium-card">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Adm No</th>
                <th>Class</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr 
                  key={student.id} 
                  onClick={() => setSelectedStudent(student)}
                  className={selectedStudent?.id === student.id ? 'active-row' : ''}
                >
                  <td>
                    <div className="student-cell">
                      <div className="avatar-sm">{student.name[0]}</div>
                      <span className="s-name">{student.name}</span>
                    </div>
                  </td>
                  <td><code className="adm-no">{student.admissionNumber}</code></td>
                  <td>{getClassName(student.classId)}</td>
                  <td>
                    <select 
                      className={`status-pill ${student.status.toLowerCase()}`}
                      value={student.status}
                      onChange={(e) => updateStudent(student.id, { status: e.target.value as any })}
                    >
                      <option value="Active">Active</option>
                      <option value="Left">Left</option>
                      <option value="Promoted">Promoted</option>
                    </select>
                  </td>
                  <td><ChevronRight size={18} className="text-muted" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {selectedStudent && (
            <motion.div 
              className="student-quick-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="premium-card detail-card-new">
                <div className="detail-header-new">
                  <div className="detail-avatar-large">{selectedStudent.name[0]}</div>
                  <h2>{selectedStudent.name}</h2>
                  <p>{selectedStudent.admissionNumber}</p>
                </div>

                <div className="detail-body-new">
                  <div className="info-item"><GraduationCap size={16} /> <span>{getClassName(selectedStudent.classId)} · Section {selectedStudent.section}</span></div>
                  <div className="info-item"><User size={16} /> <span>Father: {selectedStudent.fatherName}</span></div>
                  <div className="info-item"><Phone size={16} /> <span>{selectedStudent.parentContact}</span></div>
                  <div className="info-item"><MapPin size={16} /> <span>{selectedStudent.address}</span></div>
                </div>

                <div className="detail-actions-new">
                  <button className="primary-btn full-width" onClick={() => setShowIDPreview(true)}>
                    <IdCard size={18} /> Preview ID Card
                  </button>
                  <button className="secondary-btn full-width"><Printer size={18} /> Student File</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ID Card Modal */}
      {showIDPreview && selectedStudent && (
        <div className="modal-overlay">
          <div className="id-card-modal premium-card">
            <button className="close-modal" onClick={() => setShowIDPreview(false)}><X /></button>
            <div className="id-card-content">
              <div className="id-header">
                <h3>{schoolProfile.name}</h3>
                <p>Identity Card</p>
              </div>
              <div className="id-body">
                <div className="id-photo">Photo</div>
                <div className="id-info">
                  <h4>{selectedStudent.name}</h4>
                  <p>Class: {getClassName(selectedStudent.classId)}</p>
                  <p>Adm No: {selectedStudent.admissionNumber}</p>
                  <p>Contact: {selectedStudent.parentContact}</p>
                </div>
              </div>
              <div className="id-footer">
                <p>{schoolProfile.address}, {schoolProfile.district}</p>
              </div>
            </div>
            <button 
              className="primary-btn full-width no-print" 
              style={{ marginTop: '20px' }}
              onClick={() => window.print()}
            >
              Print ID Card
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Students;
