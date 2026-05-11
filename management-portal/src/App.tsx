import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { AppProvider } from './context/AppContext';

// Pages
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Communication from './pages/Communication';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Admission from './pages/Admission';
import Routine from './pages/Routine';
import Subjects from './pages/Subjects';
import Classes from './pages/Classes';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import SchoolCalendar from './pages/Calendar';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import Homework from './pages/Homework';
import Exams from './pages/Exams';
import TCGenerator from './pages/TCGenerator';
import Gallery from './pages/Gallery';
import Messages from './pages/Messages';
import Promotion from './pages/Promotion';
import CalendarEvents from './pages/CalendarEvents';
import './App.css';




import { useApp } from './context/AppContext';

const AppContent = () => {
  const { loading, error } = useApp();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading school data...</p>
      </div>
    );
  }

  // Don't block the whole app — show a banner instead
  return (
    <>
      {error && (
        <div style={{
          background: '#fef2f2', color: '#991b1b', padding: '10px 20px',
          textAlign: 'center', fontSize: '13px', fontWeight: 600,
          borderBottom: '1px solid #fecaca', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: '12px'
        }}>
          ⚠️ Backend API offline — showing cached data.
          <button
            onClick={() => window.location.reload()}
            style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontSize: '12px' }}
          >Retry</button>
        </div>
      )}

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="admission" element={<Admission />} />
        <Route path="students" element={<Students />} />
        <Route path="routine" element={<Routine />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="classes" element={<Classes />} />
        <Route path="staff" element={<Staff />} />
        <Route path="finance" element={<Finance />} />
        <Route path="communication" element={<Communication />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="calendar" element={<SchoolCalendar />} />
        <Route path="leave" element={<Leave />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="homework" element={<Homework />} />
        <Route path="exams" element={<Exams />} />
        <Route path="tc" element={<TCGenerator />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="messages" element={<Messages />} />
        <Route path="promote" element={<Promotion />} />
        <Route path="notifications" element={<CalendarEvents />} />
        <Route path="*" element={<Dashboard />} />



      </Route>
    </Routes>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
