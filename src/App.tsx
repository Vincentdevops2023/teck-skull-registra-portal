import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Courses from './components/Courses';
import DashboardPreview from './components/DashboardPreview';
import LearningProcess from './components/LearningProcess';
import Testimonials from './components/Testimonials';
import WhyChoose from './components/WhyChoose';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { Course } from './types';
import { Sparkles, Terminal, CheckCircle } from 'lucide-react';

export default function App() {
  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Authentication Role
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');

  // Form submission feedback states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [adminLoginForm, setAdminLoginForm] = useState({ email: '', password: '', adminKey: '' });
  
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', track: 'web-dev', university: '' });
  const [adminRegisterForm, setAdminRegisterForm] = useState({ name: '', email: '', department: 'engineering', adminKey: '' });
  
  const [enrollForm, setEnrollForm] = useState({ email: '', coupon: '' });

  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('home');

  // Navigation Scrolling helper
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of our fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setCurrentSection(sectionId);
    }
  };

  // Scroll spy to update Navbar active indicator automatically as student reads
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'courses', 'why-choose', 'dashboard-preview', 'learning-process', 'testimonials', 'footer'];
      const scrollPosition = window.scrollY + 200; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Google OAuth Handler ---
  const handleGoogleSignIn = async () => {
    try {
      // 1. Fetch the OAuth URL from server
      const response = await fetch(`/api/auth/google/url?role=${authRole}`);
      if (!response.ok) {
        throw new Error('Failed to get auth URL');
      }
      const { url } = await response.json();

      // 2. Open the OAuth provider's URL directly in a popup
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        alert('Please allow popups for this site to authenticate with Google.');
      }
    } catch (error) {
      console.error('OAuth initiation error:', error);
      alert('Could not start Google Sign-In. Please check if the backend is connected.');
    }
  };

  // Listen for success message from OAuth popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Allow messages from the preview origin or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const role = event.data.role || authRole;
        setFormSuccessMessage(`Securely authenticated with Google as ${role}.`);
        setTimeout(() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(false);
          setFormSuccessMessage(null);
          setAuthRole('student');
        }, 2500);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [authRole]);

  // Form Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'student' && loginForm.email) {
      setFormSuccessMessage(`Welcome back! Logged in securely as ${loginForm.email}`);
      setTimeout(() => {
        setIsLoginOpen(false);
        setFormSuccessMessage(null);
        setLoginForm({ email: '', password: '' });
        setAuthRole('student');
      }, 2000);
    } else if (authRole === 'admin' && adminLoginForm.email) {
      setFormSuccessMessage(`Admin authenticated: ${adminLoginForm.email}. Access granted.`);
      setTimeout(() => {
        setIsLoginOpen(false);
        setFormSuccessMessage(null);
        setAdminLoginForm({ email: '', password: '', adminKey: '' });
        setAuthRole('student');
      }, 2000);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'student' && registerForm.email && registerForm.name) {
      setFormSuccessMessage(`Success! Welcome to TECHSKULL, ${registerForm.name}. Check your mailbox at ${registerForm.email} for your study pack.`);
      setTimeout(() => {
        setIsRegisterOpen(false);
        setFormSuccessMessage(null);
        setRegisterForm({ name: '', email: '', track: 'web-dev', university: '' });
        setAuthRole('student');
      }, 3000);
    } else if (authRole === 'admin' && adminRegisterForm.email && adminRegisterForm.name) {
      setFormSuccessMessage(`Admin account created for ${adminRegisterForm.name}. Awaiting superadmin authorization.`);
      setTimeout(() => {
        setIsRegisterOpen(false);
        setFormSuccessMessage(null);
        setAdminRegisterForm({ name: '', email: '', department: 'engineering', adminKey: '' });
        setAuthRole('student');
      }, 3000);
    }
  };

  const handleEnrollTrigger = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollOpen(true);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enrollForm.email && selectedCourse) {
      setFormSuccessMessage(`Congratulations! You have successfully enrolled in "${selectedCourse.title}". Your sandbox workspace has been initialized.`);
      setTimeout(() => {
        setIsEnrollOpen(false);
        setFormSuccessMessage(null);
        setEnrollForm({ email: '', coupon: '' });
        setSelectedCourse(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors bg-[#F8FAFC] dark:bg-[#090D16]">
      
      {/* Sticky Top Navigation */}
      <Navbar 
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onNavigate={navigateToSection}
        currentSection={currentSection}
      />

      {/* Main Content Blocks */}
      <main className="relative">
        <Hero 
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNavigate={navigateToSection}
        />
        
        <Stats />

        <Features />

        <Courses onEnroll={handleEnrollTrigger} />

        <DashboardPreview />

        <LearningProcess />

        <WhyChoose />

        <Testimonials />

        <CTA 
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNavigate={navigateToSection}
        />
      </main>

      {/* Footer & FAQ Accordeon */}
      <Footer />

      {/* ==================================== MODAL DIALOGS ==================================== */}

      {/* 1. Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => { setIsLoginOpen(false); setAuthRole('student'); }} title={authRole === 'student' ? "Student Portal Authentication" : "Admin Portal Authentication"}>
        {formSuccessMessage ? (
          <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{formSuccessMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div className="flex bg-[#1e293b]/10 dark:bg-[#090D16] p-1 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setAuthRole('student')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${authRole === 'student' ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setAuthRole('admin')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${authRole === 'admin' ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Administrator
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {authRole === 'student' ? 'Student Email' : 'Admin Email'}
              </label>
              <input
                type="email"
                required
                placeholder={authRole === 'student' ? "chinedu@university.edu" : "admin@techskull.edu"}
                value={authRole === 'student' ? loginForm.email : adminLoginForm.email}
                onChange={(e) => authRole === 'student' 
                  ? setLoginForm({ ...loginForm, email: e.target.value })
                  : setAdminLoginForm({ ...adminLoginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
              />
            </div>

            {authRole === 'admin' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Admin Security Key</label>
                <input
                  type="text"
                  required
                  placeholder="TS-ADM-XXXX"
                  value={adminLoginForm.adminKey}
                  onChange={(e) => setAdminLoginForm({ ...adminLoginForm, adminKey: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm font-mono"
                />
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Password</label>
                <a href="#" className="text-[10px] font-bold text-brand-primary dark:text-brand-accent hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authRole === 'student' ? loginForm.password : adminLoginForm.password}
                onChange={(e) => authRole === 'student'
                  ? setLoginForm({ ...loginForm, password: e.target.value })
                  : setAdminLoginForm({ ...adminLoginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input type="checkbox" id="remember" className="rounded text-brand-primary accent-brand-primary" />
              <label htmlFor="remember" className="text-xs text-slate-500 dark:text-slate-400 font-semibold cursor-pointer select-none">
                Remember my {authRole === 'student' ? 'workspace' : 'dashboard'} configuration
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-bold text-sm transition-all hover:scale-[1.01]"
            >
              Log In to Portal
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400">OR</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                New to TECHSKULL?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                  }}
                  className="font-bold text-brand-primary dark:text-brand-accent hover:underline"
                >
                  Register Free
                </button>
              </p>
            </div>
          </form>
        )}
      </Modal>

      {/* 2. Registration Modal */}
      <Modal isOpen={isRegisterOpen} onClose={() => { setIsRegisterOpen(false); setAuthRole('student'); }} title={authRole === 'student' ? "Create Student Workspace" : "Request Admin Access"}>
        {formSuccessMessage ? (
          <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{formSuccessMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div className="flex bg-[#1e293b]/10 dark:bg-[#090D16] p-1 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setAuthRole('student')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${authRole === 'student' ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setAuthRole('admin')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${authRole === 'admin' ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Administrator
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Chinedu Okafor"
                  value={authRole === 'student' ? registerForm.name : adminRegisterForm.name}
                  onChange={(e) => authRole === 'student'
                    ? setRegisterForm({ ...registerForm, name: e.target.value })
                    : setAdminRegisterForm({ ...adminRegisterForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
                />
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {authRole === 'student' ? 'Student Email' : 'Staff Email'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={authRole === 'student' ? "chinedu@university.edu" : "admin@techskull.edu"}
                  value={authRole === 'student' ? registerForm.email : adminRegisterForm.email}
                  onChange={(e) => authRole === 'student'
                    ? setRegisterForm({ ...registerForm, email: e.target.value })
                    : setAdminRegisterForm({ ...adminRegisterForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
                />
              </div>
            </div>

            {authRole === 'student' ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Primary Pathway</label>
                  <select
                    value={registerForm.track}
                    onChange={(e) => setRegisterForm({ ...registerForm, track: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
                  >
                    <option value="web-dev">Web Development & UI/UX Design</option>
                    <option value="programming">Systems & Blockchain Programming</option>
                    <option value="ai-data">AI & Machine Learning Data</option>
                    <option value="cyber-cloud">Cybersecurity & Cloud Solutions</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">College / University (Optional)</label>
                  <input
                    type="text"
                    placeholder="University of Lagos, Nigeria"
                    value={registerForm.university}
                    onChange={(e) => setRegisterForm({ ...registerForm, university: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Department</label>
                  <select
                    value={adminRegisterForm.department}
                    onChange={(e) => setAdminRegisterForm({ ...adminRegisterForm, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
                  >
                    <option value="engineering">Engineering Instructors</option>
                    <option value="admissions">Student Admissions</option>
                    <option value="curriculum">Curriculum Design</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Admin Access Token</label>
                  <input
                    type="password"
                    required
                    placeholder="Required for administrative registration"
                    value={adminRegisterForm.adminKey}
                    onChange={(e) => setAdminRegisterForm({ ...adminRegisterForm, adminKey: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm font-mono"
                  />
                </div>
              </>
            )}

            <div className="rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/10 p-3 flex items-start space-x-2.5">
              <Sparkles className="h-5 w-5 text-brand-primary dark:text-brand-accent mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                {authRole === 'student' 
                  ? "Registration unlocks free lifetime access to base modules, interactive sandbox quizzes, and the private Slack advisory community channels."
                  : "Admin registration requires verification. Your request will be manually reviewed by a Super Administrator."}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-bold text-sm transition-all hover:scale-[1.01]"
            >
              {authRole === 'student' ? 'Initialize Workspace' : 'Submit Admin Request'}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400">OR</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="font-bold text-brand-primary dark:text-brand-accent hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </form>
        )}
      </Modal>

      {/* 3. Course Enrollment Modal */}
      <Modal isOpen={isEnrollOpen} onClose={() => setIsEnrollOpen(false)} title="Initialize Course Enrollment">
        {formSuccessMessage ? (
          <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{formSuccessMessage}</p>
          </div>
        ) : selectedCourse ? (
          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            
            {/* Quick Course card summary info */}
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-4 bg-[#F8FAFC] dark:bg-slate-900/60 flex space-x-4 items-center">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="h-16 w-24 rounded-lg object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <span className="block text-[10px] font-bold text-brand-primary uppercase tracking-wider">{selectedCourse.category}</span>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white leading-snug truncate mt-0.5">{selectedCourse.title}</h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1 font-semibold">{selectedCourse.duration} // {selectedCourse.difficulty}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Student Email</label>
              <input
                type="email"
                required
                placeholder="chinedu@university.edu"
                value={enrollForm.email}
                onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Scholarship Code (Optional)</label>
              <input
                type="text"
                placeholder="SKULL-SCHOLAR-50"
                value={enrollForm.coupon}
                onChange={(e) => setEnrollForm({ ...enrollForm, coupon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-sm uppercase"
              />
            </div>

            {/* Tuition details */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-sm font-bold">
              <span className="text-slate-500 dark:text-slate-400">Standard Student Tuition:</span>
              <span className="text-lg font-black text-slate-950 dark:text-white">{selectedCourse.price}</span>
            </div>

            <div className="rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 p-3 flex items-start space-x-2.5">
              <Terminal className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                Enrolling grants instant lifetime access, full repository cloning permissions, automated lab reviews, and cryptographic proof of completion on graduation.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-bold text-sm transition-all hover:scale-[1.01]"
            >
              Confirm and Unlock Course
            </button>
          </form>
        ) : null}
      </Modal>

    </div>
  );
}
