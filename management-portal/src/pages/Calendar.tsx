import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Calendar.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TYPE_COLORS: Record<string, string> = {
  Holiday: '#ef4444', Event: '#8b5cf6', Exam: '#f59e0b', Meeting: '#3b82f6', PTM: '#ec4899'
};

const SchoolCalendar = () => {
  const { calendarEvents, addCalendarEvent, deleteCalendarEvent } = useApp();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', type: 'Holiday' as any, description: '' });

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const eventsOnDay = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarEvent({ id: Math.random().toString(36).substr(2, 9), ...form });
    setForm({ title: '', date: '', type: 'Holiday', description: '' });
    setShowForm(false);
  };

  const upcomingEvents = calendarEvents
    .filter(e => e.date >= today.toISOString().split('T')[0])
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  return (
    <motion.div className="calendar-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-header">
        <div><h1 className="page-title">School Calendar</h1><p className="page-subtitle">Holidays, events, exams, and PTM schedule.</p></div>
        <button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={18} /> Add Event</button>
      </div>

      <div className="calendar-layout">
        <div className="premium-card calendar-main">
          <div className="cal-nav">
            <button className="icon-btn" onClick={prevMonth}><ChevronLeft size={20} /></button>
            <h2>{MONTHS[viewMonth]} {viewYear}</h2>
            <button className="icon-btn" onClick={nextMonth}><ChevronRight size={20} /></button>
          </div>
          <div className="cal-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="cal-weekday">{d}</div>)}
          </div>
          <div className="cal-grid">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="cal-cell empty" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const events = eventsOnDay(day);
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <div key={day} className={`cal-cell ${isToday ? 'today' : ''} ${events.length > 0 ? 'has-event' : ''}`}>
                  <span className="cal-day-num">{day}</span>
                  {events.map(ev => (
                    <div key={ev.id} className="cal-event-dot" style={{ background: TYPE_COLORS[ev.type] }} title={ev.title}>
                      <span>{ev.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="cal-legend">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="legend-item"><span className="legend-dot" style={{ background: color }}></span>{type}</div>
            ))}
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="premium-card upcoming-events-card">
            <h3><Calendar size={18} /> Upcoming Events</h3>
            <div className="upcoming-list">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="upcoming-item">
                  <div className="upcoming-dot" style={{ background: TYPE_COLORS[ev.type] }}></div>
                  <div className="upcoming-info">
                    <strong>{ev.title}</strong>
                    <span>{ev.date}</span>
                    {ev.description && <p>{ev.description}</p>}
                  </div>
                  <button className="icon-btn-sm red" onClick={() => deleteCalendarEvent(ev.id)}><X size={12} /></button>
                </div>
              ))}
              {upcomingEvents.length === 0 && <p className="empty-state-sm">No upcoming events.</p>}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <motion.div className="modal-box premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="modal-header">
              <h3>Add Calendar Event</h3>
              <button className="close-modal-btn" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="modal-form">
              <div className="form-field"><label>Event Title *</label><input required type="text" placeholder="e.g. Independence Day" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div className="form-row">
                <div className="form-field"><label>Date *</label><input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
                <div className="form-field">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value as any})}>
                    <option>Holiday</option><option>Event</option><option>Exam</option><option>Meeting</option><option>PTM</option>
                  </select>
                </div>
              </div>
              <div className="form-field"><label>Description</label><textarea rows={3} placeholder="Optional details..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Add to Calendar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SchoolCalendar;
