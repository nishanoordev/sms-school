import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  CalendarDays, 
  BookOpen, 
  Building2, 
  UserSquare, 
  ClipboardCheck, 
  Bell, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  Wallet,
  FileText,
  Settings
} from 'lucide-react';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admission', icon: <UserPlus size={20} />, label: 'Admission Form' },
    { path: '/students', icon: <Users size={20} />, label: 'Student Directory' },
    { path: '/routine', icon: <CalendarDays size={20} />, label: 'Class Routine' },
    { path: '/subjects', icon: <BookOpen size={20} />, label: 'Subjects' },
    { path: '/classes', icon: <Building2 size={20} />, label: 'Classes & Sections' },
    { path: '/staff', icon: <UserSquare size={20} />, label: 'Teachers' },
    { path: '/attendance', icon: <ClipboardCheck size={20} />, label: 'Attendance' },
    { path: '/finance', icon: <Wallet size={20} />, label: 'Finance' },
    { path: '/communication', icon: <Bell size={20} />, label: 'Notices' },
    { path: '/reports', icon: <FileText size={20} />, label: 'Reports' },
    { path: '/settings', icon: <Settings size={20} />, label: 'School Profile' },
  ];

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
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
              {isSidebarOpen && <ChevronRight className="nav-arrow" size={14} />}
            </NavLink>
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
              <input type="text" placeholder="Search students, teachers, routines..." />
            </div>
          </div>
          <div className="header-right">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <div className="divider"></div>
            <div className="header-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
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
