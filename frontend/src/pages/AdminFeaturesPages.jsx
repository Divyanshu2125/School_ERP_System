import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Calendar, Clock, Plus, Award } from 'lucide-react';

export const ExamSchedulePage = () => {
  const [classes, setClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [classId, setClassId] = useState('');
  const [examName, setExamName] = useState('Final Term 2026');
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [duration, setDuration] = useState('2 Hours');

  const loadData = () => {
    API.get('/erp/classes').then(res => setClasses(res.data)).catch(console.error);
    API.get('/admin/exam-schedules').then(res => setSchedules(res.data)).catch(console.error);
  };

  useEffect(() => { loadData(); }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    API.post('/admin/exam-schedules', {
      class_id: Number(classId),
      exam_name: examName,
      subject,
      exam_date: examDate,
      start_time: startTime,
      duration
    }).then(() => {
      setSubject(''); setExamDate('');
      loadData();
    }).catch(err => alert(err.response?.data?.detail || 'Failed to schedule exam'));
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Exam Schedule Setter (Admin)" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Schedule New Examination</h3>
          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label>Target Class</label>
              <select className="form-control" required value={classId} onChange={e => setClassId(e.target.value)}>
                <option value="">Select Class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.grade} - {c.section}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Exam Title</label>
              <input className="form-control" value={examName} onChange={e => setExamName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input className="form-control" placeholder="e.g. Physics" value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" className="form-control" value={examDate} onChange={e => setExamDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input className="form-control" value={startTime} onChange={e => setStartTime(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '16px' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Set Schedule</button>
            </div>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Class ID</th>
                <th>Exam Name</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time & Duration</th>
              </tr>
            </thead>
            <tbody>
              {schedules.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No exam schedules configured yet.</td></tr>
              ) : (
                schedules.map(s => (
                  <tr key={s.id}>
                    <td>Class #{s.class_id}</td>
                    <td style={{ fontWeight: '600' }}>{s.exam_name}</td>
                    <td><span className="badge badge-info">{s.subject}</span></td>
                    <td>{s.exam_date}</td>
                    <td>{s.start_time} ({s.duration})</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export const AdmitCardPage = () => {
  const [students, setStudents] = useState([]);
  const [cards, setCards] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [examName, setExamName] = useState('Final Term 2026');

  useEffect(() => {
    API.get('/students/').then(res => setStudents(res.data));
    API.get('/admin/admit-cards').then(res => setCards(res.data));
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();
    const st = students.find(s => s.id === Number(studentId));
    if (!st) return;

    API.post('/admin/admit-cards', {
      student_id: st.id,
      exam_name: examName,
      roll_number: st.roll_number,
      issue_date: new Date().toISOString().split('T')[0]
    }).then(() => {
      API.get('/admin/admit-cards').then(res => setCards(res.data));
    });
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Admit Card Generator (Admin)" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Generate Student Hall Ticket / Admit Card</h3>
          <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 2 }}>
              <label>Select Student</label>
              <select className="form-control" required value={studentId} onChange={e => setStudentId(e.target.value)}>
                <option value="">-- Choose Student --</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.roll_number} - {s.first_name} {s.last_name}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Exam Session</label>
              <input className="form-control" value={examName} onChange={e => setExamName(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary"><Award size={18} /> Issue Admit Card</button>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Admit Card ID</th>
                <th>Roll Number</th>
                <th>Exam Name</th>
                <th>Issue Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cards.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No admit cards generated yet.</td></tr>
              ) : (
                cards.map(c => (
                  <tr key={c.id}>
                    <td>ADM-{c.id}</td>
                    <td><span className="badge badge-info">{c.roll_number}</span></td>
                    <td style={{ fontWeight: '600' }}>{c.exam_name}</td>
                    <td>{c.issue_date}</td>
                    <td><span className="badge badge-success">{c.status}</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => window.print()}>
                        Print Card
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
