import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Plus, Pin, Calendar, X, Edit2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Communication.css';

const Communication = () => {
  const { notices, addNotice, updateNotice, deleteNotice } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'General' as 'Academic' | 'General' | 'Urgent', expiryDate: '' });

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateNotice(editingId, form);
    } else {
      await addNotice({
        id: Math.random().toString(36).substr(2, 9),
        ...form,
        date: new Date().toISOString().split('T')[0]
      } as any);
    }
    setForm({ title: '', content: '', category: 'General', expiryDate: '' });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (notice: any) => {
    setForm({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      expiryDate: notice.expiryDate
    });
    setEditingId(notice.id);
    setShowForm(true);
  };

  const categoryColor: Record<string, string> = {
    Urgent: '#ef4444', Academic: '#3b82f6', General: '#22c55e'
  };

  return (
    <motion.div className="comm-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Notice Board</h1>
          <p className="page-subtitle">Post and manage school circulars and announcements.</p>
        </div>
        <button className="primary-btn" onClick={() => { setEditingId(null); setForm({ title: '', content: '', category: 'General', expiryDate: '' }); setShowForm(true); }}><Plus size={18} /> Post Notice</button>
      </div>

      <div className="premium-card comm-search-bar">
        <Search size={18} />
        <input type="text" placeholder="Search notices..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="notices-grid">
        {filtered.map(notice => (
          <motion.div key={notice.id} className="premium-card notice-card" whileHover={{ translateY: -3 }}>
            <div className="notice-top">
              <span className="notice-cat-badge" style={{ background: categoryColor[notice.category] + '20', color: categoryColor[notice.category] }}>
                {notice.category === 'Urgent' && '🔴 '}{notice.category}
              </span>
              <div className="notice-actions">
                <button className="icon-btn-sm" onClick={() => handleEdit(notice)}><Edit2 size={14} /></button>
                <button className="icon-btn-sm red" onClick={() => deleteNotice(notice.id)}><X size={14} /></button>
              </div>
            </div>
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-body">{notice.content}</p>
            <div className="notice-footer">
              <span><Calendar size={12} /> {notice.date}</span>
              <span>Expires: {notice.expiryDate}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Notice' : 'Post New Notice'}</h3>
              <button className="close-modal-btn" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-field"><label>Notice Title *</label><input required type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div className="form-field"><label>Content *</label><textarea required rows={4} placeholder="Notice details..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></div>
              <div className="form-row">
                <div className="form-field">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value as any})}>
                    <option>General</option><option>Academic</option><option>Urgent</option>
                  </select>
                </div>
                <div className="form-field"><label>Expiry Date *</label><input required type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} /></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn"><Bell size={16} /> {editingId ? 'Update Notice' : 'Post Notice'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Communication;
