import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, IndianRupee, CheckCircle2, Clock, Printer, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Payroll.css';

const Payroll = () => {
  const { teachers, salaryRecords, addSalaryRecord, updateSalaryStatus } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [showPayslip, setShowPayslip] = useState<any>(null);
  const [filterMonth, setFilterMonth] = useState('');
  const [form, setForm] = useState({ staffId: '', month: '', basicSalary: '', allowances: '3000', deductions: '500' });

  const months = ['April 2025','May 2025','June 2025','July 2025','August 2025','September 2025','October 2025','November 2025','December 2025','January 2026','February 2026','March 2026'];
  const filtered = salaryRecords.filter(r => !filterMonth || r.month === filterMonth);
  const totalPaid = filtered.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.netSalary, 0);
  const totalPending = filtered.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.netSalary, 0);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === form.staffId);
    const basic = Number(form.basicSalary), allowances = Number(form.allowances), deductions = Number(form.deductions);
    addSalaryRecord({ id: Math.random().toString(36).substr(2,9), staffId: form.staffId, staffName: teacher?.name||'', month: form.month, basicSalary: basic, allowances, deductions, netSalary: basic+allowances-deductions, status: 'Pending' });
    setForm({ staffId:'', month:'', basicSalary:'', allowances:'3000', deductions:'500' });
    setShowForm(false);
  };

  return (
    <motion.div className="payroll-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div><h1 className="page-title">Payroll Management</h1><p className="page-subtitle">Generate salary slips and track monthly payroll.</p></div>
        <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={18} /> Generate Salary</button>
      </div>
      <div className="payroll-stats-grid">
        <div className="premium-card payroll-stat"><div className="ps-icon green"><IndianRupee /></div><div><span>Total Paid</span><h3>₹{totalPaid.toLocaleString()}</h3></div></div>
        <div className="premium-card payroll-stat"><div className="ps-icon orange"><Clock /></div><div><span>Pending</span><h3>₹{totalPending.toLocaleString()}</h3></div></div>
        <div className="premium-card payroll-stat"><div className="ps-icon blue"><CheckCircle2 /></div><div><span>Staff Count</span><h3>{teachers.length}</h3></div></div>
      </div>
      <div className="premium-card payroll-table-card">
        <div className="payroll-table-header">
          <h3>Salary Records</h3>
          <select className="month-filter" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
            <option value="">All Months</option>{months.map(m=><option key={m}>{m}</option>)}
          </select>
        </div>
        <table className="payroll-table">
          <thead><tr><th>Staff</th><th>Month</th><th>Basic</th><th>Allowance</th><th>Deduction</th><th>Net</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(rec => (
              <tr key={rec.id}>
                <td><strong>{rec.staffName}</strong></td>
                <td>{rec.month}</td>
                <td>₹{rec.basicSalary.toLocaleString()}</td>
                <td className="allowance">+₹{rec.allowances.toLocaleString()}</td>
                <td className="deduction">-₹{rec.deductions.toLocaleString()}</td>
                <td><strong>₹{rec.netSalary.toLocaleString()}</strong></td>
                <td><span className={`pay-status-badge ${rec.status.toLowerCase()}`}>{rec.status}</span></td>
                <td>
                  <div className="action-btns">
                    {rec.status === 'Pending' && <button className="approve-btn" onClick={() => updateSalaryStatus(rec.id, 'Paid', new Date().toISOString().split('T')[0])}>Pay</button>}
                    <button className="icon-btn-sm" onClick={() => setShowPayslip(rec)}><Printer size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="empty-state-sm">No salary records.</p>}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header"><h3>Generate Salary Slip</h3><button className="close-modal-btn" onClick={() => setShowForm(false)}><X size={20}/></button></div>
            <form onSubmit={handleGenerate} className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Staff *</label>
                  <select required value={form.staffId} onChange={e => { const t=teachers.find(t=>t.id===e.target.value); setForm({...form,staffId:e.target.value,basicSalary:String(t?.salary||'')}); }}>
                    <option value="">Select</option>{teachers.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Month *</label>
                  <select required value={form.month} onChange={e=>setForm({...form,month:e.target.value})}>
                    <option value="">Select</option>{months.map(m=><option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Basic (₹)</label><input type="number" value={form.basicSalary} onChange={e=>setForm({...form,basicSalary:e.target.value})}/></div>
                <div className="form-field"><label>Allowances</label><input type="number" value={form.allowances} onChange={e=>setForm({...form,allowances:e.target.value})}/></div>
                <div className="form-field"><label>Deductions</label><input type="number" value={form.deductions} onChange={e=>setForm({...form,deductions:e.target.value})}/></div>
              </div>
              {form.basicSalary && <div className="salary-preview">Net: <strong>₹{(Number(form.basicSalary)+Number(form.allowances)-Number(form.deductions)).toLocaleString()}</strong></div>}
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={()=>setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Generate</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showPayslip && (
        <div className="modal-overlay">
          <div className="modal-box premium-card">
            <div className="modal-header no-print"><h3>Salary Slip</h3><button className="close-modal-btn" onClick={()=>setShowPayslip(null)}><X size={20}/></button></div>
            <div className="payslip-content">
              <div className="payslip-header"><h2>SALARY SLIP</h2><p>Little Hearts Nursery School</p></div>
              <div className="payslip-info"><div><span>Employee:</span><strong>{showPayslip.staffName}</strong></div><div><span>Month:</span><strong>{showPayslip.month}</strong></div></div>
              <table className="payslip-table"><tbody>
                <tr><td>Basic Salary</td><td>₹{showPayslip.basicSalary.toLocaleString()}</td></tr>
                <tr><td>Allowances</td><td>+₹{showPayslip.allowances.toLocaleString()}</td></tr>
                <tr><td>Deductions</td><td>-₹{showPayslip.deductions.toLocaleString()}</td></tr>
                <tr className="net-row"><td><strong>Net Salary</strong></td><td><strong>₹{showPayslip.netSalary.toLocaleString()}</strong></td></tr>
              </tbody></table>
              <div className="payslip-sigs"><div>Employee</div><div>Principal</div></div>
            </div>
            <div className="modal-footer no-print">
              <button className="secondary-btn" onClick={()=>setShowPayslip(null)}>Close</button>
              <button className="primary-btn" onClick={()=>window.print()}><Printer size={16}/> Print</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default Payroll;
