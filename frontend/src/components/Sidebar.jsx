import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  Calendar, 
  Award, 
  Clock, 
  LogOut,
  GraduationCap,
  FileCheck,
  CalendarCheck
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const role = user?.role || 'admin';

  // Role based navigation filtering (Fees removed for Admin/Teachers)
  const allNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'principal', 'teacher', 'student', 'parent', 'accountant'] },
    { path: '/students', label: 'Student Registration', icon: Users, roles: ['admin', 'principal', 'teacher', 'accountant'] },
    { path: '/teachers', label: 'Teacher Registration', icon: UserCheck, roles: ['admin', 'principal'] },
    { path: '/classes', label: 'Class Detail & Teacher', icon: BookOpen, roles: ['admin', 'principal', 'teacher'] },
    { path: '/timetable', label: 'Time Table Setter', icon: Clock, roles: ['admin', 'principal', 'teacher', 'student', 'parent'] },
    { path: '/exam-schedule', label: 'Exam Schedule Setter', icon: CalendarCheck, roles: ['admin', 'principal'] },
    { path: '/admit-card', label: 'Admit Card Generator', icon: FileCheck, roles: ['admin', 'principal', 'student', 'parent'] },
    { path: '/attendance', label: 'Attendance Tracker', icon: Calendar, roles: ['admin', 'principal', 'teacher', 'student', 'parent'] },
    { path: '/grades', label: 'Grades & Report', icon: Award, roles: ['admin', 'principal', 'teacher', 'student', 'parent'] },
  ];

  const filteredNavItems = allNavItems.filter(item => item.roles.includes(role));

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 90
    }}>
      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          padding: '8px',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <GraduationCap size={24} color="white" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>EduCampus</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>School ERP System</p>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                background: isActive ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
                textDecoration: 'none',
                marginBottom: '4px',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>{user?.full_name || 'User'}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', textTransform: 'uppercase', fontWeight: '700' }}>{user?.role}</p>
        </div>
        <button 
          onClick={handleLogout} 
          style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
