import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  
  Search,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Attendance.css';

const Attendance = () => {
  const { students, classes, updateStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('Nursery');

  const filteredStudents = students.filter(s => 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.admissionNumber && s.admissionNumber.includes(searchTerm))) &&
    s.classId === classFilter
  );

  const getAttendancePercent = (studentId: string) => {
    const hash = studentId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return 60 + (hash % 41);
  };

  return (
    <motion.div 
      className="attendance-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance Tracking</h1>
          <p className="page-subtitle">Daily marking with Half-Day support and 75% monitoring.</p>
        </div>
      </div>

      <div className="att-summary-card premium-card">
        <div className="att-filters">
          <div className="att-filter-box">
            <label>Class</label>
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)}>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="att-search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by Name or Adm No..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="premium-card att-table-card-new">
        <table className="att-table-new">
          <thead>
            <tr>
              <th>Adm No</th>
              <th>Student Name</th>
              <th>Mark Attendance</th>
              <th>Month Avg</th>
              <th>Alert</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => {
              const percent = getAttendancePercent(student.id);
              return (
                <tr key={student.id}>
                  <td><code className="adm-no">{student.admissionNumber}</code></td>
                  <td><strong>{student.name}</strong></td>
                  <td>
                    <div className="att-btn-group">
                      {['Present', 'Absent', 'Late', 'Half-Day'].map(status => (
                        <button 
                          key={status}
                          className={`att-toggle-btn ${student.status === status ? status.toLowerCase().replace('-', '') : ''}`}
                          onClick={() => updateStudent(student.id, { status: status as any })}
                        >
                          {status === 'Half-Day' ? 'H-Day' : status}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="att-progress">
                      <div className="att-bar" style={{ width: `${percent}%`, background: percent < 75 ? 'var(--red-500)' : 'var(--green-500)' }}></div>
                      <span>{percent}%</span>
                    </div>
                  </td>
                  <td>
                    {percent < 75 && (
                      <div className="att-alert">
                        <AlertTriangle size={14} /> <span>Low</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Attendance;
