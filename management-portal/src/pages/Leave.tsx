import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, XCircle, Clock, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Leave.css';

const Leave = () => {
  const { teachers, leaveRequests, addLeaveRequest, updateLeaveStatus } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [form, setForm] = useState({ staffId: '', type: 'Sick Leave' as any, fromDate: '', toDate: '', reason: '' });

  const filtered = leaveRequests.filter(r => filterStatus === 'All' || r.status === filterStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === form.staffId);
    addLeaveRequest({
      id: Math.random().toString(36).substr(2, 9),
      staffId: form.staffId,
      staffName: teacher?.name || '',
      type: form.type,
      fromDate: form.fromDate,
      toDate: form.toDate,
      reason: form.reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    });
    setForm({ staffId: '', type: 'Sick Leave', fromDate: '', toDate: '', reason: '' });
    setShowForm(false);
  };

  const statusStyle: Record<string, string> = {
    Pending: 'pending', Approved: 'approved', Rejected: 'rejected'
  };

  const leaveSummary = {
    pending: leaveRequests.filter(r => r.status === 'Pending').length,
    approved: leaveRequests.filter(r => r.status === 'Approved').length,
    rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <motion.div className="leave-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div><h1 className="page-title">Leave Management</h1><p className="page-subtitle">Staff leave applications, approvals, and history.</p></div>
        <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={18} /> Apply Leave</button>
      </div>

      <div className="leave-stats-grid">
        <div className="premium-card leave-stat"><div className="leave-stat-icon pending-icon"><Clock /></div><div><span>Pending</span><h3>{leaveSummary.pending}</h3></div></div>
        <div className="premium-card leave-stat"><div className="leave-stat-icon approved-icon"><CheckCircle2 /></div><div><span>Approved</span><h3>{leaveSummary.approved}</h3></div></div>
        <div className="premium-card leave-stat"><div className="leave-stat-icon rejected-icon"><XCircle /></div><div><span>Rejected</span><h3>{leaveSummary.rejected}</h3></div></div>
      </div>

      <div className="premium-card leave-table-card">
        <div className="leave-table-header">
          <h3>Leave Requests</h3>
          <div className="status-filter-tabs">
            {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
              <button key={s} className={`filter-tab ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>{s}</button>
            ))}
          </div>
        </div>
        <table className="leave-table">
          <thead><tr><th>Staff Name</th><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id}>
                <td><strong>{req.staffName}</strong></td>
                <td><span className="leave-type-badge">{req.type}</span></td>
                <td>{req.fromDate}</td>
                <td>{req.toDate}</td>
                <td className="reason-cell">{req.reason}</td>
                <td><span className={`leave-status-badge ${statusStyle[req.status]}`}>{req.status}</span></td>
                <td>
                  {req.status === 'Pending' && (
                    <div className="action-btns">
                      <button className="approve-btn" onClick={() => updateLeaveStatus(req.id, 'Approved')}><CheckCircle2 size={14} /></button>
                      <button className="reject-btn" onClick={() => updateLeaveStatus(req.id, 'Rejected')}><XCircle size={14} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="empty-state-sm">No leave requests found.</p>}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3>Apply for Leave</h3>
              <button className="close-modal-btn" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Staff Member *</label>
                  <select required value={form.staffId} onChange={e => setForm({...form, staffId: e.target.value})}>
                    <option value="">Select Staff</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Leave Type *</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value as any})}>
                    <option>Sick Leave</option><option>Casual Leave</option><option>Earned Leave</option><option>Maternity Leave</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>From Date *</label><input required type="date" value={form.fromDate} onChange={e => setForm({...form, fromDate: e.target.value})} /></div>
                <div className="form-field"><label>To Date *</label><input required type="date" value={form.toDate} onChange={e => setForm({...form, toDate: e.target.value})} /></div>
              </div>
              <div className="form-field"><label>Reason *</label><textarea required rows={3} placeholder="Reason for leave..." value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} /></div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn"><AlertTriangle size={16} /> Submit Application</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Leave;
