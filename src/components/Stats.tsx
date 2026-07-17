import React from 'react';
import { Users, BookOpen, Award, Smile, CheckCircle, Briefcase } from 'lucide-react';
import { statsData } from '../data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  BookOpen,
  Award,
  Smile,
  CheckCircle,
  Briefcase
};

export default function Stats() {
  return (
    <section className="relative py-16 bg-brand-secondary text-white dark:bg-[#090d16] border-y border-slate-800 transition-colors">
      
      {/* Background vector effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.08),transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {statsData.map((stat) => {
            const Icon = iconMap[stat.iconName] || Users;
            return (
              <div 
                key={stat.id}
                className="group p-5 rounded-2xl bg-white/5 dark:bg-slate-900/40 border border-white/5 dark:border-slate-800/40 hover:bg-white/10 hover:border-white/10 dark:hover:bg-slate-900/60 transition-all duration-300"
              >
                {/* Stat Icon */}
                <div className="mx-auto h-10 w-10 rounded-xl bg-white/10 dark:bg-slate-800/80 flex items-center justify-center text-brand-accent mb-4 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Number counter */}
                <span className="block font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-brand-accent transition-colors">
                  {stat.value}
                </span>

                {/* Label description */}
                <span className="block text-xs font-semibold text-slate-300 dark:text-slate-400 mt-2 tracking-wide leading-snug">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
