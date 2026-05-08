import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Printer, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Routine.css';

const Routine = () => {
  const { classes } = useApp();
  const [selectedClass, setSelectedClass] = useState('Nursery');
  const [selectedSection, setSelectedSection] = useState('A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const slots = [
    { name: 'Morning Assembly', time: '08:00 - 08:30' },
    { name: 'Period 1', time: '08:30 - 09:15' },
    { name: 'Period 2', time: '09:15 - 10:00' },
    { name: 'Snack Break', time: '10:00 - 10:30' },
    { name: 'Period 3', time: '10:30 - 11:15' },
    { name: 'Period 4', time: '11:15 - 12:00' },
    { name: 'Lunch Break', time: '12:00 - 12:45' },
    { name: 'Period 5', time: '12:45 - 01:30' },
    { name: 'Period 6', time: '01:30 - 02:15' },
    { name: 'Story/Play Time', time: '02:15 - 03:00' },
    { name: 'Dispersal', time: '03:00 - 03:15' },
  ];

   // const routineKey = `${selectedClass}-${selectedSection}`;

  return (
    <motion.div 
      className="routine-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Class Routine & Timetable</h1>
          <p className="page-subtitle">Academic Year 2025-26 · Manage schedules for Playgroup to UKG.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn"><Printer size={18} /> Print Timetable</button>
          <button className="primary-btn"><Plus size={18} /> Add Entry</button>
        </div>
      </div>

      <div className="routine-controls premium-card">
        <div className="control-group">
          <label>Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="premium-input-sm">
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="control-group">
          <label>Section</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="premium-input-sm">
            <option>A</option><option>B</option><option>C</option>
          </select>
        </div>
        <div className="routine-info-pill">
          <MapPin size={16} /> <span>Main Wing · Room 102</span>
        </div>
      </div>

      <div className="routine-timetable-container premium-card">
        <div className="timetable-wrapper">
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Time Slot</th>
                {days.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.name} className={slot.name.includes('Break') || slot.name.includes('Dispersal') ? 'break-row' : ''}>
                  <td className="slot-name-col">
                    <strong>{slot.name}</strong>
                    <span>{slot.time}</span>
                  </td>
                  {days.map(day => (
                    <td key={`${day}-${slot.name}`} className="slot-content-cell">
                      {slot.name.includes('Break') || slot.name.includes('Dispersal') || slot.name.includes('Assembly') ? (
                        <div className="special-activity">{slot.name}</div>
                      ) : (
                        <div className="class-slot">
                          <span className="s-subject">English Rhymes</span>
                          <span className="s-teacher">Ms. Anjali</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Routine;
