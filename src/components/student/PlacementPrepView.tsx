import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  mockAptitudeQuestions,
  mockTechnicalQuestions,
  mockHRQuestions
} from '../../data/mockData';
import { ResumeDetails } from '../../types';
import confetti from 'canvas-confetti';
import {
  FileText,
  Award,
  CheckCircle2,
  Clock,
  Code2,
  MessageSquare,
  HelpCircle,
  Play,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  TrendingUp,
  Check,
  Layout,
  UserCheck
} from 'lucide-react';

export const PlacementPrepView: React.FC = () => {
  const { student, updateResumeData, updateStudentProfile, showToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'aptitude' | 'technical' | 'hr' | 'mock_interview'>('resume');

  // Resume builder state
  const [resume, setResume] = useState<ResumeDetails>(student.resumeData);
  const [resumeTemplate, setResumeTemplate] = useState<'modern' | 'minimal' | 'executive'>(student.resumeData.template || 'modern');

  // Aptitude practice test state
  const [currentAptitudeIdx, setCurrentAptitudeIdx] = useState(0);
  const [aptitudeAnswers, setAptitudeAnswers] = useState<Record<number, number>>({});
  const [isAptitudeSubmitted, setIsAptitudeSubmitted] = useState(false);
  const [aptitudeTimerSeconds, setAptitudeTimerSeconds] = useState(300); // 5 min timer
  const [isAptitudeActive, setIsAptitudeActive] = useState(false);

  // Technical interview state
  const [selectedTechTopic, setSelectedTechTopic] = useState<string>('All');
  const [expandedTechQuestions, setExpandedTechQuestions] = useState<Record<number, boolean>>({ 1: true });

  // HR interview state
  const [expandedHRQuestions, setExpandedHRQuestions] = useState<Record<number, boolean>>({ 1: true });

  // Mock interview simulator state
  const [mockStep, setMockStep] = useState(0);
  const [mockSessionActive, setMockSessionActive] = useState(false);
  const [mockUserNotes, setMockUserNotes] = useState('');
  const [mockConfidenceScore, setMockConfidenceScore] = useState(4);

  const mockQuestions = [
    {
      q: 'Tell me about yourself and your proudest technical project.',
      type: 'Introduction & Project',
      idealDuration: '2 minutes'
    },
    {
      q: 'How would you design a rate limiter for an API with high concurrent requests?',
      type: 'Technical & System Design',
      idealDuration: '3 minutes'
    },
    {
      q: 'Describe a situation where you had a disagreement with a team member. How did you resolve it?',
      type: 'Behavioral & Leadership',
      idealDuration: '2 minutes'
    },
    {
      q: 'Why do you want to join our engineering team over other offers?',
      type: 'Company Alignment & Culture',
      idealDuration: '1.5 minutes'
    }
  ];

  // Aptitude timer
  useEffect(() => {
    let interval: any;
    if (isAptitudeActive && !isAptitudeSubmitted && aptitudeTimerSeconds > 0) {
      interval = setInterval(() => {
        setAptitudeTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (aptitudeTimerSeconds === 0 && isAptitudeActive && !isAptitudeSubmitted) {
      handleAptitudeSubmit();
    }
    return () => clearInterval(interval);
  }, [isAptitudeActive, isAptitudeSubmitted, aptitudeTimerSeconds]);

  const handleAptitudeSubmit = () => {
    setIsAptitudeSubmitted(true);
    let correctCount = 0;
    mockAptitudeQuestions.forEach(q => {
      if (aptitudeAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / mockAptitudeQuestions.length) * 100);
    const updatedReadiness = {
      ...student.placementReadiness,
      aptitudeScore: Math.max(student.placementReadiness.aptitudeScore, scorePct),
      completedMockInterviews: student.placementReadiness.completedMockInterviews + 1,
      overall: Math.round(
        (Math.max(student.placementReadiness.aptitudeScore, scorePct) +
          student.placementReadiness.technicalScore +
          student.placementReadiness.hrScore +
          student.placementReadiness.resumeScore) / 4
      )
    };

    updateStudentProfile({ placementReadiness: updatedReadiness });
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {}
    showToast(`Aptitude Quiz Completed! Score: ${correctCount}/${mockAptitudeQuestions.length} (${scorePct}%)`, 'success');
  };

  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();
    updateResumeData({ ...resume, template: resumeTemplate });
  };

  const toggleTech = (id: number) => {
    setExpandedTechQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHR = (id: number) => {
    setExpandedHRQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMockNext = () => {
    if (mockStep < mockQuestions.length - 1) {
      setMockStep(prev => prev + 1);
      setMockUserNotes('');
    } else {
      setMockSessionActive(false);
      setMockStep(0);
      const newReadiness = {
        ...student.placementReadiness,
        hrScore: Math.min(94, student.placementReadiness.hrScore + 6),
        technicalScore: Math.min(96, student.placementReadiness.technicalScore + 5),
        completedMockInterviews: student.placementReadiness.completedMockInterviews + 1,
        overall: Math.min(96, student.placementReadiness.overall + 4)
      };
      updateStudentProfile({ placementReadiness: newReadiness });
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch {}
      showToast('Mock Interview finished! Placement readiness score increased.', 'success');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Overall Placement Readiness Score */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Campus Placement Readiness Hub</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Placement Preparation Suite</h1>
          <p className="text-sm text-slate-600 mt-1">
            Build ATS-optimized resumes, practice timed aptitude drills, master technical coding concepts, and simulate mock interviews.
          </p>
        </div>

        {/* Big Placement Score Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-md">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" className="text-slate-800" fill="transparent" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 * (1 - student.placementReadiness.overall / 100)}
                className="text-amber-400 transition-all duration-700 stroke-round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-white">{student.placementReadiness.overall}%</span>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300">Preparation Progress Score</div>
            <div className="text-base font-bold text-white">Placement Ready</div>
            <div className="text-xs text-slate-400">4 Modules Evaluated</div>
          </div>
        </div>
      </div>

      {/* Readiness Vectors Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveSubTab('aptitude')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === 'aptitude' ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-300/30' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-bold text-slate-500 uppercase">Aptitude Practice</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{student.placementReadiness.aptitudeScore}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${student.placementReadiness.aptitudeScore}%` }} />
          </div>
        </div>

        <div
          onClick={() => setActiveSubTab('technical')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === 'technical' ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-300/30' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-bold text-slate-500 uppercase">Technical Practice</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{student.placementReadiness.technicalScore}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${student.placementReadiness.technicalScore}%` }} />
          </div>
        </div>

        <div
          onClick={() => setActiveSubTab('hr')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === 'hr' ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-300/30' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-bold text-slate-500 uppercase">HR & STAR Questions</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{student.placementReadiness.hrScore}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${student.placementReadiness.hrScore}%` }} />
          </div>
        </div>

        <div
          onClick={() => setActiveSubTab('resume')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === 'resume' ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-300/30' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-bold text-slate-500 uppercase">Resume Builder</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{student.placementReadiness.resumeScore}% ATS Score</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${student.placementReadiness.resumeScore}%` }} />
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'resume', label: '1. Resume Builder & Templates' },
          { key: 'aptitude', label: '2. Timed Aptitude Test' },
          { key: 'technical', label: '3. Technical Interview Bank' },
          { key: 'hr', label: '4. HR & STAR Behavioral Practice' },
          { key: 'mock_interview', label: '5. Mock Interview Simulator' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSubTab(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSubTab === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Resume Builder Tab */}
      {activeSubTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Editable Fields */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold font-heading text-slate-900">Interactive Resume Editor</h2>
                <p className="text-xs text-slate-500">Updates live in the preview pane</p>
              </div>

              {/* Template switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(['modern', 'minimal', 'executive'] as const).map(tmpl => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => setResumeTemplate(tmpl)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                      resumeTemplate === tmpl ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveResume} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resume.fullName}
                    onChange={e => setResume({ ...resume, fullName: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={resume.email}
                    onChange={e => setResume({ ...resume, email: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Phone</label>
                  <input
                    type="text"
                    value={resume.phone}
                    onChange={e => setResume({ ...resume, phone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Location</label>
                  <input
                    type="text"
                    value={resume.location}
                    onChange={e => setResume({ ...resume, location: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Professional Summary</label>
                <textarea
                  rows={3}
                  value={resume.summary}
                  onChange={e => setResume({ ...resume, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Skills (Comma Separated)
                </label>
                <input
                  type="text"
                  value={resume.skills.join(', ')}
                  onChange={e => setResume({ ...resume, skills: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ATS Score: 92% (High Format Compatibility)
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Save & Update Resume
                </button>
              </div>
            </form>
          </div>

          {/* Right Preview: Formatted Resume Sheet */}
          <div className="lg:col-span-6 bg-slate-100 rounded-2xl p-4 sm:p-6 border border-slate-200 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Document Preview</span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* Resume Sheet */}
            <div
              className={`w-full bg-white rounded-xl shadow-md p-6 sm:p-8 text-slate-900 border border-slate-200 text-left font-sans text-xs ${
                resumeTemplate === 'minimal' ? 'border-t-4 border-t-slate-800' : resumeTemplate === 'executive' ? 'border-t-4 border-t-emerald-800' : 'border-t-4 border-t-indigo-600'
              }`}
            >
              {/* Header */}
              <div className="border-b pb-3 mb-3">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{resume.fullName}</h1>
                <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-2">
                  <span>{resume.email}</span>
                  <span>•</span>
                  <span>{resume.phone}</span>
                  <span>•</span>
                  <span>{resume.location}</span>
                </div>
                <div className="text-[10px] text-indigo-700 mt-1 flex gap-3">
                  <span>{resume.github}</span>
                  <span>{resume.linkedin}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-0.5">Professional Summary</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{resume.summary}</p>
              </div>

              {/* Education */}
              <div className="mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Education</h3>
                {resume.education.map((edu, idx) => (
                  <div key={idx} className="mb-1 text-[11px]">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{edu.institution}</span>
                      <span className="text-slate-500 font-normal">{edu.year}</span>
                    </div>
                    <div className="text-slate-600 flex justify-between">
                      <span>{edu.degree} - {edu.field}</span>
                      <span className="font-semibold text-slate-700">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div className="mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Experience</h3>
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="mb-2 text-[11px]">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-500 font-normal">{exp.duration}</span>
                    </div>
                    <ul className="list-disc list-inside mt-0.5 text-slate-600 space-y-0.5">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Key Projects</h3>
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="mb-1.5 text-[11px]">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{proj.title}</span>
                      <span className="text-indigo-600 font-normal text-[10px]">{proj.link}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Technologies: {proj.tech}</div>
                    <p className="text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>

              {/* Skills & Certifications */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Skills & Certifications</h3>
                <div className="text-[11px] text-slate-700">
                  <strong>Technical:</strong> {resume.skills.join(', ')}
                </div>
                <div className="text-[11px] text-slate-700 mt-1">
                  <strong>Certifications:</strong> {resume.certifications.join(' • ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Aptitude Practice Tab */}
      {activeSubTab === 'aptitude' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Company Placement Drill</span>
              <h2 className="text-lg font-bold font-heading text-slate-900">Quantitative & Logical Aptitude Test</h2>
              <p className="text-xs text-slate-500">Timed simulation modeled after Amazon, TCS Digital, and Cognizant rounds</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {Math.floor(aptitudeTimerSeconds / 60)}:{(aptitudeTimerSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {!isAptitudeActive && !isAptitudeSubmitted && (
                <button
                  onClick={() => setIsAptitudeActive(true)}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Start Timer
                </button>
              )}
            </div>
          </div>

          {/* Question View */}
          <div className="my-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-indigo-700 uppercase tracking-wider">
                Category: {mockAptitudeQuestions[currentAptitudeIdx].category}
              </span>
              <span>Question {currentAptitudeIdx + 1} of {mockAptitudeQuestions.length}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-4">
              {mockAptitudeQuestions[currentAptitudeIdx].question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {mockAptitudeQuestions[currentAptitudeIdx].options.map((opt, optIdx) => {
                const isSelected = aptitudeAnswers[mockAptitudeQuestions[currentAptitudeIdx].id] === optIdx;
                const isCorrect = mockAptitudeQuestions[currentAptitudeIdx].correctAnswer === optIdx;

                let optClass = 'bg-slate-50 border-slate-200 hover:bg-slate-100';
                if (isSelected) optClass = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold';
                if (isAptitudeSubmitted) {
                  if (isCorrect) optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  else if (isSelected && !isCorrect) optClass = 'bg-rose-50 border-rose-400 text-rose-900';
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAptitudeSubmitted}
                    onClick={() => {
                      if (!isAptitudeActive) setIsAptitudeActive(true);
                      setAptitudeAnswers({ ...aptitudeAnswers, [mockAptitudeQuestions[currentAptitudeIdx].id]: optIdx });
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {isAptitudeSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isAptitudeSubmitted && (
              <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-indigo-700">Detailed Solution:</span>
                <p className="text-slate-700 mt-1">{mockAptitudeQuestions[currentAptitudeIdx].explanation}</p>
              </div>
            )}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentAptitudeIdx(prev => Math.max(0, prev - 1))}
              disabled={currentAptitudeIdx === 0}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentAptitudeIdx < mockAptitudeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentAptitudeIdx(prev => prev + 1)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Next Question
                </button>
              ) : (
                !isAptitudeSubmitted && (
                  <button
                    onClick={handleAptitudeSubmit}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                  >
                    Submit Test
                  </button>
                )
              )}

              {isAptitudeSubmitted && (
                <button
                  onClick={() => {
                    setAptitudeAnswers({});
                    setIsAptitudeSubmitted(false);
                    setAptitudeTimerSeconds(300);
                    setCurrentAptitudeIdx(0);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Retry Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Technical Interview Practice Tab */}
      {activeSubTab === 'technical' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-heading text-slate-900">Technical Interview Practice Bank</h2>
              <p className="text-xs text-slate-500">Top recurring engineering problems with code solutions</p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Data Structures', 'Web Development', 'Databases & SQL', 'System Design'].map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTechTopic(topic)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedTechTopic === topic ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-3">
            {mockTechnicalQuestions
              .filter(q => selectedTechTopic === 'All' || q.topic === selectedTechTopic)
              .map(q => {
                const isExpanded = expandedTechQuestions[q.id];
                const diffBadge = {
                  Easy: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  Medium: 'bg-amber-50 text-amber-800 border-amber-200',
                  Hard: 'bg-rose-50 text-rose-800 border-rose-200'
                }[q.difficulty];

                return (
                  <div key={q.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                    <button
                      onClick={() => toggleTech(q.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {q.topic}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${diffBadge}`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900">{q.question}</h3>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-0 border-t border-slate-100 text-xs space-y-3 mt-2">
                        <div>
                          <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Explanation & Architecture</span>
                          <p className="text-slate-700 mt-1 leading-relaxed">{q.answer}</p>
                        </div>

                        <div>
                          <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Key Answer Points</span>
                          <ul className="list-disc list-inside mt-1 text-slate-600 space-y-1">
                            {q.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        </div>

                        {q.codeSnippet && (
                          <div>
                            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Reference Code Implementation</span>
                            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto mt-1">
                              {q.codeSnippet}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 4. HR Interview Practice Tab */}
      {activeSubTab === 'hr' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h2 className="text-base font-bold font-heading text-slate-900">HR & Behavioral Interview Mastery (STAR Method)</h2>
            <p className="text-xs text-slate-500 mt-1">
              Recruiters look for Structured Situation, Task, Action, Result responses. Review model answers below.
            </p>
          </div>

          <div className="space-y-3">
            {mockHRQuestions.map(hr => {
              const isExpanded = expandedHRQuestions[hr.id];

              return (
                <div key={hr.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleHR(hr.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {hr.category} Round
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{hr.question}</h3>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-100 text-xs space-y-3 mt-2">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="font-bold text-indigo-700 text-[10px] uppercase tracking-wider">Model Exemplary Response:</span>
                        <p className="text-slate-700 mt-1 leading-relaxed">{hr.sampleAnswer}</p>
                      </div>

                      {hr.starBreakdown && (
                        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                          <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">STAR Breakdown Applied:</span>
                          <div className="text-emerald-950"><strong>S (Situation):</strong> {hr.starBreakdown.situation}</div>
                          <div className="text-emerald-950"><strong>T (Task):</strong> {hr.starBreakdown.task}</div>
                          <div className="text-emerald-950"><strong>A (Action):</strong> {hr.starBreakdown.action}</div>
                          <div className="text-emerald-950"><strong>R (Result):</strong> {hr.starBreakdown.result}</div>
                        </div>
                      )}

                      <div>
                        <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Recruiter Evaluation Tips:</span>
                        <ul className="list-disc list-inside mt-1 text-slate-600 space-y-0.5">
                          {hr.tips.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Mock Interview Simulator Tab */}
      {activeSubTab === 'mock_interview' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-2xl mx-auto">
          {!mockSessionActive ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center shadow-inner">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">Interactive Mock Interview Simulator</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Practice answering live interview questions under timed simulation. Receive instant feedback and elevate your placement readiness score.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="font-bold text-slate-800">Session Structure:</div>
                <div className="text-slate-600">✓ 4 Questions: Intro, System Design, Behavioral, Culture fit</div>
                <div className="text-slate-600">✓ Self-evaluation & talking-points scratchpad</div>
                <div className="text-slate-600">✓ Real-time readiness score calculation upon completion</div>
              </div>

              <button
                onClick={() => setMockSessionActive(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>Start Mock Interview</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="font-bold uppercase tracking-wider text-indigo-700">
                  {mockQuestions[mockStep].type}
                </span>
                <span>Question {mockStep + 1} of {mockQuestions.length}</span>
              </div>

              {/* Question */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                <div className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">Interviewer asks:</div>
                <h3 className="text-lg font-bold font-heading text-indigo-950 mt-1">
                  "{mockQuestions[mockStep].q}"
                </h3>
                <div className="text-[11px] text-indigo-600 mt-2">Recommended duration: {mockQuestions[mockStep].idealDuration}</div>
              </div>

              {/* Speaking scratchpad */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Answer Notes / Key Talking Points
                </label>
                <textarea
                  rows={4}
                  value={mockUserNotes}
                  onChange={e => setMockUserNotes(e.target.value)}
                  placeholder="Draft your bullet points or speak your answer out loud..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Self-Rating */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Self Confidence Rating for this Answer:</span>
                  <span className="text-indigo-600 font-bold">{mockConfidenceScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={mockConfidenceScore}
                  onChange={e => setMockConfidenceScore(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setMockSessionActive(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Quit Session
                </button>
                <button
                  onClick={handleMockNext}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  {mockStep === mockQuestions.length - 1 ? 'Finish & Generate Score' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
