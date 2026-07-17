import React, { useState } from 'react';
import { 
  GraduationCap, Mail, Phone, MapPin, Twitter, 
  Github, Linkedin, Youtube, ChevronDown, ChevronUp, 
  Send, CheckCircle2 
} from 'lucide-react';
import { faqsData } from '../data';

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const footerLinks = {
    explore: [
      { label: 'Full Stack Dev', href: '#courses' },
      { label: 'Frontend & UI', href: '#courses' },
      { label: 'AI & Machine Learning', href: '#courses' },
      { label: 'Cybersecurity Lab', href: '#courses' },
      { label: 'Product Design', href: '#courses' }
    ],
    portal: [
      { label: 'Student Dashboard', href: '#dashboard-preview' },
      { label: 'Live Code Sandbox', href: '#dashboard-preview' },
      { label: 'Assignments Desk', href: '#dashboard-preview' },
      { label: 'Certificates Vault', href: '#dashboard-preview' },
      { label: 'Curriculum Catalog', href: '#courses' }
    ],
    company: [
      { label: 'About Techskull', href: '#home' },
      { label: 'Academic Blog', href: '#' },
      { label: 'Student Careers', href: '#' },
      { label: 'Hiring Partners', href: '#testimonials' },
      { label: 'Alumni Directory', href: '#testimonials' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Fulfillment Policy', href: '#' },
      { label: 'Cookie Settings', href: '#' }
    ]
  };

  return (
    <footer id="footer" className="bg-[#0F172A] text-slate-300 pt-20 pb-12 border-t border-slate-800 relative z-10 transition-colors">
      
      {/* FAQ Accordion Section built directly into the top of Footer for compact organization */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mb-20">
        <div className="text-center mb-12">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest block mb-2">Academic Advisory</span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="rounded-2xl border border-slate-800 bg-[#1e293b]/40 overflow-hidden transition-all duration-300 hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between text-white font-bold text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-brand-accent shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in slide-in-from-top-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-800 max-w-7xl mx-auto mb-16" />

      {/* Main Footer Sitemap Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
        
        {/* Brand Information (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-wider text-white">
                TECH<span className="text-brand-accent">SKULL</span>
              </span>
              <span className="block text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                Learning Platform
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Empowering the Next Generation of Tech Professionals. Our structured bootcamps, sandbox sandboxes, and senior industry mentors equip students worldwide with actual engineering craft to build elite careers.
          </p>

          {/* Social media icons list */}
          <div className="flex items-center space-x-3">
            {[
              { icon: Twitter, href: '#' },
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Youtube, href: '#' }
            ].map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  className="h-9 w-9 rounded-xl bg-[#1e293b] text-slate-400 hover:text-brand-accent hover:bg-slate-800 flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-slate-400 pt-2">
            <div className="flex items-center space-x-2.5">
              <Mail className="h-4 w-4 text-brand-accent" />
              <span>admissions@techskull.edu</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="h-4 w-4 text-brand-accent" />
              <span>+1 (800) TECH-SKULL // +234 (1) 402-1200</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <MapPin className="h-4 w-4 text-brand-accent" />
              <span>Main Block, Tech Plaza, Lagos, Nigeria // Delaware, US</span>
            </div>
          </div>
        </div>

        {/* Link maps (5 columns) */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Popular Paths</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.explore.map((l, i) => (
                <li key={i}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Student Hub</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.portal.map((l, i) => (
                <li key={i}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.company.map((l, i) => (
                <li key={i}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter subscription form (3 columns) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Academic Newsletter</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to receive admissions warnings, technical syllabus updates, and free weekend masterclass credentials.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 relative">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary text-xs shadow-inner"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1.5 top-1.5 p-2 rounded-lg bg-brand-primary text-white hover:bg-blue-700 transition-colors"
                aria-label="Submit newsletter"
              >
                {subscribed ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300 animate-bounce" />
                ) : (
                  <Send className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-emerald-400 font-semibold animate-pulse">
                ✓ Check your mailbox for the TECHSKULL welcome packet!
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Trademark/Rights panel */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-medium gap-4">
        <p>© 2026 TECHSKULL Education Inc. All intellectual assets reserved.</p>
        
        {/* Legal links map */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footerLinks.legal.map((l, i) => (
            <a key={i} href={l.href} className="hover:text-slate-300 transition-colors">{l.label}</a>
          ))}
        </div>
      </div>

    </footer>
  );
}
