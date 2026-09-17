import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  GraduationCap,
  Building2,
  Briefcase,
  Layers,
  RotateCcw,
  Sparkles,
  Bell,
  CheckCircle,
  Award
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab, student, collegeProfile, employerProfile, resetToDemoData } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'Interview Shortlist! 🎉',
      desc: 'CloudScale Technologies reviewed your application and shortlisted you for SDE Intern.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 'n2',
      title: 'New Placement Drive Scheduled',
      desc: 'NexaHealth Solutions drive scheduled for Oct 20. Registrations open.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 'n3',
      title: 'Course Milestone Reached',
      desc: 'You completed 70% of Modern Full-Stack Development.',
      time: '3 days ago',
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(role === 'student' ? 'home' : 'dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-sky-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold font-heading tracking-tight text-slate-900">CareerBridge</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">Campus</span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Bridging College to High-Growth Careers</p>
              </div>
            </button>
          </div>

          {/* Role Switcher Pill */}
          <div className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student / Graduate</span>
            </button>
            <button
              onClick={() => setRole('college')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'college'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>College TPO</span>
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'employer'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Employer</span>
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student Placement Readiness Badge (Only in student view) */}
            {role === 'student' && (
              <button
                onClick={() => setActiveTab('prep')}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
                title="View placement preparation readiness breakdown"
              >
                <div className="relative flex items-center justify-center">
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Placement Ready</div>
                  <div className="text-xs font-bold text-emerald-950">{student.placementReadiness.overall}% Score</div>
                </div>
              </button>
            )}

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Notifications</span>
                    <span className="text-[11px] text-indigo-600 font-medium">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                    {notifications.map(n => (
                      <div key={n.id} className="py-2.5 px-1.5 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-semibold text-slate-900">{n.title}</h4>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={resetToDemoData}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
              title="Reset application to default demo state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset Demo</span>
            </button>

            {/* Profile Avatar / Quick Info */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
              <img
                src={role === 'student' ? student.avatar : role === 'college' ? collegeProfile.avatar : employerProfile.logo}
                alt="Profile avatar"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                  {role === 'student' ? student.name : role === 'college' ? collegeProfile.officerName : employerProfile.recruiterName}
                </div>
                <div className="text-[10px] text-slate-500 capitalize">
                  {role === 'student' ? student.course : role === 'college' ? 'Placement Cell' : employerProfile.companyName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar for Student */}
        {role === 'student' && (
          <nav className="hidden md:flex items-center gap-1 border-t border-slate-100 py-1.5 overflow-x-auto text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'home' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'career' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Career Assessment
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'skills' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Skill Gap Analysis
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'courses' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Personalized Learning
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'opportunities' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Opportunities & Jobs
            </button>
            <button
              onClick={() => setActiveTab('prep')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'prep' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Placement Prep & Resume
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              My Profile
            </button>
          </nav>
        )}

        {/* Mobile Role Switcher Bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role View:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setRole('student')}
              className={`px-2 py-1 text-xs rounded-md font-medium ${role === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('college')}
              className={`px-2 py-1 text-xs rounded-md font-medium ${role === 'college' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              College
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`px-2 py-1 text-xs rounded-md font-medium ${role === 'employer' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Employer
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
