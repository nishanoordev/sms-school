import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, UserPlus, Users, CalendarDays, BookOpen, Building2,
  UserSquare, ClipboardCheck, Bell, Search, Menu, X, ChevronRight,
  Wallet, FileText, Settings, Calendar, LogOut, DollarSign, BookMarked,
  ClipboardList, Award
} from 'lucide-react';
import './Layout.css';

const navGroups = [
  {
    label: 'STUDENT',
    items: [
      { path: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
      { path: '/admission', icon: <UserPlus size={18} />, label: 'Admission Form' },
      { path: '/students', icon: <Users size={18} />, label: 'Student Directory' },
      { path: '/attendance', icon: <ClipboardCheck size={18} />, label: 'Attendance' },
      { path: '/reports', icon: <FileText size={18} />, label: 'Progress Reports' },
      { path: '/tc', icon: <Award size={18} />, label: 'Transfer Certificate' },
    ]
  },
  {
    label: 'ACADEMIC',
    items: [
      { path: '/classes', icon: <Building2 size={18} />, label: 'Classes & Sections' },
      { path: '/subjects', icon: <BookOpen size={18} />, label: 'Subjects' },
      { path: '/routine', icon: <CalendarDays size={18} />, label: 'Class Routine' },
      { path: '/homework', icon: <BookMarked size={18} />, label: 'Homework' },
      { path: '/exams', icon: <ClipboardList size={18} />, label: 'Exam Schedule' },
    ]
  },
  {
    label: 'STAFF & HR',
    items: [
      { path: '/staff', icon: <UserSquare size={18} />, label: 'Teachers' },
      { path: '/leave', icon: <LogOut size={18} />, label: 'Leave Management' },
      { path: '/payroll', icon: <DollarSign size={18} />, label: 'Payroll' },
    ]
  },
  {
    label: 'FINANCE & ADMIN',
    items: [
      { path: '/finance', icon: <Wallet size={18} />, label: 'Fee Management' },
      { path: '/communication', icon: <Bell size={18} />, label: 'Notice Board' },
      { path: '/calendar', icon: <Calendar size={18} />, label: 'School Calendar' },
      { path: '/settings', icon: <Settings size={18} />, label: 'School Profile' },
    ]
  }
];

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">SC</div>
            {isSidebarOpen && <span className="logo-text">SchoolCore</span>}
          </div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map(group => (
            <div key={group.label} className="nav-group">
              {isSidebarOpen && <div className="nav-group-label">{group.label}</div>}
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isSidebarOpen && <span className="nav-label">{item.label}</span>}
                  {isSidebarOpen && <ChevronRight className="nav-arrow" size={14} />}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            {isSidebarOpen && (
              <div className="user-info">
                <p className="user-name">Admin User</p>
                <p className="user-role">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header glass">
          <div className="header-left">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search students, teachers, exams..." />
            </div>
          </div>
          <div className="header-right">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <div className="divider"></div>
            <div className="header-date">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </header>

        <div className="content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
