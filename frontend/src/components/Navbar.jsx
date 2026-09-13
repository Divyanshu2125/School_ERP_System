import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bell, User, Search } from 'lucide-react';

const Navbar = ({ title }) => {
  const { user } = useContext(AuthContext);

  return (
    <header style={{
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="form-control"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.85rem', width: '200px' }}
          />
        </div>

        <button style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '8px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex'
        }}>
          <Bell size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            {user?.full_name ? user.full_name.charAt(0) : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
