import { motion } from 'framer-motion';
import { Building2, Plus, Users, LayoutGrid, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Classes.css';

const Classes = () => {
  const { classes } = useApp();

  return (
    <motion.div 
      className="classes-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Classes & Sections</h1>
          <p className="page-subtitle">Define the academic structure and manage classroom capacity.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn"><Plus size={18} /> New Class</button>
        </div>
      </div>

      <div className="classes-grid">
        {classes.map((cls) => (
          <motion.div 
            key={cls.id} 
            className="premium-card class-card-large"
            whileHover={{ translateY: -5 }}
          >
            <div className="class-card-header">
              <div className="class-icon-box"><Building2 size={24} /></div>
              <div className="class-title-box">
                <h2>{cls.name}</h2>
                <p>Academic Year 2025-26</p>
              </div>
            </div>

            <div className="class-stats-row">
              <div className="c-stat">
                <LayoutGrid size={18} />
                <span><strong>{cls.sections.length}</strong> Sections</span>
              </div>
              <div className="c-stat">
                <Users size={18} />
                <span><strong>{cls.capacity}</strong> Capacity</span>
              </div>
            </div>

            <div className="sections-list-preview">
              {cls.sections.map(sec => (
                <div key={sec} className="section-pill">Section {sec}</div>
              ))}
            </div>

            <div className="class-card-footer">
              <button className="text-btn">Manage Details <ChevronRight size={16} /></button>
            </div>
          </motion.div>
        ))}

        <div className="add-class-placeholder">
          <Plus size={40} />
          <p>Create New Class</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Classes;
