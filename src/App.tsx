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

  if (error) {
    return (
      <div className="error-screen">
        <h2>Connection Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
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
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
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
