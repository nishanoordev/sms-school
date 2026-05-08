import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Printer, Search, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Reports.css';

const Reports = () => {
  const { students, schoolProfile, updateStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [printStudent, setPrintStudent] = useState<any>(null);

  const skills = ['Reading', 'Writing', 'Counting', 'Drawing', 'Behavior', 'Communication', 'Participation'];
  const grades = ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.admissionNumber.includes(searchTerm)
  );

  const getStudentGrades = (student: any) => {
    const termRecord = student.marks?.find((m: any) => m.term === selectedTerm);
    if (termRecord && termRecord.skills) return termRecord.skills;
    
    // Default empty grades
    const defaultGrades: Record<string, string> = {};
    skills.forEach(s => defaultGrades[s] = 'Satisfactory');
    return defaultGrades;
  };

  const handleGradeChange = (studentId: string, skill: string, grade: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    let marksArr = [...(student.marks || [])];
    const termIndex = marksArr.findIndex(m => m.term === selectedTerm);

    if (termIndex > -1) {
      const updatedSkills = { ...marksArr[termIndex].skills, [skill]: grade as any };
      marksArr[termIndex].skills = updatedSkills;
    } else {
      const initialGrades: any = {};
      skills.forEach(s => initialGrades[s] = 'Satisfactory');
      initialGrades[skill] = grade;
      marksArr.push({ term: selectedTerm, skills: initialGrades });
    }

    updateStudent(studentId, { marks: marksArr });
  };

  const handlePrint = (student: any) => {
    setPrintStudent(student);
  };

  useEffect(() => {
    if (printStudent) {
      setTimeout(() => {
        window.print();
      }, 300);
    }
  }, [printStudent]);

  return (
    <motion.div 
      className="reports-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header no-print">
        <div>
          <h1 className="page-title">Progress Reports</h1>
          <p className="page-subtitle">Nursery level skill assessment and printable report cards.</p>
        </div>
      </div>

      <div className="reports-top-controls premium-card no-print">
        <div className="search-reports-box">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search by student name or Adm No..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="term-selector">
          <label>Assessment Term</label>
          <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)} className="premium-input-sm">
            <option>Term 1</option><option>Term 2</option><option>Term 3</option>
          </select>
        </div>
      </div>

      <div className="reports-assessment-grid no-print">
        {filteredStudents.map((student) => {
          const currentGrades = getStudentGrades(student);
          const hasMarks = student.marks?.some((m: any) => m.term === selectedTerm);

          return (
            <div key={student.id} className="premium-card assessment-card">
              <div className="ass-header">
                <div className="ass-avatar">{student.name[0]}</div>
                <div className="ass-info">
                  <h3>{student.name}</h3>
                  <p>{student.admissionNumber} · {student.classId}</p>
                </div>
                {hasMarks && <div className="ass-status"><CheckCircle2 size={16} /> Saved</div>}
              </div>

              <div className="skills-grid-ass">
                {skills.map(skill => (
                  <div key={skill} className="skill-row">
                    <span>{skill}</span>
                    <select 
                      className="grade-select"
                      value={currentGrades[skill] || 'Satisfactory'}
                      onChange={(e) => handleGradeChange(student.id, skill, e.target.value)}
                    >
                      {grades.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="ass-footer">
                <button className="secondary-btn-sm" onClick={() => handlePrint(student)}>
                  <Printer size={16} /> Print Card
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Printable Report Card (Hidden by default, shown for Print via CSS media query) */}
      {printStudent && (
        <div className="printable-report-card" id="printable-card">
          <div className="report-header-print">
            <div className="school-logo-print">Logo</div>
            <div className="school-info-print">
              <h2>{schoolProfile.name}</h2>
              <p>{schoolProfile.address}, {schoolProfile.district}, {schoolProfile.state} - {schoolProfile.pinCode}</p>
              <p>Academic Session: {schoolProfile.academicYear}</p>
            </div>
          </div>
          
          <h2 className="report-title-print">PROGRESS REPORT CARD</h2>
          
          <div className="student-info-print">
            <div><strong>Student Name:</strong> {printStudent.name}</div>
            <div><strong>Admission No:</strong> {printStudent.admissionNumber}</div>
            <div><strong>Class:</strong> {printStudent.classId} {printStudent.section ? `(Sec ${printStudent.section})` : ''}</div>
            <div><strong>Term:</strong> {selectedTerm}</div>
          </div>
          
          <table className="report-table-print">
            <thead>
              <tr><th>Skill Area</th><th>Grade / Performance</th></tr>
            </thead>
            <tbody>
              {skills.map(s => (
                <tr key={s}>
                  <td>{s}</td>
                  <td>{getStudentGrades(printStudent)[s] || 'Satisfactory'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="report-signatures-print">
            <div className="sig-box">Class Teacher</div>
            <div className="sig-box">Principal</div>
            <div className="sig-box">Parent / Guardian</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Reports;
