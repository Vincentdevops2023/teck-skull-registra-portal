import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

export default function Navbar({ onOpenLogin, onOpenRegister, onNavigate, currentSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Scroll listener to add shadow/background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Dark Mode based on localStorage/prefers-color-scheme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Courses', id: 'courses' },
    { label: 'Programs', id: 'why-choose' },
    { label: 'Assignments', id: 'dashboard-preview' },
    { label: 'Student Portal', id: 'dashboard-preview' },
    { label: 'About', id: 'learning-process' },
    { label: 'Contact', id: 'footer' }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glassmorphism shadow-md border-b border-slate-200/50 dark:border-slate-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex cursor-pointer items-center space-x-2.5 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20 transition-all group-hover:scale-105 group-hover:rotate-6">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-wider text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">
                TECH<span className="text-brand-accent">SKULL</span>
              </span>
              <span className="block text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                Learning Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isPortal = item.label === 'Student Portal';
              return (
                <button
                  key={`${item.id}-${index}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isPortal 
                      ? 'text-brand-primary dark:text-brand-accent font-semibold hover:bg-brand-primary/5'
                      : currentSection === item.id
                      ? 'text-brand-primary dark:text-brand-accent bg-brand-primary/5'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-xl p-2.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle visual theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Login */}
            <button
              onClick={onOpenLogin}
              className="text-sm font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white px-3.5 py-2 transition-colors"
            >
              Login
            </button>

            {/* Register */}
            <button
              onClick={onOpenRegister}
              className="rounded-xl bg-brand-primary px-4.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-primary/10 hover:bg-blue-700 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Register Free
            </button>
          </div>

          {/* Mobile Menu Actions & Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0f172a] shadow-xl border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-5 duration-200">
          <div className="space-y-1.5 px-4 py-4">
            {navItems.map((item, index) => (
              <button
                key={`${item.id}-mob-${index}`}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentSection === item.id
                    ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-accent'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full text-center py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full text-center py-3 rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-blue-700 transition-all"
              >
                Register Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
