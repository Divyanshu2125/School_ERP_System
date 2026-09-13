import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { 
  Plus, 
  Trash2, 
  X, 
  Key, 
  User, 
  Calendar, 
  Award, 
  DollarSign, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  
  // Profile Detail Modal State
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [profileData, setProfileData] = useState({
    attendance: [],
    grades: [],
    fees: [],
    timetable: []
  });
  const [loadingProfile, setLoadingProfile] = useState(false);

  const initialForm = {
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'Male',
    blood_group: 'O+',
    nationality: 'Indian',
    religion: 'Hindu',
    category: 'General',
    id_number: '',

    academic_year: '2026-2027',
    class_name: 'Grade 10',
    section: 'A',
    roll_number: '',
    previous_school: '',
    previous_class: '',
    date_of_admission: new Date().toISOString().split('T')[0],
    admission_type: 'New',

    father_name: '',
    father_phone: '',
    father_email: '',
    mother_name: '',
    mother_phone: '',
    mother_email: '',
    guardian_name: '',
    guardian_relationship: '',
    guardian_phone: '',
    occupation: '',

    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',

    emergency_name: '',
    emergency_relationship: 'Father',
    emergency_phone: '',

    has_birth_certificate: 'Yes',
    has_previous_school_cert: 'No',
    has_transfer_cert: 'No',
    other_documents: ''
  };

  const [form, setForm] = useState(initialForm);

  const loadStudents = () => {
    API.get('/students/').then(res => setStudents(res.data)).catch(console.error);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Open Full Profile Modal
  const openStudentProfile = async (st) => {
    setSelectedStudent(st);
    setLoadingProfile(true);

    try {
      const [attRes, grdRes, feeRes] = await Promise.all([
        API.get('/erp/attendance'),
        API.get('/erp/grades'),
        API.get('/erp/fees')
      ]);

      const stAttendance = attRes.data.filter(a => a.student_id === st.id);
      const stGrades = grdRes.data.filter(g => g.student_id === st.id);
      const stFees = feeRes.data.filter(f => f.student_id === st.id);

      setProfileData({
        attendance: stAttendance,
        grades: stGrades,
        fees: stFees
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    API.post('/students/', form).then((res) => {
      const newSt = res.data;
      const dobPass = form.date_of_birth.replace(/-/g, '').replace(/\//g, '');
      setCreatedCredentials({
        admission_number: newSt.admission_number,
        password: dobPass,
        name: `${newSt.first_name} ${newSt.last_name}`
      });
      setShowModal(false);
      setForm(initialForm);
      loadStudents();
    }).catch(err => alert(err.response?.data?.detail || 'Failed to register student'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this student record and account?')) {
      API.delete(`/students/${id}`).then(loadStudents).catch(console.error);
    }
  };

  return (
    <div style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', minHeight: '100vh' }}>
      <Navbar title="Student Registration & Profile Directory (Admin)" />

      <main style={{ padding: '24px' }}>
        {/* Credentials Created Notification Banner */}
        {createdCredentials && (
          <div className="glass" style={{
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Key size={28} color="var(--accent-emerald)" />
              <div>
                <h4 style={{ color: 'var(--accent-emerald)', fontSize: '1.1rem', fontWeight: '700' }}>
                  Student Credentials Generated Successfully!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Student: <strong>{createdCredentials.name}</strong> | Login ID (Admission No): <strong style={{ color: 'var(--accent-blue)' }}>{createdCredentials.admission_number}</strong> | Password (DOB): <strong style={{ color: 'var(--accent-amber)' }}>{createdCredentials.password}</strong>
                </p>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => setCreatedCredentials(null)}>
              Dismiss
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Enrolled Students Directory ({students.length})</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              💡 Click on any student's <strong style={{ color: 'var(--accent-blue)' }}>Admission Number</strong> to view their full profile, results, & attendance performance!
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> New Student Registration Form
          </button>
        </div>

        <div className="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Admission No (Click to Open Profile)</th>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Class & Section</th>
                <th>DOB</th>
                <th>Father's Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                    No students registered yet. Click 'New Student Registration Form' above.
                  </td>
                </tr>
              ) : (
                students.map((st) => (
                  <tr key={st.id}>
                    <td>
                      <button 
                        onClick={() => openStudentProfile(st)}
                        className="badge badge-info"
                        style={{ 
                          cursor: 'pointer', 
                          border: '1px solid var(--accent-blue)', 
                          fontSize: '0.85rem', 
                          padding: '6px 12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        title="Click to view full student profile & academic performance"
                      >
                        <User size={14} /> {st.admission_number}
                      </button>
                    </td>
                    <td><span className="badge badge-warning">{st.student_id_code}</span></td>
                    <td style={{ fontWeight: '600' }}>{st.first_name} {st.middle_name ? st.middle_name + ' ' : ''}{st.last_name}</td>
                    <td>{st.class_name} - {st.section}</td>
                    <td>{st.date_of_birth}</td>
                    <td>{st.father_name} ({st.father_phone || 'N/A'})</td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '6px 10px' }} onClick={() => handleDelete(st.id)}>
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

      {/* FULL STUDENT PROFILE & ACADEMIC PERFORMANCE MODAL */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content glass" style={{ maxWidth: '900px', maxHeight: '92vh' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontWeight: '800'
                }}>
                  {selectedStudent.first_name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                    {selectedStudent.first_name} {selectedStudent.middle_name ? selectedStudent.middle_name + ' ' : ''}{selectedStudent.last_name}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Admission ID: <span className="badge badge-info">{selectedStudent.admission_number}</span> | Class: <strong>{selectedStudent.class_name} - {selectedStudent.section}</strong>
                  </p>
                </div>
              </div>

              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setSelectedStudent(null)}>
                <X size={24} />
              </button>
            </div>

            {loadingProfile ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading student records...</div>
            ) : (
              <div>
                {/* 1. KPI Stats Summary Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Attendance Rate</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-blue)', marginTop: '4px' }}>
                      {profileData.attendance.length > 0 
                        ? `${Math.round((profileData.attendance.filter(a => a.status === 'Present').length / profileData.attendance.length) * 100)}%`
                        : '100% (No Records)'}
                    </h3>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Academic Result Score</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-emerald)', marginTop: '4px' }}>
                      {profileData.grades.length > 0
                        ? `${Math.round(profileData.grades.reduce((acc, g) => acc + g.marks_obtained, 0) / profileData.grades.length)} / 100`
                        : 'N/A'}
                    </h3>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fee Status</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-amber)', marginTop: '4px' }}>
                      {profileData.fees.some(f => f.status === 'Pending') ? 'Dues Pending' : 'Clear / Paid'}
                    </h3>
                  </div>
                </div>

                {/* 2. Personal & Parent Profile Tab */}
                <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} /> Student & Parent Details
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '0.88rem' }}>
                    <div><span style={{ color: 'var(--text-muted)' }}>Date of Birth:</span> <br /><strong>{selectedStudent.date_of_birth}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Gender / Blood:</span> <br /><strong>{selectedStudent.gender} ({selectedStudent.blood_group || 'N/A'})</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Category / Aadhaar:</span> <br /><strong>{selectedStudent.category || 'General'} ({selectedStudent.id_number || 'N/A'})</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Father's Name:</span> <br /><strong>{selectedStudent.father_name} ({selectedStudent.father_phone || 'N/A'})</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Mother's Name:</span> <br /><strong>{selectedStudent.mother_name} ({selectedStudent.mother_phone || 'N/A'})</strong></div>
                    <div><span style={{ color: 'var(--text-muted)' }}>Emergency Contact:</span> <br /><strong>{selectedStudent.emergency_name} ({selectedStudent.emergency_phone})</strong></div>
                    <div style={{ gridColumn: 'span 3' }}><span style={{ color: 'var(--text-muted)' }}>Residential Address:</span> <br /><strong>{selectedStudent.address_line1}, {selectedStudent.city}, {selectedStudent.state} - {selectedStudent.pincode}</strong></div>
                  </div>
                </div>

                {/* 3. Academic Results & Exam Report Cards */}
                <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={18} /> Exam Results & Performance Marks
                  </h4>
                  {profileData.grades.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No exam marks recorded yet for this student.</p>
                  ) : (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Exam Name</th>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                            <th>Max Marks</th>
                            <th>Result Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profileData.grades.map(g => (
                            <tr key={g.id}>
                              <td style={{ fontWeight: '600' }}>{g.exam_name}</td>
                              <td>{g.subject}</td>
                              <td>{g.marks_obtained}</td>
                              <td>{g.max_marks}</td>
                              <td>
                                <span className={`badge ${g.marks_obtained >= 50 ? 'badge-success' : 'badge-danger'}`}>
                                  {g.marks_obtained >= 50 ? 'PASS' : 'FAIL'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 4. Attendance Performance Log */}
                <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-purple)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={18} /> Recent Attendance Performance
                  </h4>
                  {profileData.attendance.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No attendance records logged for this student.</p>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {profileData.attendance.map(a => (
                        <div key={a.id} style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.82rem'
                        }}>
                          <span>{a.date}: </span>
                          <span className={`badge ${a.status === 'Present' ? 'badge-success' : a.status === 'Absent' ? 'badge-danger' : 'badge-warning'}`}>
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Fee Payments & Invoices */}
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={18} /> Fee Invoices & Payment Ledger
                  </h4>
                  {profileData.fees.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No fee invoices issued for this student.</p>
                  ) : (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Invoice #</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profileData.fees.map(f => (
                            <tr key={f.id}>
                              <td>INV-{f.id}</td>
                              <td>{f.title}</td>
                              <td style={{ fontWeight: '600' }}>${f.amount}</td>
                              <td>{f.due_date}</td>
                              <td><span className={`badge ${f.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{f.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Multi-Section Registration Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass" style={{ maxWidth: '850px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-blue)' }}>
                  Official Student Registration Form
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
                  ⚡ Login account will be automatically generated with Admission ID as Username and DOB as Password!
                </p>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              {/* SECTION 1: Student Information */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-blue)', fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  1. Student Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>First Name *</label>
                    <input className="form-control" required value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Middle Name</label>
                    <input className="form-control" value={form.middle_name} onChange={e => setForm({...form, middle_name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input className="form-control" required value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Date of Birth (Password) *</label>
                    <input type="date" className="form-control" required value={form.date_of_birth} onChange={e => setForm({...form, date_of_birth: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Gender *</label>
                    <select className="form-control" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <input className="form-control" value={form.blood_group} onChange={e => setForm({...form, blood_group: e.target.value})} placeholder="e.g. O+" />
                  </div>
                  <div className="form-group">
                    <label>Nationality</label>
                    <input className="form-control" value={form.nationality} onChange={e => setForm({...form, nationality: e.target.value})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Religion</label>
                    <input className="form-control" value={form.religion} onChange={e => setForm({...form, religion: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input className="form-control" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="General / OBC / SC / ST" />
                  </div>
                  <div className="form-group">
                    <label>Aadhaar / ID Number</label>
                    <input className="form-control" value={form.id_number} onChange={e => setForm({...form, id_number: e.target.value})} placeholder="12-digit Aadhaar" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Academic Information */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-purple)', fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  2. Academic Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Academic Year *</label>
                    <input className="form-control" required value={form.academic_year} onChange={e => setForm({...form, academic_year: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Class *</label>
                    <input className="form-control" required value={form.class_name} onChange={e => setForm({...form, class_name: e.target.value})} placeholder="e.g. Grade 10" />
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <input className="form-control" value={form.section} onChange={e => setForm({...form, section: e.target.value})} placeholder="Section A" />
                  </div>
                  <div className="form-group">
                    <label>Admission Type</label>
                    <select className="form-control" value={form.admission_type} onChange={e => setForm({...form, admission_type: e.target.value})}>
                      <option value="New">New Admission</option>
                      <option value="Transfer">Transfer</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Previous School Name</label>
                    <input className="form-control" value={form.previous_school} onChange={e => setForm({...form, previous_school: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Previous Class</label>
                    <input className="form-control" value={form.previous_class} onChange={e => setForm({...form, previous_class: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Date of Admission</label>
                    <input type="date" className="form-control" value={form.date_of_admission} onChange={e => setForm({...form, date_of_admission: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Parent / Guardian Information */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-emerald)', fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  3. Parent / Guardian Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Father's Name *</label>
                    <input className="form-control" required value={form.father_name} onChange={e => setForm({...form, father_name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Father's Phone</label>
                    <input className="form-control" value={form.father_phone} onChange={e => setForm({...form, father_phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Father's Email</label>
                    <input className="form-control" type="email" value={form.father_email} onChange={e => setForm({...form, father_email: e.target.value})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Mother's Name *</label>
                    <input className="form-control" required value={form.mother_name} onChange={e => setForm({...form, mother_name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Mother's Phone</label>
                    <input className="form-control" value={form.mother_phone} onChange={e => setForm({...form, mother_phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Mother's Email</label>
                    <input className="form-control" type="email" value={form.mother_email} onChange={e => setForm({...form, mother_email: e.target.value})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Guardian Name (if applicable)</label>
                    <input className="form-control" value={form.guardian_name} onChange={e => setForm({...form, guardian_name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Guardian Relationship</label>
                    <input className="form-control" value={form.guardian_relationship} onChange={e => setForm({...form, guardian_relationship: e.target.value})} placeholder="e.g. Uncle" />
                  </div>
                  <div className="form-group">
                    <label>Parent Occupation</label>
                    <input className="form-control" value={form.occupation} onChange={e => setForm({...form, occupation: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Address */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-amber)', fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  4. Address Details
                </h4>
                <div className="form-group">
                  <label>Address Line 1 *</label>
                  <input className="form-control" required value={form.address_line1} onChange={e => setForm({...form, address_line1: e.target.value})} placeholder="House / Flat No., Street" />
                </div>
                <div className="form-group">
                  <label>Address Line 2</label>
                  <input className="form-control" value={form.address_line2} onChange={e => setForm({...form, address_line2: e.target.value})} placeholder="Locality / Landmark" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>City *</label>
                    <input className="form-control" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input className="form-control" required value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input className="form-control" required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input className="form-control" value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* SECTION 5: Emergency Contact */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-rose)', fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  5. Emergency Contact
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Emergency Contact Name *</label>
                    <input className="form-control" required value={form.emergency_name} onChange={e => setForm({...form, emergency_name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Relationship *</label>
                    <input className="form-control" required value={form.emergency_relationship} onChange={e => setForm({...form, emergency_relationship: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input className="form-control" required value={form.emergency_phone} onChange={e => setForm({...form, emergency_phone: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* SECTION 6: Documents */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: '#06b6d4', fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  6. Documents Checklist
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="form-group">
                    <label>Birth Certificate</label>
                    <select className="form-control" value={form.has_birth_certificate} onChange={e => setForm({...form, has_birth_certificate: e.target.value})}>
                      <option value="Yes">Attached (Yes)</option>
                      <option value="No">Not Attached (No)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Previous School Cert</label>
                    <select className="form-control" value={form.has_previous_school_cert} onChange={e => setForm({...form, has_previous_school_cert: e.target.value})}>
                      <option value="Yes">Attached (Yes)</option>
                      <option value="No">Not Attached (No)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Transfer Certificate (TC)</label>
                    <select className="form-control" value={form.has_transfer_cert} onChange={e => setForm({...form, has_transfer_cert: e.target.value})}>
                      <option value="Yes">Attached (Yes)</option>
                      <option value="No">Not Attached (No)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                  Submit Student Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
