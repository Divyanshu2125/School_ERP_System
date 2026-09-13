import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Plus } from 'lucide-react';

export const GradesPage = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [examName, setExamName] = useState('Midterm');
  const [marks, setMarks] = useState('');

  useEffect(() => {
    API.get('/students/').then(res => setStudents(res.data));
    API.get('/erp/grades').then(res => setGrades(res.data));
  }, []);

  const handleAddGrade = (e) => {
    e.preventDefault();
    API.post('/erp/grades', {
      student_id: Number(studentId),
      subject,
      exam_name: examName,
      marks_obtained: Number(marks),
      max_marks: 100
    }).then(() => {
      API.get('/erp/grades').then(res => setGrades(res.data));
      setSubject(''); setMarks('');
    });
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Grades & Examinations" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Enter Student Exam Marks</h3>
          <form onSubmit={handleAddGrade} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label>Student</label>
              <select className="form-control" required value={studentId} onChange={e => setStudentId(e.target.value)}>
                <option value="">Select Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Exam Name</label>
              <input className="form-control" value={examName} onChange={e => setExamName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input className="form-control" placeholder="e.g. Science" value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Marks Obtained / 100</label>
              <input type="number" className="form-control" value={marks} onChange={e => setMarks(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '16px' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Record Grade</button>
            </div>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Exam</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {grades.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No exam marks recorded yet.</td></tr>
              ) : (
                grades.map(g => (
                  <tr key={g.id}>
                    <td>Student #{g.student_id}</td>
                    <td>{g.exam_name}</td>
                    <td>{g.subject}</td>
                    <td style={{ fontWeight: '600' }}>{g.marks_obtained} / {g.max_marks}</td>
                    <td>
                      <span className={`badge ${g.marks_obtained >= 50 ? 'badge-success' : 'badge-danger'}`}>
                        {g.marks_obtained >= 50 ? 'PASS' : 'FAIL'}
                      </span>
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

export const TimetablePage = () => {
  const [classes, setClasses] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [classId, setClassId] = useState('');
  const [day, setDay] = useState('Monday');
  const [slot, setSlot] = useState('09:00 AM - 10:00 AM');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    API.get('/erp/classes').then(res => setClasses(res.data));
    API.get('/erp/timetable').then(res => setTimetables(res.data));
  }, []);

  const handleAddSlot = (e) => {
    e.preventDefault();
    API.post('/erp/timetable', { class_id: Number(classId), day_of_week: day, time_slot: slot, subject }).then(() => {
      API.get('/erp/timetable').then(res => setTimetables(res.data));
      setSubject('');
    });
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Weekly Class Timetable" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Add Schedule Slot</h3>
          <form onSubmit={handleAddSlot} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label>Select Class</label>
              <select className="form-control" required value={classId} onChange={e => setClassId(e.target.value)}>
                <option value="">Select Class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.grade} - {c.section}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Day of Week</label>
              <select className="form-control" value={day} onChange={e => setDay(e.target.value)}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time Slot</label>
              <input className="form-control" value={slot} onChange={e => setSlot(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input className="form-control" placeholder="e.g. Physics" value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '16px' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Schedule Slot</button>
            </div>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Class ID</th>
                <th>Day</th>
                <th>Time Slot</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {timetables.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No timetables scheduled yet.</td></tr>
              ) : (
                timetables.map(t => (
                  <tr key={t.id}>
                    <td>Class #{t.class_id}</td>
                    <td><span className="badge badge-info">{t.day_of_week}</span></td>
                    <td>{t.time_slot}</td>
                    <td style={{ fontWeight: '600' }}>{t.subject}</td>
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
