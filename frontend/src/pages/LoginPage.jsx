import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  GraduationCap, 
  Lock, 
  User, 
  AlertCircle,
  ShieldCheck,
  Building,
  UserCheck,
  Users,
  Heart,
  DollarSign
} from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const rolePresets = [
    { role: 'admin', label: 'Admin', icon: ShieldCheck, user: 'admin', pass: 'admin123', color: '#3b82f6' },
    { role: 'principal', label: 'Principal', icon: Building, user: 'principal', pass: 'principal123', color: '#8b5cf6' },
    { role: 'teacher', label: 'Teacher', icon: UserCheck, user: 'teacher', pass: 'teacher123', color: '#10b981' },
    { role: 'student', label: 'Student', icon: Users, user: 'student', pass: 'student123', color: '#f59e0b' },
    { role: 'parent', label: 'Parent', icon: Heart, user: 'parent', pass: 'parent123', color: '#ec4899' },
    { role: 'accountant', label: 'Accountant', icon: DollarSign, user: 'accountant', pass: 'accountant123', color: '#06b6d4' },
  ];

  const handleRoleSelect = (preset) => {
    setSelectedRole(preset.role);
    setUsername(preset.user);
    setPassword(preset.pass);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to login. Please check server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'radial-gradient(circle at top right, #1e1b4b, #0f172a)'
    }}>
      <div className="glass" style={{ width: '100%', maxWidth: '520px', padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <GraduationCap size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>EduCampus ERP Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
            Select your login role below to access your portal
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '24px',
          padding: '6px',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          {rolePresets.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedRole === preset.role;
            return (
              <button
                key={preset.role}
                type="button"
                onClick={() => handleRoleSelect(preset)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: isSelected ? `1px solid ${preset.color}` : '1px solid transparent',
                  background: isSelected ? `${preset.color}22` : 'transparent',
                  color: isSelected ? preset.color : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isSelected ? '600' : '400',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={14} />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '36px', width: '100%' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '36px', width: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} disabled={loading}>
            {loading ? 'Signing in...' : `Sign In as ${selectedRole.toUpperCase()}`}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Selected Demo Login: <strong style={{ color: 'var(--text-primary)' }}>{username}</strong> / <strong style={{ color: 'var(--text-primary)' }}>{password}</strong>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
