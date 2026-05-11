import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Search, MessageSquare } from 'lucide-react';
import './Messages.css';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchMessages();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="messages-page">
      <div className="page-header">
        <div className="header-text">
          <h1>Website Inquiries</h1>
          <p>Manage messages from the public contact form</p>
        </div>
      </div>

      <div className="messages-controls">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading messages...</div>
      ) : (
        <div className="messages-list">
          {filteredMessages.map(msg => (
            <div key={msg.id} className={`message-card ${msg.status.toLowerCase()}`}>
              <div className="message-header">
                <div className="sender-info">
                  <div className="avatar">{msg.name[0]}</div>
                  <div>
                    <h3>{msg.name}</h3>
                    <p>{msg.email}</p>
                  </div>
                </div>
                <div className="message-meta">
                  <span className={`status-badge ${msg.status.toLowerCase()}`}>
                    {msg.status === 'New' ? <Clock size={12} /> : <CheckCircle size={12} />}
                    {msg.status}
                  </span>
                  <span className="date">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="message-content">
                {msg.subject && <h4 className="subject">Subject: {msg.subject}</h4>}
                <p>{msg.message}</p>
              </div>
              <div className="message-actions">
                {msg.status === 'New' && (
                  <button className="mark-read-btn" onClick={() => updateStatus(msg.id, 'Read')}>
                    <CheckCircle size={16} /> Mark as Read
                  </button>
                )}
                <button className="delete-btn" onClick={() => {/* Implement delete if needed */}}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredMessages.length === 0 && (
            <div className="empty-state">
              <MessageSquare size={48} />
              <p>No messages found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
