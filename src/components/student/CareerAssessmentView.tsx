import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DetailedAssessmentData } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Target,
  Briefcase,
  TrendingUp,
  Brain,
  User,
  Compass,
  Star,
  GraduationCap,
  Award,
  ChevronRight,
  Building,
  DollarSign,
  Layers,
  ShieldCheck,
  Lightbulb,
  Users,
  Code2,
  BookOpen,
  HeartHandshake,
  MessageSquare,
  BadgeCheck,
  Check,
  Edit3
} from 'lucide-react';

export const CareerAssessmentView: React.FC = () => {
  const { student, submitCareerAssessment, setTargetCareer, setActiveTab } = useApp();

  // Mode: if user has already completed assessment, default to results view.
  // Otherwise, start assessment wizard.
  const [isEditingAssessment, setIsEditingAssessment] = useState<boolean>(!student.assessmentCompleted);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [resultsTab, setResultsTab] = useState<'recommendations' | 'profile'>('recommendations');

  // Load existing or default values for the 5 essential field categories
  const existingAssessment = student.detailedAssessment;

  // 1. Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    name: existingAssessment?.personalInfo?.name || student.name || 'Rahul Sharma',
    age: existingAssessment?.personalInfo?.age || '21',
    educationLevel: existingAssessment?.personalInfo?.educationLevel || 'Undergraduate (B.Tech / B.E.)',
    courseStream: existingAssessment?.personalInfo?.courseStream || student.department || 'Computer Science & Engineering'
  });

  // 2. Interests Assessment (1 to 5 rating)
  const [interests, setInterests] = useState({
    enjoyTechnology: existingAssessment?.interests?.enjoyTechnology || 5,
    likeHelpingPeople: existingAssessment?.interests?.likeHelpingPeople || 4,
    enjoyCreativeWork: existingAssessment?.interests?.enjoyCreativeWork || 4,
    preferBusinessActivities: existingAssessment?.interests?.preferBusinessActivities || 3,
    enjoyResearchAnalysis: existingAssessment?.interests?.enjoyResearchAnalysis || 4,
    handsOnBuilding: existingAssessment?.interests?.handsOnBuilding || 5
  });

  // 3. Skills Assessment (Rate 1 - 5)
  const [skills, setSkills] = useState({
    communication: existingAssessment?.skills?.communication || 4,
    leadership: existingAssessment?.skills?.leadership || 3,
    problemSolving: existingAssessment?.skills?.problemSolving || 5,
    codingTechnical: existingAssessment?.skills?.codingTechnical || 5,
    creativity: existingAssessment?.skills?.creativity || 4,
    teamwork: existingAssessment?.skills?.teamwork || 4
  });

  // 4. Personality Assessment
  const [personality, setPersonality] = useState<{
    introvertExtrovert: 'introvert' | 'extrovert' | 'ambivert';
    workStyle: 'independent' | 'team-oriented' | 'balanced';
    thinkingStyle: 'analytical' | 'creative' | 'hybrid';
    decisionStyle: 'risk-taking' | 'cautious' | 'calculated';
  }>({
    introvertExtrovert: existingAssessment?.personality?.introvertExtrovert || 'ambivert',
    workStyle: existingAssessment?.personality?.workStyle || 'team-oriented',
    thinkingStyle: existingAssessment?.personality?.thinkingStyle || 'analytical',
    decisionStyle: existingAssessment?.personality?.decisionStyle || 'calculated'
  });

  // 5. Academic Strengths
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>(
    existingAssessment?.academicStrengths?.favoriteSubjects || [
      'Data Structures & Algorithms',
      'Web Technologies',
      'Database Systems',
      'Operating Systems'
    ]
  );
  const [bestPerformingSubjects, setBestPerformingSubjects] = useState<string[]>(
    existingAssessment?.academicStrengths?.bestPerformingSubjects || [
      'Object Oriented Programming',
      'Database Management Systems',
      'Discrete Mathematics'
    ]
  );
  const [previousAchievements, setPreviousAchievements] = useState<string>(
    existingAssessment?.academicStrengths?.previousAchievements ||
      'Top 5% in University Coding Sprint 2025; Finalist in Smart India Hackathon; AWS Cloud Practitioner Certified.'
  );

  const [customSubjectInput, setCustomSubjectInput] = useState('');
  const [customBestSubjectInput, setCustomBestSubjectInput] = useState('');

  const stepsList = [
    { title: 'Personal Info', subtitle: 'Basic Profile', icon: User },
    { title: 'Interests', subtitle: 'Passion & Drive', icon: HeartHandshake },
    { title: 'Skills Rating', subtitle: '1–5 Competency', icon: Star },
    { title: 'Personality', subtitle: 'Work Style & Mindset', icon: Brain },
    { title: 'Academic Strengths', subtitle: 'Subjects & Achievements', icon: GraduationCap }
  ];

  // Subject quick presets
  const availableSubjectsList = [
    'Data Structures & Algorithms',
    'Web Technologies',
    'Database Systems',
    'Operating Systems',
    'Computer Networks',
    'AI & Machine Learning',
    'Mathematics & Statistics',
    'Cloud Computing',
    'Cybersecurity & Cryptography',
    'UI/UX Design & HCI',
    'Software Engineering',
    'Discrete Mathematics'
  ];

  const toggleFavoriteSubject = (subject: string) => {
    if (favoriteSubjects.includes(subject)) {
      setFavoriteSubjects(favoriteSubjects.filter(s => s !== subject));
    } else {
      setFavoriteSubjects([...favoriteSubjects, subject]);
    }
  };

  const toggleBestSubject = (subject: string) => {
    if (bestPerformingSubjects.includes(subject)) {
      setBestPerformingSubjects(bestPerformingSubjects.filter(s => s !== subject));
    } else {
      setBestPerformingSubjects([...bestPerformingSubjects, subject]);
    }
  };

  const addCustomFavoriteSubject = () => {
    if (customSubjectInput.trim() && !favoriteSubjects.includes(customSubjectInput.trim())) {
      setFavoriteSubjects([...favoriteSubjects, customSubjectInput.trim()]);
      setCustomSubjectInput('');
    }
  };

  const addCustomBestSubject = () => {
    if (customBestSubjectInput.trim() && !bestPerformingSubjects.includes(customBestSubjectInput.trim())) {
      setBestPerformingSubjects([...bestPerformingSubjects, customBestSubjectInput.trim()]);
      setCustomBestSubjectInput('');
    }
  };

  const handleNext = () => {
    if (currentStep < stepsList.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submission
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitAssessment = () => {
    const detailedData: DetailedAssessmentData = {
      personalInfo,
      interests,
      skills,
      personality,
      academicStrengths: {
        favoriteSubjects,
        bestPerformingSubjects,
        previousAchievements
      }
    };

    submitCareerAssessment(undefined, detailedData);
    setIsEditingAssessment(false);
    setResultsTab('recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeOrEdit = () => {
    setIsEditingAssessment(true);
    setCurrentStep(0);
  };

  // Helper for skill rating labels
  const getSkillLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'Beginner (1/5)';
      case 2:
        return 'Elementary (2/5)';
      case 3:
        return 'Intermediate (3/5)';
      case 4:
        return 'Proficient (4/5)';
      case 5:
        return 'Advanced / Expert (5/5)';
      default:
        return `${level}/5`;
    }
  };

  const getInterestLabel = (rating: number) => {
    switch (rating) {
      case 1:
        return 'Not at all';
      case 2:
        return 'Slightly';
      case 3:
        return 'Moderately';
      case 4:
        return 'A lot';
      case 5:
        return 'Extremely / Passionate';
      default:
        return `${rating}/5`;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Brain className="w-3.5 h-3.5" />
            <span>Comprehensive Student Career Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
            Career Assessment & Guidance
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Assess your personal background, genuine interests, core 1–5 skills, personality archetype, and academic strengths to receive scientifically tailored career recommendations.
          </p>
        </div>

        {student.assessmentCompleted && !isEditingAssessment && (
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleRetakeOrEdit}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-indigo-200"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update / Retake Assessment</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ASSESSMENT WIZARD (WHEN TAKING OR UPDATING) */}
      {/* ========================================================================= */}
      {isEditingAssessment ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          {/* Step Navigator Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Step {currentStep + 1} of {stepsList.length}: {stepsList[currentStep].title}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {Math.round(((currentStep + 1) / stepsList.length) * 100)}% Complete
              </span>
            </div>

            {/* Visual Step Tabs */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {stepsList.map((step, idx) => {
                const StepIcon = step.icon;
                const isCurrent = currentStep === idx;
                const isPassed = currentStep > idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start gap-1 ${
                      isCurrent
                        ? 'bg-indigo-50/90 border-indigo-600 shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-50'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isCurrent
                            ? 'bg-indigo-600 text-white'
                            : isPassed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isPassed ? <Check className="w-3 h-3" /> : idx + 1}
                      </div>
                      <span className="hidden sm:inline text-xs font-bold truncate text-slate-800">
                        {step.title}
                      </span>
                    </div>
                    <span className="hidden md:inline text-[10px] text-slate-500 truncate w-full">
                      {step.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / stepsList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: PERSONAL INFORMATION */}
          {/* ========================================================================= */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <User className="w-5 h-5" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">1. Personal Information</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Provide your academic identity so your career recommendations match your degree level and stream.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={e => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm text-slate-800 bg-white shadow-2xs"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="60"
                    value={personalInfo.age}
                    onChange={e => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm text-slate-800 bg-white shadow-2xs"
                    placeholder="e.g. 21"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Education Level
                  </label>
                  <select
                    value={personalInfo.educationLevel}
                    onChange={e => setPersonalInfo({ ...personalInfo, educationLevel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm text-slate-800 bg-white shadow-2xs"
                  >
                    <option value="Undergraduate (B.Tech / B.E.)">Undergraduate (B.Tech / B.E.)</option>
                    <option value="Undergraduate (B.Sc / BCA / BCS)">Undergraduate (B.Sc / BCA / BCS)</option>
                    <option value="Postgraduate (M.Tech / MCA / MS)">Postgraduate (M.Tech / MCA / MS)</option>
                    <option value="Undergraduate (B.Com / BBA)">Undergraduate (B.Com / BBA)</option>
                    <option value="Postgraduate (MBA)">Postgraduate (MBA)</option>
                    <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                    <option value="Senior Secondary (Class XII)">Senior Secondary (Class XII)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Course / Stream
                  </label>
                  <input
                    type="text"
                    value={personalInfo.courseStream}
                    onChange={e => setPersonalInfo({ ...personalInfo, courseStream: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm text-slate-800 bg-white shadow-2xs"
                    placeholder="e.g. Computer Science & Engineering"
                  />
                </div>
              </div>

              {/* Quick Preset Stream Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">
                  Popular Streams (Click to autofill):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Computer Science & Engineering',
                    'Information Technology',
                    'Data Science & Artificial Intelligence',
                    'Electronics & Communication (ECE)',
                    'Mechanical Engineering',
                    'Civil Engineering',
                    'Business & Management Studies'
                  ].map(stream => (
                    <button
                      key={stream}
                      type="button"
                      onClick={() => setPersonalInfo({ ...personalInfo, courseStream: stream })}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        personalInfo.courseStream === stream
                          ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: INTERESTS ASSESSMENT */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <HeartHandshake className="w-5 h-5" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">2. Interests Assessment</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Rate how strongly you resonate with each domain activity from 1 (Not Interested) to 5 (Passionate).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Q1: Do you enjoy technology? */}
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Do you enjoy technology?</span>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {getInterestLabel(interests.enjoyTechnology)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Working with software, computing gadgets, coding, building digital solutions, or exploring tech trends.
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInterests({ ...interests, enjoyTechnology: val })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          interests.enjoyTechnology === val
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2: Do you like helping people? */}
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Do you like helping people?</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {getInterestLabel(interests.likeHelpingPeople)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Mentoring, teaching, counseling, resolving customer challenges, or contributing to human welfare.
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInterests({ ...interests, likeHelpingPeople: val })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          interests.likeHelpingPeople === val
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3: Do you enjoy creative work? */}
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Do you enjoy creative work?</span>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {getInterestLabel(interests.enjoyCreativeWork)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Designing UI aesthetics, visual storytelling, creative writing, innovative ideation, or media design.
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInterests({ ...interests, enjoyCreativeWork: val })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          interests.enjoyCreativeWork === val
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q4: Do you prefer business activities? */}
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Do you prefer business activities?</span>
                    </div>
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      {getInterestLabel(interests.preferBusinessActivities)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Entrepreneurship, market strategy, product management, sales, financial planning, and organizational growth.
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInterests({ ...interests, preferBusinessActivities: val })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          interests.preferBusinessActivities === val
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q5: Do you enjoy research & analyzing numbers? */}
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Do you enjoy research & data analysis?</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                      {getInterestLabel(interests.enjoyResearchAnalysis || 4)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Mining datasets, finding mathematical correlations, hypothesis testing, and discovering hidden patterns.
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInterests({ ...interests, enjoyResearchAnalysis: val })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          interests.enjoyResearchAnalysis === val
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q6: Hands-on building & experimenting */}
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Target className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Do you like hands-on building & tinkering?</span>
                    </div>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {getInterestLabel(interests.handsOnBuilding || 5)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Assembling hardware prototypes, debugging real-world systems, and deploying working software apps.
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInterests({ ...interests, handsOnBuilding: val })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          interests.handsOnBuilding === val
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: SKILLS ASSESSMENT (Rate 1 - 5) */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Star className="w-5 h-5 fill-indigo-600" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">3. Skills Assessment</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Rate your current self-proficiency in each essential competency from 1 (Novice) to 5 (Expert).
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: 'communication',
                    title: 'Communication',
                    desc: 'Expressing ideas clearly in verbal presentations, technical documentation, and professional discussions.',
                    icon: MessageSquare,
                    color: 'text-blue-600'
                  },
                  {
                    key: 'leadership',
                    title: 'Leadership',
                    desc: 'Guiding peers, taking proactive initiative, resolving conflicts, and driving projects to completion.',
                    icon: Award,
                    color: 'text-amber-600'
                  },
                  {
                    key: 'problemSolving',
                    title: 'Problem-solving',
                    desc: 'Breaking down complex challenges logically, finding root causes, and formulating robust algorithms.',
                    icon: Brain,
                    color: 'text-indigo-600'
                  },
                  {
                    key: 'codingTechnical',
                    title: 'Coding / Technical Skills',
                    desc: 'Writing clean code, debugging syntax, mastering frameworks, databases, and computer systems.',
                    icon: Code2,
                    color: 'text-emerald-600'
                  },
                  {
                    key: 'creativity',
                    title: 'Creativity',
                    desc: 'Generating novel approaches, visual aesthetics, thinking outside conventional constraints.',
                    icon: Lightbulb,
                    color: 'text-purple-600'
                  },
                  {
                    key: 'teamwork',
                    title: 'Teamwork',
                    desc: 'Collaborating respectfully in multi-member groups, peer code reviews, and shared milestone ownership.',
                    icon: Users,
                    color: 'text-rose-600'
                  }
                ].map(skillItem => {
                  const currentRating = skills[skillItem.key as keyof typeof skills];
                  const ItemIcon = skillItem.icon;

                  return (
                    <div
                      key={skillItem.key}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-indigo-300 transition-all shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-slate-100 shrink-0">
                            <ItemIcon className={`w-4 h-4 ${skillItem.color}`} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{skillItem.title}</div>
                            <div className="text-xs text-slate-500">{skillItem.desc}</div>
                          </div>
                        </div>

                        <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 self-start sm:self-auto shrink-0">
                          {getSkillLabel(currentRating)}
                        </div>
                      </div>

                      {/* Interactive 1 to 5 Stars / Rating Buttons */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-400 font-medium mr-2">Level:</span>
                        {[1, 2, 3, 4, 5].map(lvl => {
                          const isActive = lvl <= currentRating;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => setSkills({ ...skills, [skillItem.key]: lvl })}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                lvl === currentRating
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-600/20'
                                  : isActive
                                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  isActive ? 'fill-current text-amber-400' : 'text-slate-300'
                                }`}
                              />
                              <span>{lvl}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: PERSONALITY ASSESSMENT */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Brain className="w-5 h-5" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">4. Personality Assessment</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Identify your natural working instincts across the four key behavioral continuums.
                </p>
              </div>

              <div className="space-y-5">
                {/* 1. Introvert or Extrovert */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Dimension 1: Social Energy & Recharge Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        value: 'introvert',
                        label: 'Introvert',
                        desc: 'Deep focus, thoughtful written communication, recharges in quiet concentration.'
                      },
                      {
                        value: 'ambivert',
                        label: 'Ambivert (Balanced)',
                        desc: 'Comfortable toggling between quiet solo deep-work and lively team brainstorms.'
                      },
                      {
                        value: 'extrovert',
                        label: 'Extrovert',
                        desc: 'Energized by frequent group dialogues, public speaking, active networking and debate.'
                      }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setPersonality({
                            ...personality,
                            introvertExtrovert: opt.value as any
                          })
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          personality.introvertExtrovert === opt.value
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-600/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">{opt.label}</div>
                        <div
                          className={`text-xs leading-relaxed ${
                            personality.introvertExtrovert === opt.value ? 'text-indigo-100' : 'text-slate-500'
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Independent or Team-oriented */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Dimension 2: Work Structure & Collaboration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        value: 'independent',
                        label: 'Independent',
                        desc: 'Self-driven execution, solo ownership, high autonomy without frequent check-ins.'
                      },
                      {
                        value: 'balanced',
                        label: 'Balanced Pods',
                        desc: 'Owns individual modules while participating in daily team standups and syncs.'
                      },
                      {
                        value: 'team-oriented',
                        label: 'Team-oriented',
                        desc: 'Thrives in collaborative co-creation, pairing, collective accountability and camaraderie.'
                      }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setPersonality({
                            ...personality,
                            workStyle: opt.value as any
                          })
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          personality.workStyle === opt.value
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-600/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">{opt.label}</div>
                        <div
                          className={`text-xs leading-relaxed ${
                            personality.workStyle === opt.value ? 'text-indigo-100' : 'text-slate-500'
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Analytical or Creative */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Dimension 3: Problem Solving & Cognitive Style
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        value: 'analytical',
                        label: 'Analytical',
                        desc: 'Guided by mathematical rigor, metrics, logic structures, and verified evidence.'
                      },
                      {
                        value: 'hybrid',
                        label: 'Analytical + Creative',
                        desc: 'Combines algorithmic reasoning with design aesthetics and empathetic user insights.'
                      },
                      {
                        value: 'creative',
                        label: 'Creative & Intuitive',
                        desc: 'Driven by unconventional ideas, aesthetics, visual imagination, and storytelling.'
                      }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setPersonality({
                            ...personality,
                            thinkingStyle: opt.value as any
                          })
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          personality.thinkingStyle === opt.value
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-600/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">{opt.label}</div>
                        <div
                          className={`text-xs leading-relaxed ${
                            personality.thinkingStyle === opt.value ? 'text-indigo-100' : 'text-slate-500'
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Risk-taking or Cautious */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Dimension 4: Decision Making & Risk Appetite
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        value: 'risk-taking',
                        label: 'Bold / Risk-taking',
                        desc: 'Comfortable with ambiguity, fast prototypes, high-upside gambits, and rapid iterations.'
                      },
                      {
                        value: 'calculated',
                        label: 'Calculated Risk-taker',
                        desc: 'Tests hypotheses with empirical data and contingency plans before committing resources.'
                      },
                      {
                        value: 'cautious',
                        label: 'Cautious & Thorough',
                        desc: 'Prioritizes stability, meticulous test coverage, high precision, zero-defect security.'
                      }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setPersonality({
                            ...personality,
                            decisionStyle: opt.value as any
                          })
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          personality.decisionStyle === opt.value
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-600/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">{opt.label}</div>
                        <div
                          className={`text-xs leading-relaxed ${
                            personality.decisionStyle === opt.value ? 'text-indigo-100' : 'text-slate-500'
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: ACADEMIC STRENGTHS */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <GraduationCap className="w-5 h-5" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">5. Academic Strengths</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Select your favorite subjects, best-performing courses, and notable achievements.
                </p>
              </div>

              {/* 1. Favorite subjects */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Favorite Subjects</span>
                  </label>
                  <span className="text-xs text-slate-400">Selected: {favoriteSubjects.length}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Topics you genuinely enjoy studying or exploring beyond mandatory college lectures.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {availableSubjectsList.map(subj => {
                    const isSelected = favoriteSubjects.includes(subj);
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => toggleFavoriteSubject(subj)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{subj}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Favorite Subject */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={customSubjectInput}
                    onChange={e => setCustomSubjectInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomFavoriteSubject()}
                    placeholder="Add custom subject (e.g. Distributed Systems)..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button
                    type="button"
                    onClick={addCustomFavoriteSubject}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* 2. Best-performing subjects */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>Best-Performing Subjects</span>
                  </label>
                  <span className="text-xs text-slate-400">Selected: {bestPerformingSubjects.length}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Subjects where you consistently achieved highest marks, grades, or top university percentiles.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {availableSubjectsList.map(subj => {
                    const isSelected = bestPerformingSubjects.includes(subj);
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => toggleBestSubject(subj)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{subj}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Best Subject */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={customBestSubjectInput}
                    onChange={e => setCustomBestSubjectInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomBestSubject()}
                    placeholder="Add custom high-scoring subject..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button
                    type="button"
                    onClick={addCustomBestSubject}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* 3. Previous achievements */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Previous Achievements & Recognitions</span>
                </label>
                <p className="text-xs text-slate-500">
                  List any hackathon wins, published papers, merit scholarships, industry certifications, or club leadership honors.
                </p>
                <textarea
                  rows={3}
                  value={previousAchievements}
                  onChange={e => setPreviousAchievements(e.target.value)}
                  placeholder="e.g. 1st Place in University Web Hackathon 2025; AWS Certified Cloud Practitioner; Top 5% in CodeForces contest..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm text-slate-800 bg-white"
                />
              </div>
            </div>
          )}

          {/* Action Footer Bar */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentStep === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-200"
            >
              <span>{currentStep === stepsList.length - 1 ? 'Generate Career Matches' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* RESULTS AND RECOMMENDATIONS REPORT VIEW */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Navigation Toggle for Results & Assessment Profile */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setResultsTab('recommendations')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  resultsTab === 'recommendations'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Careers ({student.recommendedCareers?.length || 4})</span>
              </button>

              <button
                onClick={() => setResultsTab('profile')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  resultsTab === 'profile'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>My Assessment Profile & Traits</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 pr-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Assessment Verified</span>
            </div>
          </div>

          {/* Assessment Summary Snapshot Card */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-indigo-100 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Candidate: {personalInfo.name || student.name} • Age {personalInfo.age || '21'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  {personalInfo.courseStream || student.course}
                </h2>
                <p className="text-indigo-200 text-sm max-w-2xl leading-relaxed">
                  {personalInfo.educationLevel || 'Undergraduate'} • Profile archetype:{' '}
                  <strong className="text-white capitalize">
                    {personality.thinkingStyle} {personality.decisionStyle} {personality.introvertExtrovert}
                  </strong>
                </p>

                {/* Trait badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10">
                    Coding/Tech: {skills.codingTechnical}/5
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10">
                    Problem Solving: {skills.problemSolving}/5
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10">
                    Creativity: {skills.creativity}/5
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10">
                    Communication: {skills.communication}/5
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-6 gap-3">
                <div className="text-left md:text-right">
                  <div className="text-xs text-indigo-200">Current Target Path</div>
                  <div className="text-lg font-bold text-white mt-0.5">{student.targetCareer}</div>
                </div>
                <button
                  onClick={handleRetakeOrEdit}
                  className="px-4 py-2 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs transition-all shadow-sm cursor-pointer"
                >
                  Edit Answers
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: RECOMMENDED CAREERS */}
          {/* ========================================================================= */}
          {resultsTab === 'recommendations' && (
            <div className="space-y-6">
              {/* Cognitive & Skill Archetype Bars */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold font-heading text-slate-900">
                      Calculated Competency Profile
                    </h2>
                    <p className="text-xs text-slate-500">
                      Synthesized across your 1-5 skills, interests, and academic performance
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    Algorithm Score: 94% Precision
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(
                    student.assessmentScores || {
                      technical: 90,
                      analytical: 85,
                      creative: 75,
                      social: 70,
                      management: 65
                    }
                  ).map(([trait, score]) => (
                    <div key={trait} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 capitalize">
                        {trait}
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 mt-1">{score}%</div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable Career Recommendations Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold font-heading text-slate-900">
                      Top Recommended Careers for You
                    </h2>
                    <p className="text-xs text-slate-500">
                      Ranked by algorithmic fit with your specific field inputs, ratings, and traits
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    {student.recommendedCareers.length} Suitable Matches
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {student.recommendedCareers.map((rec, index) => {
                    const isCurrentTarget = student.targetCareer === rec.title;

                    return (
                      <div
                        key={rec.id}
                        className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                          isCurrentTarget
                            ? 'bg-gradient-to-b from-indigo-50/40 via-white to-white border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                            : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {rec.industry}
                            </span>
                            <div className="flex items-center gap-1 font-bold text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                              <Sparkles className="w-3 h-3 text-indigo-600" />
                              <span>{rec.matchScore}% Match</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold font-heading text-slate-900">{rec.title}</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{rec.description}</p>

                          {/* Why relevant section - Explicit requirement */}
                          <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-800 mb-1 flex items-center gap-1">
                              <Target className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Why this is relevant to you</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">{rec.whyRelevant}</p>
                          </div>

                          {/* Compensation & Market Demand */}
                          <div className="mt-4 space-y-1.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Starting Package:</span>
                              </span>
                              <span className="font-bold text-slate-800">{rec.avgSalary}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                                <span>Hiring Demand:</span>
                              </span>
                              <span className="font-semibold text-emerald-600">{rec.demandLevel}</span>
                            </div>
                          </div>

                          {/* Top Companies Hiring */}
                          <div className="mt-4">
                            <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              <span>Top Companies Hiring:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {rec.topCompanies.map(comp => (
                                <span
                                  key={comp}
                                  className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                                >
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Required Core Skills */}
                          <div className="mt-4">
                            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Key Core Skills:</div>
                            <div className="flex flex-wrap gap-1">
                              {rec.requiredSkills.slice(0, 4).map(skill => (
                                <span
                                  key={skill}
                                  className="text-[10px] font-medium px-1.5 py-0.5 bg-indigo-50/70 border border-indigo-100 text-indigo-800 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                          {isCurrentTarget ? (
                            <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Current Target Career</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setTargetCareer(rec.title)}
                              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                            >
                              Select as My Target Career
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setTargetCareer(rec.title);
                              setActiveTab('skills');
                            }}
                            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Analyze Skill Gap</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MY ASSESSMENT PROFILE & SAVED FIELD RESPONSES */}
          {/* ========================================================================= */}
          {resultsTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Personal Information Review */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <User className="w-4 h-4 text-indigo-600" />
                      <span>1. Personal Information</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingAssessment(true);
                        setCurrentStep(0);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Student Name:</span>
                      <span className="font-bold text-slate-800">{personalInfo.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Age:</span>
                      <span className="font-bold text-slate-800">{personalInfo.age} Years</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Education Level:</span>
                      <span className="font-bold text-slate-800">{personalInfo.educationLevel}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Course / Stream:</span>
                      <span className="font-bold text-slate-800">{personalInfo.courseStream}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Interests Assessment Review */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <HeartHandshake className="w-4 h-4 text-rose-600" />
                      <span>2. Interests Ratings</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingAssessment(true);
                        setCurrentStep(1);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Enjoys Technology:</span>
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {interests.enjoyTechnology}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Likes Helping People:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {interests.likeHelpingPeople}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Enjoys Creative Work:</span>
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {interests.enjoyCreativeWork}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Prefers Business Activities:</span>
                      <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {interests.preferBusinessActivities}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Research & Data Analysis:</span>
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {interests.enjoyResearchAnalysis || 4}/5
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Skills Assessment Review */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>3. Skills (1–5 Scale)</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingAssessment(true);
                        setCurrentStep(2);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <div className="text-slate-500">Communication</div>
                      <div className="font-extrabold text-sm text-slate-800 mt-0.5">{skills.communication} / 5</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <div className="text-slate-500">Leadership</div>
                      <div className="font-extrabold text-sm text-slate-800 mt-0.5">{skills.leadership} / 5</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <div className="text-slate-500">Problem-solving</div>
                      <div className="font-extrabold text-sm text-slate-800 mt-0.5">{skills.problemSolving} / 5</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <div className="text-slate-500">Coding / Technical</div>
                      <div className="font-extrabold text-sm text-slate-800 mt-0.5">{skills.codingTechnical} / 5</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <div className="text-slate-500">Creativity</div>
                      <div className="font-extrabold text-sm text-slate-800 mt-0.5">{skills.creativity} / 5</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <div className="text-slate-500">Teamwork</div>
                      <div className="font-extrabold text-sm text-slate-800 mt-0.5">{skills.teamwork} / 5</div>
                    </div>
                  </div>
                </div>

                {/* 4. Personality Assessment Review */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span>4. Personality Continuum</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditingAssessment(true);
                        setCurrentStep(3);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between">
                      <span className="text-slate-500">Social Dimension:</span>
                      <span className="font-bold text-indigo-700 capitalize">{personality.introvertExtrovert}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between">
                      <span className="text-slate-500">Team vs Independent:</span>
                      <span className="font-bold text-indigo-700 capitalize">{personality.workStyle}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between">
                      <span className="text-slate-500">Thinking Mode:</span>
                      <span className="font-bold text-indigo-700 capitalize">{personality.thinkingStyle}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between">
                      <span className="text-slate-500">Risk vs Cautious:</span>
                      <span className="font-bold text-indigo-700 capitalize">{personality.decisionStyle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Academic Strengths Review */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>5. Academic Strengths & Achievements</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingAssessment(true);
                      setCurrentStep(4);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="font-semibold text-slate-600 mb-1.5">Favorite Subjects:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {favoriteSubjects.map(sub => (
                        <span
                          key={sub}
                          className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-lg font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-600 mb-1.5">Best-Performing Subjects:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {bestPerformingSubjects.map(sub => (
                        <span
                          key={sub}
                          className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-600 mb-1">Previous Achievements:</div>
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                      {previousAchievements || 'No previous achievements recorded yet.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
