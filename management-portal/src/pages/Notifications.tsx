import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bell, Info, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import './Communication.css'; // Reuse communication styles

const Notifications = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('/');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:3001/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, url })
      });
      if (res.ok) {
        setStatus('success');
        setTitle('');
        setBody('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Failed to send notification:', err);
      setStatus('error');
    }
  };

  return (
    <motion.div className="comm-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Push Notifications</h1>
          <p className="page-subtitle">Send instant alerts to parents' browsers.</p>
        </div>
      </div>

      <div className="premium-card notification-info" style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '0.75rem', background: '#3b82f615', color: '#3b82f6', borderRadius: '12px' }}>
            <Info size={24} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>How it works</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
              These notifications are sent directly to the browsers of parents who have subscribed on the public website. 
              They will see a popup even if they don't have the website open.
            </p>
          </div>
        </div>
      </div>

      <div className="premium-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-field">
            <label>Notification Title</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. School Holiday Reminder" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
          <div className="form-field">
            <label>Notification Message</label>
            <textarea 
              required 
              rows={4} 
              placeholder="Type your message here..." 
              value={body} 
              onChange={e => setBody(e.target.value)} 
            />
          </div>
          <div className="form-field">
            <label>Target URL (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. /notices or /gallery" 
              value={url} 
              onChange={e => setUrl(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              type="submit" 
              className="primary-btn" 
              disabled={status === 'sending'}
              style={{ padding: '0.75rem 2rem' }}
            >
              {status === 'sending' ? (
                <>
                  <RefreshCw size={18} className="spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send to All Parents
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}
              >
                <CheckCircle size={18} /> Sent Successfully!
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}
              >
                <AlertTriangle size={18} /> Failed to send.
              </motion.div>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Notifications;
