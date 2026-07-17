import React, { useState } from 'react';
import { UserPlus, BookOpen, FileCheck, Award, ArrowRight, ChevronDown } from 'lucide-react';

export default function LearningProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Register Profile',
      description: 'Create your free secure student account in under 30 seconds. Build your custom tech learning preferences, career goals, and experience levels.',
      icon: UserPlus,
      color: 'border-blue-200 text-brand-primary bg-blue-50/50 dark:border-blue-900/40 dark:text-brand-accent dark:bg-blue-950/20'
    },
    {
      num: '02',
      title: 'Enroll in Courses',
      description: 'Choose your desired pathway from our comprehensive tech catalog. Unlock instant, lifetime access to structured syllabus modules and coding sandboxes.',
      icon: BookOpen,
      color: 'border-cyan-200 text-cyan-600 bg-cyan-50/50 dark:border-cyan-900/40 dark:text-cyan-400 dark:bg-cyan-950/20'
    },
    {
      num: '03',
      title: 'Complete Assignments',
      description: 'Write solutions to practical labs and submit them to our automated grader. Join live peer code reviews and receive 1-on-1 expert code diagnostics.',
      icon: FileCheck,
      color: 'border-rose-200 text-rose-500 bg-rose-50/50 dark:border-rose-900/40 dark:text-rose-400 dark:bg-rose-950/20'
    },
    {
      num: '04',
      title: 'Earn Certificates',
      description: 'Pass your final project audit and generate on-chain, cryptographically verified blockchain credentials. Share your achievement to start tech recruiting interviews.',
      icon: Award,
      color: 'border-amber-200 text-amber-500 bg-amber-50/50 dark:border-amber-900/40 dark:text-amber-400 dark:bg-amber-950/20'
    }
  ];

  return (
    <section id="learning-process" className="relative py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 right-1/4 h-[300px] w-[300px] rounded-full bg-brand-primary/5 blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-3">
            Syllabus Blueprint
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            How TECHSKULL Works
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Our learning roadmap is structured to bypass theoretical fluff, focusing purely on actions that develop high-level software engineering craft and get you hired.
          </p>
        </div>

        {/* Steps flow container (Horizontal on lg:, Vertical below) */}
        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Connector dashed vector line on large screens */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-dashed border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = activeStep === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className={`group relative rounded-2xl card-premium p-6 ${
                  isHovered 
                    ? 'border-brand-primary/25 dark:border-brand-accent/30 scale-[1.03] -translate-y-1' 
                    : ''
                }`}
              >
                {/* Step badge absolute */}
                <div className="absolute top-6 right-6 font-mono text-3xl font-black text-slate-100 dark:text-slate-800 group-hover:text-brand-primary/20 dark:group-hover:text-brand-accent/20 transition-colors leading-none">
                  {step.num}
                </div>

                {/* Step Icon circle */}
                <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center mb-6 transition-all ${step.color} ${
                  isHovered ? 'scale-110 shadow-lg shadow-brand-primary/5' : ''
                }`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Header */}
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                  {step.title}
                </h3>

                {/* Body description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Connectors graphic helper indicators on mobile */}
                {idx < 3 && (
                  <div className="lg:hidden flex justify-center py-4 text-slate-300 dark:text-slate-800">
                    <ChevronDown className="h-6 w-6 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Learning pathway note footer bar */}
        <div className="mt-16 bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              ✓
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-300">
              Average timeline: Students reach interview-ready competency within 16-24 weeks of active study.
            </p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('courses');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-brand-primary hover:text-blue-700 dark:text-brand-accent dark:hover:text-cyan-400 transition-colors flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Explore Syllabus Paths</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
