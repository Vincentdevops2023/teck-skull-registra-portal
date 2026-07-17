import React, { useState } from 'react';
import { 
  BookOpen, FileCheck, Award, Bell, Calendar, 
  TrendingUp, Play, CheckCircle2, ChevronRight, 
  Clock, AlertCircle, FileCode, Check, Send, Sparkles
} from 'lucide-react';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'live-classes'>('overview');
  const [selectedChartMetric, setSelectedChartMetric] = useState<'grades' | 'hours'>('grades');
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Assignment submissions interactive states
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submittedIds, setSubmittedIds] = useState<Record<string, 'pending' | 'graded'>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [gradedScores, setGradedScores] = useState<Record<string, number>>({});

  const dashboardStats = [
    { label: 'Total Courses', value: '4 Enrolled', icon: BookOpen, color: 'text-brand-primary bg-blue-50 dark:bg-blue-950/40 dark:text-brand-accent' },
    { label: 'Assignments Due', value: '2 Remaining', icon: FileCheck, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400' },
    { label: 'Completed Courses', value: '1 Completed', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400' },
    { label: 'Certificates Earned', value: '1 Verified', icon: Award, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400' }
  ];

  const recentActivities = [
    { text: 'Earned HTML/CSS Certificate', time: '10 mins ago', type: 'cert' },
    { text: 'Joined Live React Bootcamp', time: '2 hours ago', type: 'class' },
    { text: 'Submitted Git Lab 02 for grading', time: 'Yesterday', type: 'assignment' },
    { text: 'Unlocked Advanced Python Module', time: '3 days ago', type: 'unlock' }
  ];

  const assignments = [
    { id: 'asgn-1', title: 'React Hooks State Management Lab', course: 'Full Stack Dev', deadline: 'Today, 11:59 PM', points: '100 pts', difficulty: 'Medium' },
    { id: 'asgn-2', title: 'Python File Parser and Regex Auditor', course: 'Python Basics', deadline: 'In 3 days', points: '80 pts', difficulty: 'Easy' },
    { id: 'asgn-3', title: 'Secure Cryptographic Token System', course: 'Cybersecurity', deadline: 'Next week', points: '150 pts', difficulty: 'Hard' }
  ];

  const liveClasses = [
    { id: 'live-1', title: 'Building Dynamic Custom APIs in Node.js', instructor: 'Chinedu Okafor', time: 'Today at 3:00 PM (GMT+1)', duration: '90 mins', isLive: true },
    { id: 'live-2', title: 'Mock Coding Technical Review session', instructor: 'Amina Diop', time: 'Tomorrow at 11:00 AM (GMT+1)', duration: '60 mins', isLive: false },
    { id: 'live-3', title: 'Figma Layout Systems and Responsive Grids', instructor: 'Nneka Anozie', time: 'July 20, 4:00 PM (GMT+1)', duration: '120 mins', isLive: false }
  ];

  const gradesChartData = {
    grades: {
      points: [
        { label: 'Wk 1', value: 82, height: 82 },
        { label: 'Wk 2', value: 88, height: 88 },
        { label: 'Wk 3', value: 85, height: 85 },
        { label: 'Wk 4', value: 94, height: 94 },
        { label: 'Wk 5', value: 92, height: 92 },
        { label: 'Wk 6', value: 97, height: 97 }
      ],
      average: '91.3% Grade Average',
      trend: '+4.2% higher than class mean'
    },
    hours: {
      points: [
        { label: 'Mon', value: 3.5, height: 35 },
        { label: 'Tue', value: 5.0, height: 50 },
        { label: 'Wed', value: 4.2, height: 42 },
        { label: 'Thu', value: 6.8, height: 68 },
        { label: 'Fri', value: 2.5, height: 25 },
        { label: 'Sat', value: 8.0, height: 80 }
      ],
      average: '30 Hrs Study time this week',
      trend: 'Daily peak: Saturday (8.0 hrs)'
    }
  };

  const selectedChart = gradesChartData[selectedChartMetric];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleSimulatedSubmit = (id: string, title: string) => {
    setSubmittingId(id);
    setUploadedFiles(prev => ({ ...prev, [id]: 'index.tsx' }));
    
    // Simulate compilation and unit testing grading run
    setTimeout(() => {
      setSubmittedIds(prev => ({ ...prev, [id]: 'pending' }));
      setSubmittingId(null);
      triggerToast(`Successfully compiled & submitted "${title}"! Code runner is reviewing...`);
      
      // Secondary timer for live grading review (AI audit)
      setTimeout(() => {
        const score = Math.floor(Math.random() * 16) + 85; // Grade between 85 and 100
        setGradedScores(prev => ({ ...prev, [id]: score }));
        setSubmittedIds(prev => ({ ...prev, [id]: 'graded' }));
        triggerToast(`Assignment graded! You scored ${score}% on "${title}".`);
      }, 2500);

    }, 1500);
  };

  return (
    <section id="dashboard-preview" className="relative py-20 lg:py-28 bg-white dark:bg-[#0f172a] transition-colors overflow-hidden">
      
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-0 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-3">
            Interactive Portal Preview
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            A Workspace Built For Real Developers
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Preview the custom TECHSKULL Student Portal. Toggle the analytics tabs, test-run the automated code assignments grading engine, and experience the learning interface first-hand.
          </p>
        </div>

        {/* Global Live Toast Notification */}
        {showSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-800 dark:border-slate-100 flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold">TECHSKULL Sandbox</p>
              <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">{toastMessage}</p>
            </div>
          </div>
        )}

        {/* Mini Portal Widget Interface Frame */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#090D16] overflow-hidden shadow-2xl relative">
          
          {/* Top Decorative Browser/Window Menu */}
          <div className="bg-slate-100/80 dark:bg-[#0f172a] px-6 py-4 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              {/* Window Controls dot */}
              <div className="flex space-x-1.5">
                <span className="h-3.5 w-3.5 rounded-full bg-rose-400 inline-block" />
                <span className="h-3.5 w-3.5 rounded-full bg-amber-400 inline-block" />
                <span className="h-3.5 w-3.5 rounded-full bg-emerald-400 inline-block" />
              </div>
              <span className="hidden sm:inline-block text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 pl-4 border-l border-slate-200 dark:border-slate-800">
                PORTAL // student-chinedu-okafor-10492
              </span>
            </div>

            {/* Simulated Session Pill */}
            <div className="flex items-center space-x-4">
              {/* Notification icon */}
              <button 
                onClick={() => setShowNotificationBadge(false)}
                className="relative p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                {showNotificationBadge && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-100 dark:ring-[#0f172a]" />
                )}
              </button>

              <div className="flex items-center space-x-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">SANDBOX SIMULATOR</span>
              </div>
            </div>
          </div>

          {/* Subheader portal layout */}
          <div className="p-6 md:p-8 grid lg:grid-cols-12 gap-8">
            
            {/* Left Side Content - Core Modules (8-columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Hello, Student Chinedu! 👋
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Welcome back to your workstation. You have 2 submissions due before the weekend.
                  </p>
                </div>

                {/* Simulated Portal tabs */}
                <div className="flex bg-slate-50 dark:bg-[#090D16] p-1 rounded-xl border border-slate-100 dark:border-slate-800">
                  {(['overview', 'assignments', 'live-classes'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                        activeTab === tab
                          ? 'bg-white dark:bg-[#0f172a] text-brand-primary dark:text-brand-accent shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                      }`}
                    >
                      {tab.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <>
                  {/* Performance stats mini-cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {dashboardStats.map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="card-premium p-4 rounded-2xl flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                          </div>
                          <span className="text-base font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Custom Interactive SVG Analytics Chart */}
                  <div className="card-premium p-5 rounded-2xl mt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                          ANALYTICS ENGINE
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                          {selectedChart.average}
                        </h4>
                      </div>

                      {/* Toggle controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedChartMetric('grades')}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                            selectedChartMetric === 'grades'
                              ? 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-brand-primary dark:text-brand-accent'
                              : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          Grades (%)
                        </button>
                        <button
                          onClick={() => setSelectedChartMetric('hours')}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                            selectedChartMetric === 'hours'
                              ? 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-brand-primary dark:text-brand-accent'
                              : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          Study Hours
                        </button>
                      </div>
                    </div>

                    {/* Chart visual structure (SVG Columns) */}
                    <div className="flex flex-col space-y-4">
                      {/* Grid columns */}
                      <div className="grid grid-cols-6 items-end gap-3 h-36 px-4 border-b border-slate-100 dark:border-slate-800">
                        {selectedChart.points.map((pt, i) => (
                          <div key={i} className="flex flex-col items-center group h-full justify-end relative">
                            {/* Hover Tooltip tooltip */}
                            <div className="absolute bottom-full mb-1 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                              {pt.value}{selectedChartMetric === 'grades' ? '%' : 'h'}
                            </div>
                            
                            {/* Bar Pill */}
                            <div 
                              className="w-full rounded-t-lg bg-gradient-to-t from-brand-primary to-brand-accent dark:from-brand-primary dark:to-cyan-400 group-hover:opacity-80 transition-all duration-500" 
                              style={{ height: `${pt.height}%` }}
                            />
                            
                            {/* Label */}
                            <span className="text-[9px] font-bold text-slate-400 mt-2.5 block leading-none">{pt.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Legend footnote */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedChart.trend}</span>
                        </div>
                        <span>Updates in real-time</span>
                      </div>
                    </div>

                  </div>
                </>
              )}

              {/* ASSIGNMENTS TAB */}
              {activeTab === 'assignments' && (
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Active Curriculum Assignments</h4>
                    <span className="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md">Automated Unit Tests</span>
                  </div>

                  <div className="space-y-3">
                    {assignments.map((asgn) => {
                      const isSubmitting = submittingId === asgn.id;
                      const submissionStatus = submittedIds[asgn.id];
                      const finalScore = gradedScores[asgn.id];

                      return (
                        <div 
                          key={asgn.id} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-[#F8FAFC]/50 dark:bg-[#090D16]/30 hover:bg-slate-50/80 dark:hover:bg-[#090D16]/60 transition-all"
                        >
                          <div className="space-y-1 mb-3 sm:mb-0">
                            <div className="flex items-center space-x-2">
                              <span className="inline-block text-[9px] font-extrabold uppercase bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded">
                                {asgn.course}
                              </span>
                              <span className="text-xs text-slate-400">{asgn.points}</span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">{asgn.title}</h5>
                            <div className="flex items-center space-x-1 text-[10px] text-slate-500">
                              <Clock className="h-3 w-3" />
                              <span>Due: {asgn.deadline}</span>
                            </div>
                          </div>

                          {/* Submit Actions */}
                          <div className="flex items-center space-x-2 shrink-0">
                            {isSubmitting ? (
                              <button disabled className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 text-xs font-semibold flex items-center space-x-1.5 animate-pulse">
                                <span className="h-3 w-3 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
                                <span>Compiling...</span>
                              </button>
                            ) : submissionStatus === 'pending' ? (
                              <button disabled className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 text-xs font-semibold flex items-center space-x-1.5">
                                <FileCode className="h-3.5 w-3.5 animate-bounce" />
                                <span>Grading Code...</span>
                              </button>
                            ) : submissionStatus === 'graded' ? (
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                                  finalScore && finalScore >= 90 
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
                                    : 'bg-blue-50 text-brand-primary dark:bg-blue-950/30 dark:text-brand-accent'
                                }`}>
                                  Score: {finalScore}%
                                </span>
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                  <Check className="h-4 w-4" />
                                </span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSimulatedSubmit(asgn.id, asgn.title)}
                                className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-blue-700 text-white text-xs font-bold transition-all hover:scale-[1.03] flex items-center space-x-1 shadow-sm"
                              >
                                <Send className="h-3 w-3" />
                                <span>Submit Code</span>
                              </button>
                            )}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LIVE CLASSES TAB */}
              {activeTab === 'live-classes' && (
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Live Interactive Broadcasts</h4>
                    <span className="inline-block h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                  </div>

                  <div className="space-y-3">
                    {liveClasses.map((item) => (
                      <div 
                        key={item.id} 
                        className={`p-4 rounded-xl border ${
                          item.isLive 
                            ? 'border-brand-primary/30 bg-blue-50/30 dark:border-brand-accent/20 dark:bg-slate-800/10' 
                            : 'border-slate-100 dark:border-slate-800/50 bg-[#F8FAFC]/50 dark:bg-[#090D16]/30'
                        } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                      >
                        <div>
                          <div className="flex items-center space-x-2 mb-1.5">
                            {item.isLive ? (
                              <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-bold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 animate-pulse">
                                ● LIVE NOW
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">UPCOMING</span>
                            )}
                            <span className="text-[10px] text-slate-400">Duration: {item.duration}</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h5>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Instructor: {item.instructor}</span>
                          <span className="text-[10px] text-brand-primary dark:text-brand-accent block mt-1 font-semibold">{item.time}</span>
                        </div>

                        <button 
                          onClick={() => triggerToast(item.isLive ? `Launching live streaming media for "${item.title}"...` : `Registered! We'll alert you 10 mins before class.`)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                            item.isLive 
                              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-500/10' 
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                          }`}
                        >
                          {item.isLive ? 'Join Stream' : 'Secure Seat'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Side Column - Live Activities and Calendar Widgets (4-columns) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Calendar Widget */}
              <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="h-4.5 w-4.5 text-brand-primary dark:text-brand-accent" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Academic Calendar</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">July 2026</span>
                </div>

                {/* Calendar Days Matrix */}
                <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] mb-3 font-semibold text-slate-400 dark:text-slate-500">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold">
                  {/* Empty offsets for day alignment */}
                  <span className="text-slate-300 dark:text-slate-800">29</span>
                  <span className="text-slate-300 dark:text-slate-800">30</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">1</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">2</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">3</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">4</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">5</span>

                  <span className="text-slate-800 dark:text-slate-400 py-1">6</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">7</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">8</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">9</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">10</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">11</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">12</span>

                  <span className="text-slate-800 dark:text-slate-400 py-1">13</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">14</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">15</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">16</span>
                  {/* Today highlight */}
                  <span className="bg-brand-primary text-white rounded-lg py-1 shadow-sm ring-2 ring-brand-primary/20">17</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">18</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">19</span>

                  <span className="text-slate-800 dark:text-slate-400 py-1 relative flex items-center justify-center">
                    20
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-cyan-400" />
                  </span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">21</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">22</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">23</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1 relative flex items-center justify-center">
                    24
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-rose-500" />
                  </span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">25</span>
                  <span className="text-slate-800 dark:text-slate-400 py-1">26</span>
                </div>

                {/* Calendar Events Legend */}
                <div className="mt-4 space-y-2 border-t border-slate-50 dark:border-slate-800/60 pt-3">
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                    <span>Today: 1 Live bootcamp lesson</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                    <span>July 20: Design layout test</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0" />
                    <span>July 24: Front-end milestone due</span>
                  </div>
                </div>

              </div>

              {/* Recent Activities Log */}
              <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Recent Activities</span>
                  <span className="text-[10px] font-semibold text-brand-primary dark:text-brand-accent">Live Log</span>
                </div>

                <div className="space-y-4">
                  {recentActivities.map((act, i) => (
                    <div key={i} className="flex items-start space-x-3 text-xs">
                      {/* Left icon wrapper */}
                      <div className="mt-0.5 h-4 w-4 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                      </div>
                      
                      <div className="flex-grow">
                        <p className="font-bold text-slate-800 dark:text-slate-300 leading-none">{act.text}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block font-semibold">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
