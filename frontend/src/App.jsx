import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import { ClassesPage, AttendancePage, FeesPage } from './pages/ErpPages';
import { GradesPage, TimetablePage } from './pages/GradesAndTimetable';
import { ExamSchedulePage, AdmitCardPage } from './pages/AdminFeaturesPages';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);
  if (loading) return null;
  return token ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { token } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
      {token && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><StudentsPage /></PrivateRoute>} />
        <Route path="/teachers" element={<PrivateRoute><TeachersPage /></PrivateRoute>} />
        <Route path="/classes" element={<PrivateRoute><ClassesPage /></PrivateRoute>} />
        <Route path="/timetable" element={<PrivateRoute><TimetablePage /></PrivateRoute>} />
        <Route path="/exam-schedule" element={<PrivateRoute><ExamSchedulePage /></PrivateRoute>} />
        <Route path="/admit-card" element={<PrivateRoute><AdmitCardPage /></PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute><AttendancePage /></PrivateRoute>} />
        <Route path="/fees" element={<PrivateRoute><FeesPage /></PrivateRoute>} />
        <Route path="/grades" element={<PrivateRoute><GradesPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
