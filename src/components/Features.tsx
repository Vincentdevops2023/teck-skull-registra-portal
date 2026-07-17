import React from 'react';
import { 
  BookOpen, Terminal, LayoutDashboard, UserPlus, 
  FileCheck, Award, Briefcase, Target, Building, Users 
} from 'lucide-react';
import { featuresData } from '../data';
import { Feature } from '../types';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Terminal,
  LayoutDashboard,
  UserPlus,
  FileCheck,
  Award,
  Briefcase,
  Target,
  Building,
  Users
};

export default function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-28 bg-white dark:bg-[#0f172a] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-3">
            Academic Ecosystem
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Everything You Need to Succeed in Tech
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            From your very first line of code to a verified high-paying placement, TECHSKULL provides the ultimate, comprehensive student learning engine.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuresData.map((feat: Feature) => {
            const IconComponent = iconMap[feat.iconName] || BookOpen;
            
            // Generate icon specific color classes to break monotony
            let iconBgColor = 'bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/15 dark:text-brand-accent';
            if (feat.id.includes('certificates') || feat.id.includes('placement')) {
              iconBgColor = 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400';
            } else if (feat.id.includes('live-coding') || feat.id.includes('dashboard')) {
              iconBgColor = 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400';
            } else if (feat.id.includes('internship') || feat.id.includes('career')) {
              iconBgColor = 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400';
            }

            return (
              <div
                key={feat.id}
                id={`feat-${feat.id}`}
                className="group relative rounded-2xl card-premium p-8"
              >
                {/* Feature Icon container with hover animation */}
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Header */}
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>

                {/* Decorative glow line on card hover */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:via-brand-accent" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
