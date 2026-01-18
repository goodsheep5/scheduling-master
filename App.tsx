
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import WeeklySchedule from './pages/WeeklySchedule';
import DailySchedule from './pages/DailySchedule';
import EmployeeManagement from './pages/EmployeeManagement';
import CreateNewEmployee from './pages/CreateNewEmployee';
import EditEmployee from './pages/EditEmployee';
import SchedulingManagement from './pages/SchedulingManagement';
import CreateSchedule from './pages/CreateSchedule';
import EditSchedule from './pages/EditSchedule';
import Availability from './pages/Availability';
import AvailabilitySummary from './pages/AvailabilitySummary';
import HumanResourceCosts from './pages/HumanResourceCosts';
import AccessManagement from './pages/AccessManagement';
import Settings1 from './pages/SystemSettings/Settings1';
import Settings2 from './pages/SystemSettings/Settings2';
import Settings3 from './pages/SystemSettings/Settings3';
import StationManpowerSettings from './pages/StationManpowerSettings';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<WeeklySchedule />} />
          <Route path="/daily-schedule" element={<DailySchedule />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/create-new-employees" element={<CreateNewEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/scheduling-management" element={<SchedulingManagement />} />
          <Route path="/create-schedule" element={<CreateSchedule />} />
          <Route path="/edit-schedule/:shiftId" element={<EditSchedule />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/availability-summary" element={<AvailabilitySummary />} />
          <Route path="/hr-costs" element={<HumanResourceCosts />} />
          <Route path="/access-management" element={<AccessManagement />} />
          <Route path="/station-manpower" element={<StationManpowerSettings />} />
          <Route path="/system-settings-1" element={<Settings1 />} />
          <Route path="/system-settings-2" element={<Settings2 />} />
          <Route path="/system-settings-3" element={<Settings3 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
