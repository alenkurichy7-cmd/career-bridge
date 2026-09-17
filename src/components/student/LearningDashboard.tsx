import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  PlayCircle,
  FileText,
  Star,
  Sparkles,
  Printer,
  X,
  Search,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LearningDashboard: React.FC = () => {
  const { student, courses, enrollInCourse, completeCourseModule, claimCertificate } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [viewingCertificateCourse, setViewingCertificateCourse] = useState<Course | null>(null);

  const categories = [
    'All',
    'Technical',
    'Communication',
    'Leadership',
    'Problem Solving',
    'Interview Preparation',
    'Resume Writing',
    'Digital Skills'
  ];

  const filteredCourses = courses.filter(c => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.skillsCovered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleOpenCourse = (course: Course) => {
    // If not enrolled, enroll automatically or open
    if (!course.enrolled) {
      enrollInCourse(course.id);
    }
    const updated = courses.find(c => c.id === course.id) || course;
    setActiveCourseModal(updated);
  };

  const handleToggleModule = (courseId: string, moduleId: string) => {
    completeCourseModule(courseId, moduleId);
    // keep modal state synced
    setTimeout(() => {
      const updated = courses.find(c => c.id === courseId);
      if (updated) setActiveCourseModal(updated);
    }, 50);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Campus Career Curriculum</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Personalized Learning Hub</h1>
          <p className="text-sm text-slate-600 mt-1">
            Industry-aligned modules to upgrade technical competencies, communication, leadership, and interview readiness.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search courses, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-300'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>
                {course.completed && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-md">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 line-clamp-1">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{course.description}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {course.skillsCovered.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                      {skill}
                    </span>
                  ))}
                  {course.skillsCovered.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-medium px-1 self-center">
                      +{course.skillsCovered.length - 3} more
                    </span>
                  )}
                </div>

                {/* Progress Bar if enrolled */}
                {course.enrolled && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600">{course.progress}% Completed</span>
                      <span className="text-slate-400 text-[11px]">
                        {course.modules.filter(m => m.completed).length}/{course.modules.length} lessons
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          course.completed ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenCourse(course)}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{course.enrolled ? (course.completed ? 'Review Course' : 'Continue Learning') : 'Enroll Free'}</span>
                </button>

                {course.completed && (
                  <button
                    onClick={() => {
                      claimCertificate(course.id);
                      setViewingCertificateCourse(course);
                    }}
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
                    title="View & Download Certificate"
                  >
                    <Award className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail & Lesson Player Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="relative h-48 bg-slate-900">
              <img
                src={activeCourseModal.thumbnail}
                alt={activeCourseModal.title}
                className="w-full h-full object-cover opacity-50"
              />
              <button
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-600">
                  {activeCourseModal.category}
                </span>
                <h2 className="text-xl font-bold font-heading mt-1">{activeCourseModal.title}</h2>
                <p className="text-xs text-slate-300">Instructor: {activeCourseModal.instructor} • {activeCourseModal.instructorRole}</p>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Course Overview</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{activeCourseModal.description}</p>
              </div>

              {/* Syllabus / Modules Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Syllabus Modules ({activeCourseModal.modules.length})
                  </h3>
                  <span className="text-xs text-indigo-600 font-bold">
                    {activeCourseModal.modules.filter(m => m.completed).length} of {activeCourseModal.modules.length} Completed
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeCourseModal.modules.map((mod, index) => (
                    <div
                      key={mod.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        mod.completed
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleModule(activeCourseModal.id, mod.id)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                            mod.completed ? 'bg-emerald-600 text-white' : 'border border-slate-400 hover:border-indigo-600'
                          }`}
                        >
                          {mod.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <div className={`text-xs font-bold ${mod.completed ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                            Lesson {index + 1}: {mod.title}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{mod.duration}</span>
                            <span>•</span>
                            <span className="capitalize font-medium text-slate-600">{mod.type} Module</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleModule(activeCourseModal.id, mod.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                          mod.completed
                            ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                            : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                        }`}
                      >
                        {mod.completed ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Unlock Banner */}
              {activeCourseModal.completed ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-amber-300" />
                    <div>
                      <div className="font-bold text-sm">Certificate of Completion Unlocked!</div>
                      <div className="text-xs text-emerald-100">Verified credential added to your student profile</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      claimCertificate(activeCourseModal.id);
                      setViewingCertificateCourse(activeCourseModal);
                    }}
                    className="px-4 py-2 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-emerald-50 transition-colors"
                  >
                    View Certificate
                  </button>
                </div>
              ) : null}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable / Downloadable Certificate Modal */}
      {viewingCertificateCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 relative my-8">
            <button
              onClick={() => setViewingCertificateCourse(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
            >
              ✕
            </button>

            {/* Certificate Frame */}
            <div className="border-8 border-double border-indigo-900/20 p-8 rounded-2xl text-center bg-gradient-to-b from-slate-50 via-white to-slate-50 shadow-inner">
              <div className="flex items-center justify-center gap-2 text-indigo-700 mb-2">
                <Award className="w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-widest">CareerBridge Academy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                CERTIFICATE OF COMPLETION
              </h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">This is proudly presented to</p>

              <div className="my-4">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-indigo-950 border-b-2 border-indigo-200 pb-1 px-4 inline-block">
                  {student.name}
                </span>
                <div className="text-xs text-slate-500 mt-1 font-medium">{student.college} • {student.department}</div>
              </div>

              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                for successfully completing all curriculum modules, practical exercises, and assessments in
              </p>

              <div className="my-3 text-lg font-bold text-slate-900">
                {viewingCertificateCourse.title}
              </div>

              {/* Skills verified */}
              <div className="flex flex-wrap justify-center gap-1.5 my-3">
                {viewingCertificateCourse.skillsCovered.map(s => (
                  <span key={s} className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded border border-indigo-100">
                    ✓ {s}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-200 text-left">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Authorized Signatory</div>
                  <div className="font-serif italic font-bold text-slate-800 text-sm mt-0.5">{viewingCertificateCourse.instructor}</div>
                  <div className="text-[10px] text-slate-500">{viewingCertificateCourse.instructorRole}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Credential Verification</div>
                  <div className="font-mono text-xs text-indigo-700 font-bold mt-0.5">CB-VERIFIED-{viewingCertificateCourse.id.toUpperCase()}</div>
                  <div className="text-[10px] text-slate-500">Issued: {new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Print action */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500">Verified and cryptographically registered with College TPO Cell.</span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
