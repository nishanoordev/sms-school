import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle, XCircle, Clock, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Attendance.css';

const TODAY = new Date().toISOString().split('T')[0]; // e.g. "2025-05-10"

const Attendance = () => {
  const { students, classes, attendanceRecords, markAttendance } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('Nursery');
  const [saving, setSaving] = useState<string | null>(null);

  const filteredStudents = students.filter(s =>
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (s.admissionNumber && s.admissionNumber.includes(searchTerm))) &&
    s.classId === classFilter
  );

  // Get today's attendance status for a student
  const getTodayStatus = (studentId: string) => {
    const record = attendanceRecords.find(r =>
      r.studentId === studentId &&
      (r.date === TODAY || (r.date && r.date.startsWith(TODAY)))
    );
    return record?.status || null;
  };

  // Get attendance percentage for a student (from all records)
  const getAttendancePercent = (studentId: string) => {
    const records = attendanceRecords.filter(r => r.studentId === studentId);
    if (records.length === 0) return null;
    const present = records.filter(r => r.status === 'Present' || r.status === 'Late' || r.status === 'Half-Day').length;
    return Math.round((present / records.length) * 100);
  };

  const handleMark = async (studentId: string, status: string) => {
    setSaving(studentId);
    await markAttendance(studentId, TODAY, status);
    setSaving(null);
  };

  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    Present:  { label: 'Present',  color: '#16a34a', icon: <CheckCircle size={14} /> },
    Absent:   { label: 'Absent',   color: '#dc2626', icon: <XCircle size={14} /> },
    Late:     { label: 'Late',     color: '#d97706', icon: <Clock size={14} /> },
    'Half-Day': { label: 'H-Day', color: '#7c3aed', icon: <Minus size={14} /> },
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
          <p className="page-subtitle">Daily marking for {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
        {filteredStudents.length === 0 ? (
          <div className="empty-state-sm">No students found in this class.</div>
        ) : (
          <table className="att-table-new">
            <thead>
              <tr>
                <th>Adm No</th>
                <th>Student Name</th>
                <th>Mark Today</th>
                <th>Month Avg</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const todayStatus = getTodayStatus(student.id);
                const percent = getAttendancePercent(student.id);
                const isSaving = saving === student.id;

                return (
                  <tr key={student.id}>
                    <td><code className="adm-no">{student.admissionNumber}</code></td>
                    <td><strong>{student.name}</strong></td>
                    <td>
                      <div className="att-btn-group">
                        {Object.entries(statusConfig).map(([status, cfg]) => (
                          <button
                            key={status}
                            disabled={isSaving}
                            className={`att-toggle-btn ${todayStatus === status ? 'att-active' : ''}`}
                            style={todayStatus === status ? { background: cfg.color, color: 'white', borderColor: cfg.color } : {}}
                            onClick={() => handleMark(student.id, status)}
                            title={cfg.label}
                          >
                            {cfg.icon} {cfg.label}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td>
                      {percent !== null ? (
                        <div className="att-progress">
                          <div
                            className="att-bar"
                            style={{
                              width: `${percent}%`,
                              background: percent < 75 ? '#dc2626' : '#16a34a'
                            }}
                          />
                          <span>{percent}%</span>
                        </div>
                      ) : (
                        <span style={{ color: '#9ca3af', fontSize: '13px' }}>No data</span>
                      )}
                    </td>
                    <td>
                      {percent !== null && percent < 75 && (
                        <div className="att-alert">
                          <AlertTriangle size={14} /> <span>Low</span>
                        </div>
                      )}
                      {todayStatus && (
                        <span style={{ fontSize: '11px', fontWeight: 700, color: statusConfig[todayStatus]?.color }}>
                          {todayStatus} ✓
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default Attendance;
