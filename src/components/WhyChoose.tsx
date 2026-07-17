import React from 'react';
import { Award, Code, Clock, Cpu, TrendingUp, Briefcase, CreditCard, MessageSquare, ShieldCheck } from 'lucide-react';
import { whyChooseData } from '../data';

const iconMap: Record<string, React.ComponentType<any>> = {
  Award,
  Code,
  Clock,
  Cpu,
  TrendingUp,
  Briefcase,
  CreditCard,
  MessageSquare
};

export default function WhyChoose() {
  return (
    <section id="why-choose" className="relative py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-3">
            Institutional Values
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Why Choose TECHSKULL?
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            We are redefining technology education from the ground up, placing student outcomes at the absolute core of our teaching models.
          </p>
        </div>

        {/* Bento Grid - Multi-span column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseData.map((item, idx) => {
            const Icon = iconMap[item.iconName] || ShieldCheck;
            
            // Assign specific bento column sizes to create a beautiful architectural rhythm
            const isLarge = idx === 0 || idx === 1 || idx === 5;
            const cardSpan = isLarge ? 'lg:col-span-2' : 'lg:col-span-1';

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl card-premium p-6 lg:p-8 ${cardSpan}`}
              >
                {/* Header row with icon & badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/15 dark:text-brand-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  {item.badge && (
                    <span className="inline-flex items-center rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 px-2.5 py-1 text-[10px] font-bold text-brand-primary dark:text-brand-accent border border-brand-primary/10 uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Grid Copy */}
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Custom Decorative Graphics inside larger bento cells for visual weight */}
                {isLarge && (
                  <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-success" />
                      <span>Verified Standard</span>
                    </span>
                    <span>TECHSKULL V3 Blueprint</span>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
