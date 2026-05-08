import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, CreditCard, Receipt, AlertCircle, CheckCircle2, IndianRupee, X, Printer } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Finance.css';

const Finance = () => {
  const { students, addFeeReceipt, feeReceipts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [collectForm, setCollectForm] = useState({ feeHead: 'Monthly Tuition Fee', amount: '2500', paymentMode: 'Cash' as 'Cash' | 'Online' | 'Cheque' });

  const feeHeads = [
    { name: 'Admission Fee', amount: 5000, frequency: 'One-time' },
    { name: 'Monthly Tuition Fee', amount: 2500, frequency: 'Monthly' },
    { name: 'Annual Charges', amount: 3000, frequency: 'Annual' },
    { name: 'Exam Fee', amount: 500, frequency: 'Per Exam' },
    { name: 'Stationery Fee', amount: 1500, frequency: 'Annual' },
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNumber.includes(searchTerm)
  );

  const totalCollected = feeReceipts.reduce((sum, r) => sum + r.amount, 0);

  const openCollect = (student: any) => {
    setSelectedStudent(student);
    setShowCollectModal(true);
  };

  const handleCollect = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptNo = `RCP${Date.now().toString().slice(-6)}`;
    const receipt = {
      id: Math.random().toString(36).substr(2, 9),
      receiptNo,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      admissionNumber: selectedStudent.admissionNumber,
      classId: selectedStudent.classId,
      feeHead: collectForm.feeHead,
      amount: Number(collectForm.amount),
      paymentMode: collectForm.paymentMode,
      date: new Date().toISOString().split('T')[0],
      collectedBy: 'Admin'
    };
    addFeeReceipt(receipt);
    setSelectedReceipt(receipt);
    setShowCollectModal(false);
    setShowReceiptModal(true);
  };

  return (
    <motion.div className="finance-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Fee Management</h1>
          <p className="page-subtitle">Track collections, manage fee heads, and monitor outstandings.</p>
        </div>
        <button className="primary-btn"><Plus size={18} /> Add Fee Head</button>
      </div>

      <div className="finance-summary-grid">
        <div className="premium-card fin-stat-card">
          <div className="fin-icon blue"><CreditCard /></div>
          <div className="fin-info"><span>Total Collected</span><h3><IndianRupee size={20} /> {totalCollected.toLocaleString()}</h3></div>
        </div>
        <div className="premium-card fin-stat-card">
          <div className="fin-icon green"><CheckCircle2 /></div>
          <div className="fin-info"><span>Receipts Issued</span><h3>{feeReceipts.length}</h3></div>
        </div>
        <div className="premium-card fin-stat-card">
          <div className="fin-icon orange"><AlertCircle /></div>
          <div className="fin-info"><span>RTE Students</span><h3>{students.filter(s => s.isRTE).length}</h3></div>
        </div>
      </div>

      <div className="finance-main-grid">
        <div className="collection-section">
          <div className="premium-card">
            <div className="section-header-fin">
              <h3>Fee Collection</h3>
              <div className="search-box-fin">
                <Search size={18} />
                <input type="text" placeholder="Student Name or Adm No..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="fee-student-list">
              {filteredStudents.map(student => (
                <div key={student.id} className="fee-student-item">
                  <div className="fs-info">
                    <strong>{student.name}</strong>
                    <span>{student.admissionNumber} · {student.classId}</span>
                  </div>
                  <div className="fs-status">
                    {student.isRTE ? (
                      <span className="rte-badge">RTE — Exempt</span>
                    ) : (
                      <span className="fee-pending">₹2,500 Due</span>
                    )}
                  </div>
                  <button className="secondary-btn-sm" onClick={() => openCollect(student)}>
                    <Receipt size={16} /> Collect Fee
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fee-heads-sidebar">
          <div className="premium-card">
            <h3>Fee Structures</h3>
            <div className="fee-heads-list">
              {feeHeads.map(head => (
                <div key={head.name} className="fee-head-item">
                  <div className="fh-name"><strong>{head.name}</strong><span>{head.frequency}</span></div>
                  <div className="fh-amount">₹{head.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {feeReceipts.length > 0 && (
            <div className="premium-card" style={{ marginTop: '16px' }}>
              <h3>Recent Receipts</h3>
              <div className="fee-heads-list">
                {feeReceipts.slice(-5).reverse().map(r => (
                  <div key={r.id} className="fee-head-item" style={{ cursor: 'pointer' }} onClick={() => { setSelectedReceipt(r); setShowReceiptModal(true); }}>
                    <div className="fh-name"><strong>{r.studentName}</strong><span>{r.receiptNo} · {r.date}</span></div>
                    <div className="fh-amount" style={{ color: '#22c55e' }}>₹{r.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collect Fee Modal */}
      {showCollectModal && selectedStudent && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3>Collect Fee — {selectedStudent.name}</h3>
              <button className="close-modal-btn" onClick={() => setShowCollectModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCollect} className="modal-form">
              <div className="fee-student-summary">
                <p><strong>Adm No:</strong> {selectedStudent.admissionNumber}</p>
                <p><strong>Class:</strong> {selectedStudent.classId}</p>
              </div>
              <div className="form-field">
                <label>Fee Head</label>
                <select value={collectForm.feeHead} onChange={e => setCollectForm({...collectForm, feeHead: e.target.value})}>
                  {feeHeads.map(f => <option key={f.name}>{f.name}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Amount (₹)</label><input type="number" value={collectForm.amount} onChange={e => setCollectForm({...collectForm, amount: e.target.value})} /></div>
                <div className="form-field">
                  <label>Payment Mode</label>
                  <select value={collectForm.paymentMode} onChange={e => setCollectForm({...collectForm, paymentMode: e.target.value as any})}>
                    <option>Cash</option><option>Online</option><option>Cheque</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowCollectModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn"><CheckCircle2 size={16} /> Collect & Generate Receipt</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Fee Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="modal-overlay">
          <div className="modal-box premium-card receipt-modal" id="fee-receipt-print">
            <div className="modal-header no-print">
              <h3>Fee Receipt</h3>
              <button className="close-modal-btn" onClick={() => setShowReceiptModal(false)}><X size={20} /></button>
            </div>
            <div className="receipt-content">
              <div className="receipt-header">
                <h2>FEE RECEIPT</h2>
                <p>Little Hearts Nursery School</p>
              </div>
              <div className="receipt-no-date">
                <span>Receipt No: <strong>{selectedReceipt.receiptNo}</strong></span>
                <span>Date: <strong>{selectedReceipt.date}</strong></span>
              </div>
              <div className="receipt-details">
                <div><span>Student Name:</span><strong>{selectedReceipt.studentName}</strong></div>
                <div><span>Adm No:</span><strong>{selectedReceipt.admissionNumber}</strong></div>
                <div><span>Class:</span><strong>{selectedReceipt.classId}</strong></div>
                <div><span>Fee Head:</span><strong>{selectedReceipt.feeHead}</strong></div>
                <div><span>Payment Mode:</span><strong>{selectedReceipt.paymentMode}</strong></div>
                <div><span>Collected By:</span><strong>{selectedReceipt.collectedBy}</strong></div>
              </div>
              <div className="receipt-amount">
                <span>Total Amount Paid</span>
                <h2>₹ {selectedReceipt.amount.toLocaleString()}</h2>
              </div>
              <div className="receipt-signatures">
                <div>Parent Signature</div>
                <div>Cashier Signature</div>
              </div>
            </div>
            <div className="modal-footer no-print">
              <button className="secondary-btn" onClick={() => setShowReceiptModal(false)}>Close</button>
              <button className="primary-btn" onClick={() => window.print()}><Printer size={16} /> Print Receipt</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Finance;
