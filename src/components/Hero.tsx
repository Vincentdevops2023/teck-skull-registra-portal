import React, { useState } from 'react';
import { 
  Sparkles, Cloud, Terminal, Cpu, Database, 
  ShieldAlert, GitPullRequest, Github, BarChart3, 
  ArrowRight, Play, CheckCircle
} from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onOpenRegister, onNavigate }: HeroProps) {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        onOpenRegister();
        setSubmitted(false);
        setEmailInput('');
      }, 1000);
    }
  };

  // We have the path to our generated image
  const heroImagePath = '/src/assets/images/african_tech_students_1784312682086.jpg';

  const floatingBadges = [
    { label: 'AI', icon: Sparkles, color: 'text-purple-500 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800/60', position: 'top-10 left-12', delay: '0s' },
    { label: 'React', icon: Cpu, color: 'text-sky-500 bg-sky-50 border-sky-200 dark:bg-sky-950/40 dark:border-sky-800/60', position: 'top-32 left-4', delay: '1s' },
    { label: 'Python', icon: Terminal, color: 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/60', position: 'bottom-20 left-10', delay: '2s' },
    { label: 'Cloud', icon: Cloud, color: 'text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800/60', position: 'top-6 right-20', delay: '1.5s' },
    { label: 'JavaScript', icon: Database, color: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/40 dark:border-yellow-800/60', position: 'top-28 right-4', delay: '0.5s' },
    { label: 'Cybersecurity', icon: ShieldAlert, color: 'text-rose-500 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800/60', position: 'bottom-40 right-10', delay: '2.5s' },
    { label: 'Git', icon: GitPullRequest, color: 'text-orange-500 bg-orange-50 border-orange-200 dark:bg-orange-950/40 dark:border-orange-800/60', position: 'bottom-12 left-1/3', delay: '3s' },
    { label: 'GitHub', icon: Github, color: 'text-slate-700 bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/60 dark:text-slate-200', position: 'top-1/2 left-20', delay: '1.8s' },
    { label: 'Analytics', icon: BarChart3, color: 'text-emerald-500 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800/60', position: 'bottom-16 right-1/3', delay: '2.2s' }
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-36 bg-[#F8FAFC] dark:bg-[#090D16]">
      
      {/* Background radial glowing gradients */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[120px] dark:bg-brand-primary/15 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-brand-accent/10 blur-[120px] dark:bg-brand-accent/15 animate-pulse-slow pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Copy Column */}
          <div className="lg:col-span-7 text-center lg:text-left relative z-10">
            {/* Launch Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-semibold text-brand-primary dark:bg-brand-primary/15 dark:text-brand-accent mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Next-Gen Student Learning Platform</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Learn Today's <span className="bg-gradient-to-r from-brand-primary via-blue-500 to-brand-accent bg-clip-text text-transparent">Tech Skills.</span> <br />
              Build Tomorrow's <span className="underline decoration-brand-accent decoration-wavy decoration-2 underline-offset-4">Career.</span>
            </h1>

            {/* Paragraph Description */}
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              TECHSKULL helps students master in-demand technology skills through practical projects, expert mentorship, and career-focused learning designed for university students and tech beginners.
            </p>

            {/* Quick Email Registration Form */}
            <form onSubmit={handleQuickRegister} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-6">
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  placeholder="Enter your student email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm shadow-sm"
                />
                {submitted && (
                  <span className="absolute right-3 top-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 animate-bounce">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="px-6 py-4 rounded-xl bg-brand-primary hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-brand-primary/15 flex items-center justify-center space-x-1.5 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Buttons Alternative */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <button
                onClick={() => onNavigate('courses')}
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all flex items-center space-x-1.5"
              >
                <span>Explore Courses</span>
              </button>
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-success animate-ping" />
                <span>Next live masterclass starting soon</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-800/40 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block font-display text-2xl font-bold text-slate-900 dark:text-white">20K+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Students Learning</span>
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-slate-900 dark:text-white">98%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Completion Score</span>
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-slate-900 dark:text-white">250+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Hiring Partners</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image/Animation Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Frame */}
            <div className="relative w-full max-w-[450px] aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#1e293b] z-10 group">
              <img
                src={heroImagePath}
                alt="African students collaborating on coding inside high-tech modern classroom"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              
              {/* Play Video Pill overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={onOpenRegister}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white hover:bg-brand-accent hover:scale-110 active:scale-95 shadow-lg shadow-brand-primary/40 transition-all group-hover:animate-pulse"
                >
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                </button>
              </div>

              {/* Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 glassmorphism rounded-xl p-3 border border-white/20 dark:border-slate-800/30 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="flex -space-x-2">
                    <img className="h-7 w-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" referrerPolicy="no-referrer" />
                    <img className="h-7 w-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Avatar" referrerPolicy="no-referrer" />
                    <img className="h-7 w-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Avatar" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-white">Active learning labs</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-brand-success/15 px-2 py-0.5 text-[10px] font-bold text-brand-success">
                  +1.4k today
                </span>
              </div>
            </div>

            {/* Glowing background behind image frame */}
            <div className="absolute inset-4 bg-brand-primary/30 blur-[40px] rounded-3xl -z-10 group-hover:bg-brand-accent/40 transition-all duration-500" />

            {/* Floating Tech Badges around the frame */}
            {floatingBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className={`absolute hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl border shadow-lg ${badge.color} ${badge.position} z-20 animate-float`}
                  style={{ animationDelay: badge.delay }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold tracking-wide font-display">{badge.label}</span>
                </div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}
