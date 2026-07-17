import React, { useState } from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-white dark:bg-[#0f172a] transition-colors">
      
      {/* Decorative quotes graphic in background */}
      <div className="absolute top-10 left-12 font-serif text-[180px] text-slate-100/80 dark:text-slate-800/10 leading-none pointer-events-none select-none">
        “
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-3">
            Student Outcomes
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Hear From Our Alumni
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Real stories, real jobs, and real salary metrics. Our graduates have successfully transitioned from tech beginners into high-impact roles at top international firms.
          </p>
        </div>

        {/* Dynamic sliding testimonials container */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Slider content column (8-cols) */}
          <div className="lg:col-span-8 relative">
            <div className="relative overflow-hidden rounded-3xl card-premium p-6 sm:p-10">
              
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < testimonialsData[currentIndex].rating 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-200'
                      }`} 
                    />
                  ))}
                </div>
                <MessageSquare className="h-6 w-6 text-brand-primary/30 dark:text-brand-accent/30" />
              </div>

              {/* Quote Quote text */}
              <blockquote className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed mb-8">
                "{testimonialsData[currentIndex].quote}"
              </blockquote>

              {/* Author Row */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonialsData[currentIndex].avatar}
                    alt={testimonialsData[currentIndex].name}
                    className="h-14 w-14 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block text-base font-bold text-slate-900 dark:text-white leading-none">
                      {testimonialsData[currentIndex].name}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                      {testimonialsData[currentIndex].role}
                    </span>
                  </div>
                </div>

                {/* Specific Outcome Pill */}
                <div className="hidden sm:block text-right">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Verified Outcome</span>
                  <span className="inline-block bg-emerald-50 text-brand-success border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40 font-bold text-xs px-3 py-1 rounded-lg mt-1.5">
                    {testimonialsData[currentIndex].outcome}
                  </span>
                </div>
              </div>

            </div>

            {/* Slider controls buttons */}
            <div className="flex items-center justify-end space-x-2.5 mt-6">
              <button
                onClick={prevTestimonial}
                className="h-11 w-11 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 px-2">
                {currentIndex + 1} / {testimonialsData.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="h-11 w-11 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hiring Outcomes sidebar card (4-cols) */}
          <div className="lg:col-span-4 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden dark:bg-[#090D16] dark:border dark:border-slate-800">
            {/* Ambient circle glow inside */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-primary/20 blur-2xl pointer-events-none" />

            <h4 className="font-display text-lg font-bold mb-4">TECHSKULL Career Metrics</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Vetted remote hiring networks. We bypass traditional recruiters to match top graduates directly into high-growth software team pipelines.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs border-b border-slate-800 pb-3">
                <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold">91% Hired Within 90 Days</span>
                  <span className="text-slate-400 text-[11px]">Average placement rate for certified students.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs border-b border-slate-800 pb-3">
                <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold">65% Average Salary Jump</span>
                  <span className="text-slate-400 text-[11px]">Increment compared to prior regional placements.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <span className="block font-bold">$42k Starting Class Median</span>
                  <span className="text-slate-400 text-[11px]">Median global junior salary for remote graduates.</span>
                </div>
              </div>
            </div>

            {/* Hiring partners logos subtitle */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3.5">PROUD HIRING PARTNERS</span>
              <div className="grid grid-cols-2 gap-3 text-xs font-black tracking-wider text-slate-400 font-display">
                <span>// STRIPE</span>
                <span>// MICROSOFT</span>
                <span>// PAYSTACK</span>
                <span>// FLUTTERWAVE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
