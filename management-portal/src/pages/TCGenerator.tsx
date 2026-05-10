import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Printer, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './TCGenerator.css';

const TCGenerator = () => {
  const { students, schoolProfile, updateStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showTC, setShowTC] = useState<any>(null);
  const [tcDate, setTcDate] = useState(new Date().toISOString().split('T')[0]);
  const [tcNo, setTcNo] = useState(`TC-${Date.now().toString().slice(-4)}`);
  const [reason, setReason] = useState('Parent Request');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNumber.includes(searchTerm)
  );

  const generateTC = (student: any) => {
    setShowTC(student);
    updateStudent(student.id, { status: 'Left' });
  };

  return (
    <motion.div className="tc-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Transfer Certificate</h1>
          <p className="page-subtitle">Generate official TC / Leaving Certificate for outgoing students.</p>
        </div>
      </div>

      <div className="tc-layout">
        <div className="premium-card tc-search-panel">
          <h3>Select Student</h3>
          <div className="search-box-tc">
            <Search size={18} />
            <input type="text" placeholder="Search by name or Adm No..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>

          <div className="tc-settings">
            <div className="form-field"><label>TC Number</label><input type="text" value={tcNo} onChange={e => setTcNo(e.target.value)} /></div>
            <div className="form-field"><label>Issue Date</label><input type="date" value={tcDate} onChange={e => setTcDate(e.target.value)} /></div>
            <div className="form-field">
              <label>Reason for Leaving</label>
              <select value={reason} onChange={e => setReason(e.target.value)}>
                <option>Parent Request</option><option>Transfer</option><option>Admission to Another School</option><option>Family Relocation</option><option>Other</option>
              </select>
            </div>
          </div>

          <div className="student-tc-list">
            {filtered.map(student => (
              <div key={student.id} className={`student-tc-item ${student.status === 'Left' ? 'left-student' : ''}`}>
                <div className="stc-info">
                  <div className="stc-avatar">{student.name[0]}</div>
                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.admissionNumber} · {student.classId}</span>
                    {student.status === 'Left' && <span className="left-badge">TC Issued</span>}
                  </div>
                </div>
                <button
                  className="primary-btn-sm"
                  onClick={() => generateTC(student)}
                >
                  <FileText size={14} /> Generate TC
                </button>
              </div>
            ))}
          </div>
        </div>

        {showTC && (
          <div className="premium-card tc-preview-panel">
            <div className="tc-preview-header">
              <h3>TC Preview</h3>
              <div className="tc-preview-actions no-print">
                <button className="secondary-btn-sm" onClick={() => setShowTC(null)}><X size={14} /> Close</button>
                <button className="primary-btn-sm" onClick={() => window.print()}><Printer size={14} /> Print TC</button>
              </div>
            </div>
            <div className="tc-document" id="tc-print">
              <div className="tc-doc-header">
                <div className="tc-school-logo">Logo</div>
                <div className="tc-school-info">
                  <h2>{schoolProfile.name}</h2>
                  <p>{schoolProfile.address}, {schoolProfile.district}, {schoolProfile.state} – {schoolProfile.pinCode}</p>
                  <p>Phone: {schoolProfile.contactNumber}</p>
                </div>
              </div>
              <div className="tc-title-bar">
                <h2>TRANSFER CERTIFICATE</h2>
              </div>
              <div className="tc-meta">
                <span>TC No: <strong>{tcNo}</strong></span>
                <span>Date: <strong>{tcDate}</strong></span>
              </div>
              <table className="tc-details-table">
                <tbody>
                  <tr><td>1. Student's Name</td><td><strong>{showTC.name}</strong></td></tr>
                  <tr><td>2. Father's Name</td><td>{showTC.fatherName}</td></tr>
                  <tr><td>3. Mother's Name</td><td>{showTC.motherName}</td></tr>
                  <tr><td>4. Date of Birth</td><td>{showTC.dob}</td></tr>
                  <tr><td>5. Nationality</td><td>Indian</td></tr>
                  <tr><td>6. Category</td><td>{showTC.category}</td></tr>
                  <tr><td>7. Admission No</td><td>{showTC.admissionNumber}</td></tr>
                  <tr><td>8. Class Last Attended</td><td>{showTC.classId}</td></tr>
                  <tr><td>9. Medium of Instruction</td><td>{showTC.medium}</td></tr>
                  <tr><td>10. Reason for Leaving</td><td>{reason}</td></tr>
                  <tr><td>11. Date of Leaving</td><td>{tcDate}</td></tr>
                  <tr><td>12. Behaviour & Conduct</td><td>Satisfactory</td></tr>
                </tbody>
              </table>
              <p className="tc-certified">
                Certified that the above particulars are correct as per school records.
              </p>
              <div className="tc-signatures">
                <div className="tc-sig-box"><div className="sig-line"></div><p>Class Teacher</p></div>
                <div className="tc-sig-box"><div className="sig-line"></div><p>Principal</p></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default TCGenerator;
