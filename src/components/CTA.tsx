import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onOpenRegister: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function CTA({ onOpenRegister, onNavigate }: CTAProps) {
  // Path to our custom generated abstract technology background image
  const ctaBgPath = '/src/assets/images/tech_cta_bg_1784312696310.jpg';

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-slate-950 text-white">
      
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBgPath}
          alt="Abstract technological vector background"
          className="w-full h-full object-cover opacity-25 mix-blend-screen scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-slate-950/85 to-[#2563eb]/20 z-10" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        
        {/* Glow circle effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-brand-accent/20 blur-[100px] pointer-events-none" />

        {/* Small icon badge */}
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-accent border border-white/10 mb-6 animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
          Start Your Tech <br className="sm:hidden" />
          Journey Today
        </h2>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
          Whether you want to build mobile apps, secure systems, analyze massive databases, or deploy cutting-edge AI models, TECHSKULL gives you the sandbox, classes, and mentorship to succeed.
        </p>

        {/* Buttons Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto rounded-xl bg-brand-primary hover:bg-blue-700 px-7 py-4 text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-brand-primary/20 flex items-center justify-center space-x-1.5"
          >
            <span>Register Free Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => onNavigate('courses')}
            className="w-full sm:w-auto rounded-xl bg-white/10 hover:bg-white/15 px-7 py-4 text-sm font-bold text-white transition-all border border-white/10 hover:border-white/20 flex items-center justify-center"
          >
            Browse Academic Catalog
          </button>
        </div>

        {/* Footnote information */}
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-8">
          No credit card required // Scholarship applications open inside student portal
        </p>

      </div>
    </section>
  );
}
