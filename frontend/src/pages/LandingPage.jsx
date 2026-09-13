import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import heroBanner from '../assets/hero_banner.jpg';

const LandingPage = () => {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header / Navbar */}
      <header style={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '10px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            borderRadius: '12px'
          }}>
            <GraduationCap size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Central High School</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Excellence in Education Since 1995</p>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>About</a>
          <a href="#academics" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Academics</a>
          <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>ERP Portal</a>
          <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Contact</a>
          <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', borderRadius: '20px' }}>
            ERP Portal Login <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 40%, rgba(15, 23, 42, 0.4)), url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px', padding: '40px 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#60a5fa',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            <Sparkles size={16} /> Admissions Open for Academic Session 2026-27
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '20px' }}>
            Empowering Minds, <br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Shaping Tomorrow's Leaders</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
            Welcome to Central High School. We foster a culture of academic rigor, holistic development, and digital innovation with our state-of-the-art ERP Portal.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Access ERP Dashboard <ChevronRight size={18} />
            </Link>
            <a href="#about" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Explore School
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderY: '1px solid var(--border-color)',
        padding: '30px 5%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        textAlign: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-blue)' }}>2,500+</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Active Students</p>
        </div>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-purple)' }}>120+</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Expert Educators</p>
        </div>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>99.4%</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Board Exam Pass Rate</p>
        </div>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-amber)' }}>100%</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Digital ERP Integrated</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '80px 5%' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>Why Choose Central High School?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Providing a supportive and challenging educational environment where every student thrives academically and personally.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          <div className="glass" style={{ padding: '32px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-blue)',
              marginBottom: '20px'
            }}>
              <BookOpen size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Modern Curriculum</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              STEM-focused learning combined with arts, sports, and leadership programs designed for 21st-century success.
            </p>
          </div>

          <div className="glass" style={{ padding: '32px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)',
              marginBottom: '20px'
            }}>
              <Users size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Dedicated Faculty</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Highly qualified teachers committed to personalized mentoring and nurturing each child's unique talents.
            </p>
          </div>

          <div className="glass" style={{ padding: '32px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-emerald)',
              marginBottom: '20px'
            }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Integrated School ERP</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Real-time attendance tracking, exam marks, fee invoice management, and timetable scheduling for parents and staff.
            </p>
          </div>
        </div>
      </section>

      {/* ERP Features Highlights */}
      <section id="features" style={{ padding: '80px 5%', background: 'rgba(30, 41, 59, 0.3)', borderY: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
          <span style={{ color: 'var(--accent-blue)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Digital Campus Experience
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px', marginBottom: '12px' }}>Comprehensive ERP Modules</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Everything administration, teachers, and students need in one place.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Student Management', desc: 'Centralized database with roll numbers, contact, and guardian records.', icon: Users },
            { title: 'Faculty Portal', desc: 'Manage teacher profiles, subject assignments, and class workloads.', icon: Award },
            { title: 'Attendance System', desc: 'Instant daily attendance logging with present/absent/late reports.', icon: Calendar },
            { title: 'Fee Management', desc: 'Automated fee invoices, payment tracking, and receipt generation.', icon: Sparkles },
            { title: 'Exams & Grading', desc: 'Record midterm & final exam scores with pass/fail evaluation.', icon: BookOpen },
            { title: 'Smart Timetable', desc: 'Weekly schedule grid setup for every class and section.', icon: Clock },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glass" style={{ padding: '24px' }}>
                <Icon size={28} color="var(--accent-blue)" style={{ marginBottom: '14px' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" style={{ padding: '60px 5% 30px 5%', background: '#090d16', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <GraduationCap size={28} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Central High School</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Nurturing leadership, innovation, and character in every student.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px' }}>Contact Information</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16} color="var(--accent-blue)" /> 123 Education Boulevard, Academic City</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16} color="var(--accent-blue)" /> +1 (555) 234-5678</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={16} color="var(--accent-blue)" /> admissions@centralhigh.edu</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Link to="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>ERP Login</Link>
              <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</a>
              <a href="#academics" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Academics</a>
              <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>ERP Modules</a>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          © 2026 Central High School. All rights reserved. Powered by School ERP System.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
