import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Plus, Trash2, X } from 'lucide-react';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    qualification: '',
    subject_specialization: ''
  });

  const loadTeachers = () => {
    API.get('/teachers/').then(res => setTeachers(res.data)).catch(console.error);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    API.post('/teachers/', form).then(() => {
      setShowModal(false);
      setForm({ employee_id: '', first_name: '', last_name: '', email: '', phone: '', qualification: '', subject_specialization: '' });
      loadTeachers();
    }).catch(err => alert(err.response?.data?.detail || 'Failed to create teacher'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this teacher?')) {
      API.delete(`/teachers/${id}`).then(loadTeachers).catch(console.error);
    }
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Teacher Management" />

      <main style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Faculty List ({teachers.length})</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Add Teacher
          </button>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                    No teachers registered yet.
                  </td>
                </tr>
              ) : (
                teachers.map((t) => (
                  <tr key={t.id}>
                    <td><span className="badge badge-info">{t.employee_id}</span></td>
                    <td style={{ fontWeight: '600' }}>{t.first_name} {t.last_name}</td>
                    <td><span className="badge badge-success">{t.subject_specialization || 'General'}</span></td>
                    <td>{t.email}</td>
                    <td>{t.qualification || 'N/A'}</td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '6px 10px' }} onClick={() => handleDelete(t.id)}>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Add New Teacher</h3>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Employee ID *</label>
                <input className="form-control" required value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} placeholder="e.g. EMP-101" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>First Name *</label>
                  <input className="form-control" required value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input className="form-control" required value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input className="form-control" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Subject Specialization</label>
                <input className="form-control" value={form.subject_specialization} onChange={e => setForm({...form, subject_specialization: e.target.value})} placeholder="e.g. Mathematics" />
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input className="form-control" value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} placeholder="e.g. M.Sc, B.Ed" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
