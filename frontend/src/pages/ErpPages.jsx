import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Plus, Trash2, UserCheck } from 'lucide-react';

export const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [room, setRoom] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState({});

  const loadData = () => {
    API.get('/erp/classes').then(res => setClasses(res.data)).catch(console.error);
    API.get('/teachers/').then(res => setTeachers(res.data)).catch(console.error);
  };

  useEffect(() => { loadData(); }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    API.post('/erp/classes', { grade, section, room_number: room }).then(() => {
      setGrade(''); setSection(''); setRoom('');
      loadData();
    });
  };

  const handleAssignTeacher = (classId) => {
    const teacherId = selectedTeacherId[classId];
    if (!teacherId) return alert('Please select a teacher first');
    API.put(`/admin/classes/${classId}/assign-teacher/${teacherId}`).then(() => {
      alert('Class teacher assigned successfully!');
      loadData();
    }).catch(err => alert(err.response?.data?.detail || 'Failed to assign teacher'));
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Class Detail & Class Teacher Setter (Admin)" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Add New Class Section</h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Grade / Class</label>
              <input className="form-control" placeholder="e.g. Grade 10" required value={grade} onChange={e => setGrade(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Section</label>
              <input className="form-control" placeholder="e.g. Section A" required value={section} onChange={e => setSection(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Room Number</label>
              <input className="form-control" placeholder="e.g. Room 302" value={room} onChange={e => setRoom(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary"><Plus size={18} /> Add Class</button>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Room</th>
                <th>Assigned Class Teacher</th>
                <th>Set / Change Class Teacher</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No classes registered.</td></tr>
              ) : (
                classes.map(c => {
                  const assigned = teachers.find(t => t.id === c.class_teacher_id);
                  return (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td style={{ fontWeight: '600' }}>{c.grade}</td>
                      <td><span className="badge badge-info">{c.section}</span></td>
                      <td>{c.room_number || 'Unassigned'}</td>
                      <td>
                        {assigned ? (
                          <span className="badge badge-success">{assigned.first_name} {assigned.last_name}</span>
                        ) : (
                          <span className="badge badge-warning">Not Assigned</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <select 
                            className="form-control" 
                            style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                            value={selectedTeacherId[c.id] || ''}
                            onChange={e => setSelectedTeacherId({...selectedTeacherId, [c.id]: e.target.value})}
                          >
                            <option value="">Select Teacher</option>
                            {teachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name} ({t.employee_id})</option>)}
                          </select>
                          <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.75rem' }} onClick={() => handleAssignTeacher(c.id)}>
                            <UserCheck size={14} /> Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    API.get('/students/').then(res => setStudents(res.data));
    API.get('/erp/attendance').then(res => setRecords(res.data));
  }, []);

  const handleMark = (e) => {
    e.preventDefault();
    API.post('/erp/attendance', { student_id: Number(selectedStudent), date, status }).then(() => {
      API.get('/erp/attendance').then(res => setRecords(res.data));
    });
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Daily Attendance Tracker" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Mark Daily Student Attendance</h3>
          <form onSubmit={handleMark} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 2 }}>
              <label>Select Student</label>
              <select className="form-control" required value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                <option value="">-- Choose Student --</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.roll_number || s.admission_number} - {s.first_name} {s.last_name}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Date</label>
              <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Status</label>
              <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Record Attendance</button>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student ID</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No attendance logs found.</td></tr>
              ) : (
                records.map(r => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>Student #{r.student_id}</td>
                    <td>
                      <span className={`badge ${r.status === 'Present' ? 'badge-success' : r.status === 'Absent' ? 'badge-danger' : 'badge-warning'}`}>
                        {r.status}
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

export const FeesPage = () => {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [title, setTitle] = useState('Tuition Fee');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');

  const loadFees = () => {
    API.get('/students/').then(res => setStudents(res.data));
    API.get('/erp/fees').then(res => setFees(res.data));
  };

  useEffect(() => {
    loadFees();
  }, []);

  const handleAddFee = (e) => {
    e.preventDefault();
    API.post('/erp/fees', { student_id: Number(studentId), title, amount: Number(amount), status, due_date: dueDate }).then(() => {
      loadFees();
      setAmount('');
    });
  };

  const handleDeleteFee = (feeId) => {
    if (window.confirm('Are you sure you want to delete this fee invoice?')) {
      API.delete(`/erp/fees/${feeId}`).then(() => {
        loadFees();
      }).catch(err => alert(err.response?.data?.detail || 'Failed to delete fee invoice'));
    }
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Fees & Invoices Management" />
      <main style={{ padding: '24px' }}>
        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Collect Fees / Issue Fee Invoice</h3>
          <form onSubmit={handleAddFee} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label>Student</label>
              <select className="form-control" required value={studentId} onChange={e => setStudentId(e.target.value)}>
                <option value="">Select Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.admission_number} - {s.first_name} {s.last_name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Fee Description</label>
              <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Amount ($)</label>
              <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid / Collected</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '16px' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Issue / Collect Fee</button>
            </div>
          </form>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Student ID</th>
                <th>Fee Title</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No fee invoices issued yet.</td></tr>
              ) : (
                fees.map(f => (
                  <tr key={f.id}>
                    <td>INV-{f.id}</td>
                    <td>Student #{f.student_id}</td>
                    <td>{f.title}</td>
                    <td style={{ fontWeight: '600' }}>${f.amount}</td>
                    <td>{f.due_date}</td>
                    <td><span className={`badge ${f.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{f.status}</span></td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }} 
                        onClick={() => handleDeleteFee(f.id)}
                        title="Delete Fee Invoice"
                      >
                        <Trash2 size={14} /> Delete
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
