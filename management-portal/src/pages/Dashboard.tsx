import { motion } from 'framer-motion';
import { 
  Users, 
  CalendarDays, 
  BookOpen, 
  Building2, 
  TrendingUp, 
  ArrowRight,
  Bell,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { students, teachers, classes, notices } = useApp();

  const stats = [
    { label: 'Total Students', value: students.length.toString(), trend: '+24', isUp: true, icon: <Users /> },
    { label: 'Active Teachers', value: teachers.length.toString(), trend: '+2', isUp: true, icon: <UserCheck /> },
    { label: 'Total Classes', value: classes.length.toString(), trend: 'Stable', isUp: true, icon: <Building2 /> },
    { label: 'Active Subjects', value: '42', trend: '+4', isUp: true, icon: <BookOpen /> },
  ];

  return (
    <motion.div 
      className="dashboard-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="dashboard-header">
        <h1 className="page-title">School Overview</h1>
        <p className="page-subtitle">Welcome back, Admin. Here's a snapshot of the academic session.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="premium-card stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-trend up">
                <TrendingUp size={14} />
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="main-content-dash">
          <div className="premium-card routine-preview-card">
            <div className="card-header">
              <h3>Today's Schedule</h3>
              <button className="text-btn">View All <ArrowRight size={14} /></button>
            </div>
            <div className="timeline-dash">
              <div className="timeline-item-dash">
                <div className="t-time">09:00 AM</div>
                <div className="t-content">
                  <strong>Grade 10 - Mathematics</strong>
                  <p>Teacher: Mr. Sunil Verma</p>
                </div>
              </div>
              <div className="timeline-item-dash">
                <div className="t-time">10:30 AM</div>
                <div className="t-content">
                  <strong>Grade 12 - Physics</strong>
                  <p>Teacher: Dr. Neha Kapoor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card recent-notices-dash">
            <div className="card-header">
              <h3>Recent Announcements</h3>
              <button className="text-btn">Notice Board <ArrowRight size={14} /></button>
            </div>
            <div className="dash-notice-list">
              {notices.map(notice => (
                <div key={notice.id} className="dash-notice-item">
                  <div className="n-date-box">
                    <span>{new Date(notice.date).getDate()}</span>
                    <small>{new Date(notice.date).toLocaleString('default', { month: 'short' })}</small>
                  </div>
                  <div className="n-content">
                    <strong>{notice.title}</strong>
                    <p>{notice.content.substring(0, 60)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-dash">
          <div className="premium-card attendance-summary-card">
            <h3>Attendance Pulse</h3>
            <div className="pulse-chart-mock">
              <div className="pulse-val">94%</div>
              <div className="pulse-label">Overall Today</div>
            </div>
            <div className="pulse-breakdown">
              <div className="p-row"><span>Students</span> <strong>{students.length}</strong></div>
              <div className="p-row"><span>Active</span> <strong>{students.filter(s => s.status === 'Active').length}</strong></div>
            </div>
          </div>

          <div className="premium-card quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="q-action-btns">
              <button className="q-btn"><CalendarDays size={18} /> Plan Routine</button>
              <button className="q-btn"><Bell size={18} /> Send Notice</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
