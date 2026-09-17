import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity, Course } from '../../types';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Briefcase,
  TrendingUp,
  Clock,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Building,
  Target,
  PlayCircle,
  Compass,
  BrainCircuit,
  MapPin,
  Calendar,
  X,
  Send,
  Edit3,
  Check,
  Zap,
  Users,
  Code
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    courses,
    opportunities,
    applications,
    setActiveTab,
    getSkillGapForCareer,
    applyToOpportunity,
    updateStudentProfile,
    showToast
  } = useApp();

  // State for modals
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [customGoalInput, setCustomGoalInput] = useState(student.targetCareer);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [applyCoverNote, setApplyCoverNote] = useState('');
  const [activeExperienceFilter, setActiveExperienceFilter] = useState<'all' | 'internship' | 'project' | 'workshop'>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Profile completion calculation
  const profileCompletionPercentage = 75;

  // Active & Recommended courses
  const pythonCourse = courses.find(c => c.id === 'crs_py') || courses[0];
  const otherEnrolledCourses = courses.filter(c => c.enrolled && c.id !== pythonCourse?.id);
  const displayCourses = pythonCourse ? [pythonCourse, ...otherEnrolledCourses] : courses.slice(0, 3);

  // Filtered opportunities for "Gain Real-World Experience"
  const experienceOpportunities = opportunities.filter(opp => {
    if (activeExperienceFilter === 'all') {
      return opp.type === 'internship' || opp.type === 'college_project' || opp.type === 'industry_project' || opp.type === 'workshop';
    }
    if (activeExperienceFilter === 'internship') return opp.type === 'internship';
    if (activeExperienceFilter === 'project') return opp.type === 'college_project' || opp.type === 'industry_project';
    if (activeExperienceFilter === 'workshop') return opp.type === 'workshop';
    return true;
  }).slice(0, 3);

  // Recommended Jobs
  const recommendedJobs = opportunities.filter(opp => opp.type === 'job').slice(0, 2);

  // Skill gap for the student's target career
  const skillGap = getSkillGapForCareer(student.targetCareer);

  // Handlers
  const handleSaveCareerGoal = (newGoal: string) => {
    if (!newGoal.trim()) return;
    updateStudentProfile({ targetCareer: newGoal.trim() });
    setShowEditGoalModal(false);
    showToast(`Target career updated to "${newGoal.trim()}"`, 'success');
  };

  const handleApply = (opp: Opportunity) => {
    const isAlreadyApplied = applications.some(a => a.opportunityId === opp.id);
    if (isAlreadyApplied) {
      showToast('You have already applied for this position.', 'info');
      return;
    }
    setSelectedOpportunity(opp);
    setApplyCoverNote(`Excited to apply for ${opp.title} at ${opp.companyOrOrg}. My coursework, practical projects, and technical skills match your requirements.`);
  };

  const submitApplication = () => {
    if (!selectedOpportunity) return;
    const success = applyToOpportunity(
      selectedOpportunity.id,
      applyCoverNote,
      `${student.name.replace(/\s+/g, '_')}_Resume_2026.pdf`
    );
    if (success) {
      setSelectedOpportunity(null);
    }
  };

  const isApplied = (oppId: string) => applications.some(a => a.opportunityId === oppId);

  // 4 Top Recommended Careers with growth indicators and indicative salary ranges
  const recommendedCareersList = [
    {
      id: 'rec_sde',
      title: 'Software Developer',
      description: 'Build applications and solve real-world problems using technology and clean code.',
      skills: ['Programming', 'Problem Solving', 'Databases', 'Git'],
      salaryRange: '₹8.5 - 18.0 LPA',
      growth: '+24% YoY High Growth',
      growthBadge: 'High Demand',
      match: 94
    },
    {
      id: 'rec_cloud',
      title: 'Cloud & DevOps Engineer',
      description: 'Architect automated cloud infrastructure, container orchestration, and CI/CD pipelines.',
      skills: ['Cloud Architecture', 'Docker', 'Linux', 'CI/CD Pipelines'],
      salaryRange: '₹10.0 - 20.0 LPA',
      growth: '+28% YoY Very High',
      growthBadge: 'Surging',
      match: 86
    },
    {
      id: 'rec_ai',
      title: 'AI & Data Solutions Engineer',
      description: 'Develop predictive models, intelligent agents, and scalable data analytics pipelines.',
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Analytics'],
      salaryRange: '₹11.0 - 22.0 LPA',
      growth: '+32% YoY Rapid Growth',
      growthBadge: 'Top Tier',
      match: 88
    },
    {
      id: 'rec_uiux',
      title: 'UI/UX & Product Designer',
      description: 'Design intuitive, accessible digital experiences, design systems, and interactive prototypes.',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      salaryRange: '₹7.5 - 15.0 LPA',
      growth: '+20% YoY Steady Growth',
      growthBadge: 'Creative',
      match: 76
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* ========================================================================= */}
      {/* 1. WELCOME SECTION + PROFILE COMPLETION + WEEKLY PROGRESS */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 rounded-3xl p-6 sm:p-8 border border-indigo-100/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Welcome Text & Career Goal */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Career Guidance & Placement Dashboard</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                {getGreeting()}, {student.name.split(' ')[0]} 👋
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Let's take the next step toward your career.
              </p>
            </div>

            {/* Career Goal Display with Edit Button */}
            <div className="inline-flex flex-wrap items-center gap-2.5 pt-1">
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
                <Target className="w-4 h-4 text-indigo-600" />
                <span className="text-xs text-slate-500 font-medium">Career Goal:</span>
                <span className="text-xs font-bold text-slate-900">{student.targetCareer}</span>
              </div>
              <button
                onClick={() => {
                  setCustomGoalInput(student.targetCareer);
                  setShowEditGoalModal(true);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Career Goal</span>
              </button>
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs lg:w-80 shrink-0 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Profile Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                {profileCompletionPercentage}% Complete
              </span>
            </div>

            <div className="space-y-1.5 my-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Profile Readiness</span>
                <span className="text-indigo-600 font-bold">{profileCompletionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${profileCompletionPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Add 1 project link & verified certification to reach 100%
              </p>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="mt-3 w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Complete Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Small "Your Progress This Week" Section */}
        <div className="mt-6 pt-6 border-t border-slate-200/70">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Your Progress This Week</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Updated 10m ago</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">2</div>
                <div className="text-xs text-slate-500 font-medium">Courses Completed</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">4</div>
                <div className="text-xs text-slate-500 font-medium">Skills Improved</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">{applications.length || 3}</div>
                <div className="text-xs text-slate-500 font-medium">Applications Sent</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">
                  {student.placementReadiness.completedMockInterviews || 1}
                </div>
                <div className="text-xs text-slate-500 font-medium">Interviews Done</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CAREER ASSESSMENT SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/60">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Diagnostic</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Discover Your Career Path
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Take our career assessment to discover careers that match your interests, strengths and skills.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setActiveTab('career')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Career Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Interactive Sub-Tests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => setActiveTab('career')}
            className="p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>Personality Test</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500">
                Understand your collaboration style and workplace culture fit.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>Aptitude Test</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500">
                Test quantitative analysis, logical deduction, and verbal agility.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className="p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>Career Interest Test</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500">
                Match your passions with modern industry roles and trajectories.
              </p>
            </div>
          </button>
        </div>

        {/* Top Matches Summary Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Your Top Career Matches:</span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
              Software Developer (94%)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-100">
              AI & Data Engineer (88%)
            </span>
          </div>
          <button
            onClick={() => setActiveTab('career')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Assessment Report</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RECOMMENDED CAREERS SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Careers Recommended For You
            </h2>
            <p className="text-xs text-slate-500">
              Personalized based on your skills, academic track, and assessment evaluation
            </p>
          </div>
          <button
            onClick={() => setActiveTab('career')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All Careers ({student.recommendedCareers?.length || 4})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid / Scrollable */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {recommendedCareersList.map(career => (
            <div
              key={career.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {career.match}% Match
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {career.growthBadge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1">{career.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {career.description}
                </p>

                {/* Required Skills */}
                <div className="space-y-1 mb-3">
                  <div className="text-[11px] font-semibold text-slate-500">Required Skills:</div>
                  <div className="text-xs text-slate-700 font-medium line-clamp-1">
                    {career.skills.join(' • ')}
                  </div>
                </div>

                {/* Salary & Growth Indicators */}
                <div className="pt-2.5 border-t border-slate-100 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 text-[11px]">Average Salary:</span>
                    <span className="font-bold text-slate-800">{career.salaryRange}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">
                    (Indicative est. industry range)
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{career.growth}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  updateStudentProfile({ targetCareer: career.title });
                  setActiveTab('skills');
                  showToast(`Selected "${career.title}". Analyzing skill gaps...`, 'info');
                }}
                className="mt-4 w-full py-2 px-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Career</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SKILL DEVELOPMENT SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-heading text-slate-900">
                Build Your Skills
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Certificates Earned: {student.certifications?.length || 3}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted courses to close your skill gaps for <span className="font-semibold text-slate-700">{student.targetCareer}</span>
            </p>
          </div>

          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All Courses ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayCourses.map(course => (
            <div
              key={course.id}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between bg-slate-50/40"
            >
              <div>
                {/* Course Thumbnail */}
                <div className="relative rounded-xl overflow-hidden h-32 mb-3 bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/95 text-indigo-700 shadow-2xs">
                    {course.category}
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">{course.title}</h3>
                <p className="text-xs text-slate-500 mb-3">By {course.instructor}</p>

                {/* Course Progress */}
                <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Course Progress</span>
                    <span className="text-indigo-600 font-bold">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>
                      {course.modules?.filter(m => m.completed).length || 2} of {course.modules?.length || 5} lessons
                    </span>
                    {course.progress === 100 && (
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {course.rating} ★ ({course.enrolledCount.toLocaleString()} learners)
                </span>
                <button
                  onClick={() => {
                    setActiveCourseModal(course);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERNSHIPS & PROJECTS SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Gain Real-World Experience
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Practical internships, faculty-mentored projects, and hands-on workshops
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveExperienceFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeExperienceFilter === 'all' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveExperienceFilter('internship')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeExperienceFilter === 'internship' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Internships
              </button>
              <button
                onClick={() => setActiveExperienceFilter('project')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeExperienceFilter === 'project' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Live Projects
              </button>
              <button
                onClick={() => setActiveExperienceFilter('workshop')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeExperienceFilter === 'workshop' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Workshops
              </button>
            </div>

            <button
              onClick={() => setActiveTab('opportunities')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer ml-2"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experienceOpportunities.map(opp => {
            const applied = isApplied(opp.id);
            return (
              <div
                key={opp.id}
                className="p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {opp.type.replace('_', ' ')}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        applied
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                      }`}
                    >
                      {applied ? '✓ Applied' : 'Open'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">{opp.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{opp.companyOrOrg}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-medium text-slate-800">{opp.location} ({opp.workMode})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <span className="font-medium text-slate-800">{opp.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Stipend / Grant:</span>
                      <span className="font-bold text-emerald-700">{opp.stipendOrSalary}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60 text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Deadline:</span>
                      <span>{opp.deadline}</span>
                    </div>
                  </div>

                  {/* Skills Required */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500">Required Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {opp.skillsRequired.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {skill}
                        </span>
                      ))}
                      {opp.skillsRequired.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{opp.skillsRequired.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleApply(opp)}
                    className="py-1.5 px-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApply(opp)}
                    disabled={applied}
                    className={`py-1.5 px-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center ${
                      applied
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    {applied ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PLACEMENT PREPARATION SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Get Placement Ready
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sharpen your resume, crack technical coding rounds, and rehearse behavioral interviews
            </p>
          </div>

          {/* Placement Readiness: 72% Indicator */}
          <div className="flex items-center gap-3.5 bg-slate-50 p-2.5 px-4 rounded-2xl border border-slate-200/80 self-start sm:self-auto">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-slate-200"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={2 * Math.PI * 19 * (1 - 0.72)}
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-900">72%</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Placement Readiness</div>
              <div className="text-sm font-extrabold text-indigo-700">72% Campus Ready</div>
            </div>
          </div>
        </div>

        {/* 3 Attractive Prep Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Resume Builder */}
          <div className="bg-gradient-to-br from-blue-50/50 via-white to-white p-5 rounded-2xl border border-blue-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Resume Builder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create a professional, job-ready resume. Select ATS-friendly templates, export formatted PDFs, and match keywords.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('prep')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 group cursor-pointer"
            >
              <span>Build Resume</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mock Interviews */}
          <div className="bg-gradient-to-br from-purple-50/50 via-white to-white p-5 rounded-2xl border border-purple-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Mock Interviews</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice real interview questions. Practice behavioral STAR framework scenarios and system design fundamentals.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('prep')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 group cursor-pointer"
            >
              <span>Start Interview</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Aptitude Practice */}
          <div className="bg-gradient-to-br from-indigo-50/50 via-white to-white p-5 rounded-2xl border border-indigo-100 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Aptitude Practice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Improve your quantitative and logical reasoning with timed simulations, instant explanations, and analytics.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('prep')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 group cursor-pointer"
            >
              <span>Practice Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. JOB OPPORTUNITIES SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900">
              Jobs Recommended For You
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated full-time entry-level engineering and product roles
            </p>
          </div>

          <button
            onClick={() => setActiveTab('opportunities')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Jobs →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs.map(job => {
            const applied = isApplied(job.id);
            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{job.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                        <span className="font-semibold text-slate-800">{job.companyOrOrg}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {job.location}</span>
                        <span>•</span>
                        <span className="px-2 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">{job.duration || 'Full-time'}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                        applied
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                      }`}
                    >
                      {applied ? '✓ Applied' : 'Open'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 my-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 my-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Compensation:</span>
                      <span className="font-bold text-emerald-700">{job.stipendOrSalary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience:</span>
                      <span className="font-medium text-slate-800">{job.experience || '0-1 Years (Freshers Eligible)'}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500">Skills:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skillsRequired.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50/70 text-indigo-700 border border-indigo-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400">
                    Deadline: {job.deadline}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApply(job)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      View Job
                    </button>
                    <button
                      onClick={() => handleApply(job)}
                      disabled={applied}
                      className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                        applied
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                      }`}
                    >
                      {applied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT CAREER GOAL MODAL */}
      {/* ========================================================================= */}
      {showEditGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg text-slate-900">Edit Career Goal</h3>
              </div>
              <button
                onClick={() => setShowEditGoalModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Setting your primary career goal aligns all course recommendations, skill gap benchmarks, and placement opportunities.
            </p>

            {/* Quick Pick Popular Goals */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Quick Select Common Roles:</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Software Developer',
                  'Full Stack Software Engineer',
                  'Cloud & DevOps Engineer',
                  'AI & Data Solutions Engineer',
                  'UI/UX & Product Designer',
                  'Cybersecurity Analyst',
                  'Mobile App Developer'
                ].map(roleName => (
                  <button
                    key={roleName}
                    type="button"
                    onClick={() => setCustomGoalInput(roleName)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                      customGoalInput === roleName
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {roleName}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Custom Career Goal:</label>
              <input
                type="text"
                value={customGoalInput}
                onChange={e => setCustomGoalInput(e.target.value)}
                placeholder="e.g. Embedded Systems Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEditGoalModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveCareerGoal(customGoalInput)}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer"
              >
                Save Career Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: APPLICATION & DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                  {selectedOpportunity.type.replace('_', ' ')}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">{selectedOpportunity.title}</h3>
                <div className="text-xs text-slate-600 font-medium">{selectedOpportunity.companyOrOrg} • {selectedOpportunity.location}</div>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed text-slate-600">{selectedOpportunity.description}</p>

              <div className="bg-slate-50 p-3.5 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Stipend / CTC:</span>
                  <span className="font-bold text-emerald-700">{selectedOpportunity.stipendOrSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration / Type:</span>
                  <span className="font-medium text-slate-800">{selectedOpportunity.duration} ({selectedOpportunity.workMode})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-medium text-slate-800">{selectedOpportunity.deadline}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Required Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOpportunity.skillsRequired.map(skill => (
                    <span key={skill} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Form */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-indigo-950">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Applicant Credentials</div>
                  <div className="font-bold text-xs mt-0.5">{student.name} • CGPA {student.cgpa}</div>
                  <div className="text-[11px] text-indigo-800">{student.college} • {student.course}</div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Attached ATS Resume: <span className="font-medium text-slate-800">{student.name.replace(/\s+/g, '_')}_Resume_2026.pdf</span></span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Candidate Note to Recruiter:</label>
                  <textarea
                    rows={3}
                    value={applyCoverNote}
                    onChange={e => setApplyCoverNote(e.target.value)}
                    placeholder="Briefly state why you're a great fit..."
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={submitApplication}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: QUICK COURSE SYLLABUS / CONTINUE LEARNING MODAL */}
      {/* ========================================================================= */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                  {activeCourseModal.category} Track
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">{activeCourseModal.title}</h3>
                <div className="text-xs text-slate-500 font-medium">By {activeCourseModal.instructor} • {activeCourseModal.duration}</div>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed text-slate-600">{activeCourseModal.description}</p>

              {/* Progress Summary */}
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 border border-slate-200/70">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Current Progress</span>
                  <span className="text-indigo-600">{activeCourseModal.progress || 0}% Complete</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${activeCourseModal.progress || 0}%` }}
                  />
                </div>
              </div>

              {/* Modules Checklist */}
              <div>
                <span className="font-bold text-slate-800 block mb-2">Modules & Lessons:</span>
                <div className="space-y-2">
                  {activeCourseModal.modules.map(mod => (
                    <div
                      key={mod.id}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            mod.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {mod.completed ? '✓' : '•'}
                        </div>
                        <span className={`text-xs ${mod.completed ? 'font-medium text-slate-800 line-through text-slate-400' : 'font-semibold text-slate-800'}`}>
                          {mod.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{mod.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCourseModal(null);
                  setActiveTab('courses');
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Go to Course Player</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
