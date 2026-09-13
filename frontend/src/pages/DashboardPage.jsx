import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    total_students: 0,
    total_teachers: 0,
    total_classes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/dashboard/stats')
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const cards = [
    { title: 'Total Students', value: stats.total_students, icon: Users, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { title: 'Total Teachers', value: stats.total_teachers, icon: UserCheck, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    { title: 'Total Classes', value: stats.total_classes, icon: BookOpen, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  ];

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Dashboard Overview" />

      <main style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '6px' }}>{card.title}</p>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>{loading ? '...' : card.value}</h3>
                </div>
                <div style={{ padding: '12px', borderRadius: '12px', background: card.bg, color: card.color }}>
                  <Icon size={24} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--accent-blue)" /> Quick Admin Actions
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Manage school records quickly from the dashboard.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/students" className="btn btn-primary">Student Registration</a>
            <a href="/teachers" className="btn btn-secondary">Teacher Registration</a>
            <a href="/classes" className="btn btn-secondary">Class Detail & Teacher</a>
            <a href="/attendance" className="btn btn-secondary">Attendance Tracker</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
