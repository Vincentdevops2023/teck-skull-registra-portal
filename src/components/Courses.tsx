import React, { useState, useMemo } from 'react';
import { Search, Star, Users, Clock, Shield, ArrowUpRight, BookOpen } from 'lucide-react';
import { coursesData } from '../data';
import { Course } from '../types';

interface CoursesProps {
  onEnroll: (course: Course) => void;
}

export default function Courses({ onEnroll }: CoursesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Subjects' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'programming', label: 'Programming Core' },
    { value: 'ai-data', label: 'AI & Data Science' },
    { value: 'cyber-cloud', label: 'Cybersecurity & Cloud' },
    { value: 'design-marketing', label: 'UI/UX & Marketing' }
  ];

  // Memoized course filtering for fast real-time performance
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section id="courses" className="relative py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-3">
              Explore Academic Catalog
            </h2>
            <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Explore Our Popular Technologies
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Pick your pathway, complete practical modules guided by senior mentors, and master industrial skills demanded by modern tech recruitment teams.
            </p>
          </div>

          {/* Real-time search filter */}
          <div className="relative w-full lg:max-w-sm">
            <input
              type="text"
              placeholder="Search courses, instructors, or skills (React, Go)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 transition-all text-sm shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap tracking-wide transition-all ${
                selectedCategory === cat.value
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-[#0f172a] dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Real-time feedback if empty */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800">
            <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No courses found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
              We couldn't find any courses matching your terms. Try adjusting your keyword search or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4.5 py-2 rounded-xl bg-brand-primary text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Courses Grid - fully responsive columns */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col rounded-2xl overflow-hidden card-premium group"
              >
                
                {/* Image Cover */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-lg bg-black/50 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {course.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center space-x-1 rounded-lg bg-amber-500 px-2 py-1 text-[10px] font-extrabold text-slate-950 shadow-md">
                    <Star className="h-3.5 w-3.5 fill-slate-950" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Card Content body */}
                <div className="flex-grow p-5 flex flex-col justify-between">
                  
                  {/* Metadata line */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3.5 w-3.5" />
                        <span>{course.difficulty}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Skills pill list */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Instructor detail, price, and actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                    
                    {/* Instructor profile */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <span className="block text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {course.instructor.name}
                        </span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {course.instructor.role}
                        </span>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                          STUDENT PRICING
                        </span>
                        <div className="flex items-baseline space-x-1 mt-0.5">
                          <span className="text-xl font-black text-slate-950 dark:text-white">{course.price}</span>
                          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">/ life</span>
                        </div>
                      </div>

                      {/* Enroll Button */}
                      <button
                        onClick={() => onEnroll(course)}
                        className="rounded-xl bg-brand-primary hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.97] shadow-sm flex items-center space-x-1"
                      >
                        <span>Enroll Now</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Stats footer bar */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-3 pt-2 border-t border-slate-50 dark:border-slate-800/40">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{course.studentsCount.toLocaleString()} enrolled</span>
                      </div>
                      <span>{course.lessonsCount} lessons</span>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
