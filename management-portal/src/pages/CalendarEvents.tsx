import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Bell } from 'lucide-react';
import './CalendarEvents.css';

const API = 'http://localhost:3001/api/calendar-events';

const CATEGORIES = ['Holiday', 'Exam', 'Event', 'Meeting', 'Announcement', 'Other'];

interface PublicEvent {
  id: number;
  title: string;
  date: string;
  description?: string;
  category?: string;
  isPublished: boolean;
}

const emptyForm = {
  title: '',
  date: '',
  time: '',
  description: '',
  category: 'Event',
  isPublished: true,
};

const CalendarEvents = () => {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [calDate, setCalDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setEvents(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  // ── Calendar helpers ──
  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = calDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const eventDates = new Set(
    events
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(e => new Date(e.date).getDate())
  );

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // ── Filtered events ──
  const visibleEvents = selectedDate
    ? events.filter(e => {
        const d = new Date(e.date);
        return (
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
        );
      })
    : events;

  // ── Form handlers ──
  const openAddForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      date: selectedDate
        ? selectedDate.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  const openEditForm = (ev: PublicEvent) => {
    const d = new Date(ev.date);
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      date: d.toISOString().slice(0, 10),
      time: d.toISOString().slice(11, 16),
      description: ev.description || '',
      category: ev.category || 'Event',
      isPublished: ev.isPublished,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.date) return;
    setSaving(true);
    const dateStr = form.time ? `${form.date}T${form.time}:00` : `${form.date}T00:00:00`;
    const body = {
      title: form.title,
      date: dateStr,
      description: form.description || null,
      category: form.category,
      isPublished: form.isPublished,
    };
    try {
      if (editingId !== null) {
        const res = await fetch(`${API}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const updated = await res.json();
        setEvents(prev => prev.map(e => e.id === editingId ? updated : e));
      } else {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const created = await res.json();
        setEvents(prev => [...prev, created]);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch { /* ignore */ }
    setDeleteConfirm(null);
  };

  const togglePublish = async (ev: PublicEvent) => {
    try {
      const res = await fetch(`${API}/${ev.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !ev.isPublished }),
      });
      const updated = await res.json();
      setEvents(prev => prev.map(e => e.id === ev.id ? updated : e));
    } catch { /* ignore */ }
  };

  return (
    <div className="cal-events-page">
      <div className="cal-events-header">
        <h2><Bell size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />Notifications &amp; Calendar</h2>
        <button className="btn-primary" onClick={openAddForm}>
          <Plus size={16} /> Add New Event
        </button>
      </div>

      <div className="cal-events-layout">

        {/* ── Left: Mini Calendar ── */}
        <div className="cal-panel">
          <div className="cal-mini-header">
            <button className="cal-nav-btn" onClick={() => { const d = new Date(calDate); d.setMonth(d.getMonth()-1); setCalDate(d); }}>‹</button>
            <h4>{monthName}</h4>
            <button className="cal-nav-btn" onClick={() => { const d = new Date(calDate); d.setMonth(d.getMonth()+1); setCalDate(d); }}>›</button>
          </div>
          <div className="cal-grid">
            {dayNames.map(d => <div key={d} className="cal-day-name">{d}</div>)}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="cal-date empty" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = i + 1;
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
              const hasEvent = eventDates.has(d);
              const isSel = selectedDate &&
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() === month &&
                selectedDate.getDate() === d;
              let cls = 'cal-date';
              if (isToday) cls += ' today';
              if (hasEvent) cls += ' has-event';
              if (isSel) cls += ' selected';
              return (
                <div
                  key={d}
                  className={cls}
                  onClick={() => {
                    const clicked = new Date(year, month, d);
                    if (isSel) { setSelectedDate(null); }
                    else { setSelectedDate(clicked); }
                  }}
                >{d}</div>
              );
            })}
          </div>
          {selectedDate && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button className="btn-secondary" style={{ fontSize: 12 }} onClick={() => setSelectedDate(null)}>
                Clear selection
              </button>
            </div>
          )}
        </div>

        {/* ── Right: Event Manager ── */}
        <div className="events-panel">
          <div className="events-panel-header">
            <h3>
              {selectedDate
                ? `Events on ${selectedDate.toDateString()}`
                : 'All Events'}
              <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 600, color: '#7c3aed', background: '#ede9fe', padding: '2px 10px', borderRadius: 20 }}>
                {visibleEvents.length}
              </span>
            </h3>
            {!showForm && (
              <button className="btn-primary" onClick={openAddForm}>
                <Plus size={14} /> Add Event
              </button>
            )}
          </div>

          {/* Add / Edit Form */}
          {showForm && (
            <div className="event-form-card">
              <h4>{editingId !== null ? 'Edit Event' : 'Add New Event'}</h4>
              <div className="event-form-grid">
                <div className="event-form-group full">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="Event title"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div className="event-form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  />
                </div>
                <div className="event-form-group">
                  <label>Time (optional)</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                  />
                </div>
                <div className="event-form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="event-form-group" style={{ justifyContent: 'flex-end' }}>
                  <label>Visibility</label>
                  <div className="toggle-row">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={form.isPublished}
                        onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                      />
                      <span className="toggle-slider" />
                    </label>
                    <span className="toggle-label">{form.isPublished ? 'Published' : 'Draft'}</span>
                  </div>
                </div>
                <div className="event-form-group full">
                  <label>Description (optional)</label>
                  <textarea
                    placeholder="Brief description…"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                <button className="btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : (editingId !== null ? 'Update Event' : 'Create Event')}
                </button>
              </div>
            </div>
          )}

          {/* Events List */}
          {loading ? (
            <div className="events-empty"><p>Loading events…</p></div>
          ) : visibleEvents.length === 0 ? (
            <div className="events-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <p>No events found. Click "Add Event" to create one.</p>
            </div>
          ) : (
            visibleEvents
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(ev => {
                const d = new Date(ev.date);
                const cat = (ev.category || 'other').toLowerCase();
                return (
                  <div key={ev.id} className="event-card-admin">
                    <div className="event-date-box">
                      <span className="day">{d.getDate()}</span>
                      <span className="mon">{d.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="event-card-body">
                      <p className="event-card-title">{ev.title}</p>
                      <div className="event-card-meta">
                        <span className={`event-cat-badge cat-${cat}`}>{ev.category || 'Other'}</span>
                        {!ev.isPublished && <span className="draft-badge">Draft</span>}
                      </div>
                      {ev.description && (
                        <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0', lineHeight: 1.4 }}>{ev.description}</p>
                      )}
                    </div>
                    <div className="event-card-actions">
                      <button
                        className={ev.isPublished ? 'btn-secondary' : 'btn-primary'}
                        style={{ fontSize: 11, padding: '5px 10px' }}
                        onClick={() => togglePublish(ev)}
                        title={ev.isPublished ? 'Set as Draft' : 'Publish'}
                      >
                        {ev.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="btn-edit" onClick={() => openEditForm(ev)} title="Edit">
                        <Edit3 size={13} />
                      </button>
                      {deleteConfirm === ev.id ? (
                        <>
                          <button className="btn-danger" onClick={() => handleDelete(ev.id)}>Confirm</button>
                          <button className="btn-secondary" style={{ fontSize: 11, padding: '5px 8px' }} onClick={() => setDeleteConfirm(null)}>✕</button>
                        </>
                      ) : (
                        <button className="btn-danger" onClick={() => setDeleteConfirm(ev.id)} title="Delete">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEvents;
