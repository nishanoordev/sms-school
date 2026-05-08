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
import './App.css';

function App() {
  return (
    <AppProvider>
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
          <Route path="settings" element={<Settings />} />
          <Route path="communication" element={<Communication />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
