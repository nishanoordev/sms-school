import React, { useState } from 'react';
import { TrendingUp, Users, ArrowRight, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Promotion.css';

const Promotion: React.FC = () => {
  const { students, classes } = useApp();
  const [fromClass, setFromClass] = useState('');
  const [toClass, setToClass] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filteredStudents = students.filter(s => s.classId === fromClass);

  const toggleStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedStudents(filteredStudents.map(s => s.id));
  };

  const handlePromotion = async () => {
    if (!fromClass || !toClass || selectedStudents.length === 0) {
      alert('Please select both classes and at least one student.');
      return;
    }

    if (!window.confirm(`Are you sure you want to promote ${selectedStudents.length} students to ${toClass}? This action is irreversible.`)) {
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromClass,
          toClass,
          studentIds: selectedStudents
        })
      });

      const data = await response.json();
      if (response.ok) {
        setResult({ message: data.message, type: 'success' });
        setSelectedStudents([]);
      } else {
        setResult({ message: data.error || 'Promotion failed', type: 'error' });
      }
    } catch (error) {
      setResult({ message: 'Server error during promotion', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="promotion-page">
      <div className="page-header">
        <div className="header-text">
          <h1>Student Promotion</h1>
          <p>Bulk transfer students to higher classes for the new academic session.</p>
        </div>
      </div>

      <div className="promotion-wizard">
        <div className="wizard-step premium-card">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Select Classes</h3>
            <div className="class-selectors">
              <div className="select-group">
                <label>From Class</label>
                <select value={fromClass} onChange={e => { setFromClass(e.target.value); setSelectedStudents([]); }}>
                  <option value="">Select Source Class</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="arrow-icon"><ArrowRight /></div>
              <div className="select-group">
                <label>To Class</label>
                <select value={toClass} onChange={e => setToClass(e.target.value)}>
                  <option value="">Select Target Class</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  <option value="Passed Out">Passed Out (Alumni)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {fromClass && (
          <div className="wizard-step premium-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-header">
                <h3>Select Students ({selectedStudents.length} selected)</h3>
                <button className="text-btn" onClick={selectAll}>Select All</button>
              </div>
              <div className="student-list-mini">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id} 
                      className={`student-item-mini ${selectedStudents.includes(student.id) ? 'selected' : ''}`}
                      onClick={() => toggleStudent(student.id)}
                    >
                      <div className="checkbox">
                        {selectedStudents.includes(student.id) && <CheckCircle size={14} />}
                      </div>
                      <div className="student-name-mini">{student.name}</div>
                      <div className="student-roll-mini">{student.admissionNumber}</div>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No students found in {fromClass}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedStudents.length > 0 && toClass && (
          <div className="wizard-step premium-card promotion-summary">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Confirm Promotion</h3>
              <div className="summary-box">
                <div className="summary-item">
                  <span className="label">Total Students:</span>
                  <span className="value">{selectedStudents.length}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Promoting To:</span>
                  <span className="value badge-success">{toClass}</span>
                </div>
              </div>
              <div className="warning-box">
                <AlertTriangle size={20} />
                <p>This will update the class information for all selected students. Please ensure final marks are updated before promoting.</p>
              </div>
              <button 
                className="promote-submit-btn" 
                onClick={handlePromotion}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : <>Confirm & Promote Students <TrendingUp size={18} /></>}
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className={`result-overlay ${result.type}`}>
          <div className="result-card glass">
            {result.type === 'success' ? <ShieldCheck size={64} className="success-icon" /> : <AlertTriangle size={64} className="error-icon" />}
            <h2>{result.type === 'success' ? 'Success!' : 'Error'}</h2>
            <p>{result.message}</p>
            <button className="close-result-btn" onClick={() => setResult(null)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotion;
