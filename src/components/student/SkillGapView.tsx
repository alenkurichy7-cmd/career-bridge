import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { careerPathsDatabase } from '../../data/mockData';
import {
  BarChart3,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Layers,
  Award
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { student, getSkillGapForCareer, setTargetCareer, addSkill, enrollInCourse, setActiveTab } = useApp();

  const [selectedCareer, setSelectedCareer] = useState<string>(student.targetCareer || 'Full Stack Software Engineer');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(3);
  const [newSkillCategory, setNewSkillCategory] = useState<'Technical' | 'Soft' | 'Core' | 'Tool'>('Technical');

  const gapAnalysis = getSkillGapForCareer(selectedCareer);

  const proficientSkills = gapAnalysis.skillsBreakdown.filter(s => s.status === 'proficient');
  const developingSkills = gapAnalysis.skillsBreakdown.filter(s => s.status === 'developing');
  const missingSkills = gapAnalysis.skillsBreakdown.filter(s => s.status === 'missing');

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCategory
    });
    setNewSkillName('');
    setShowAddSkillModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Career Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Benchmark vs. Industry Standards</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Skill Gap Analysis</h1>
          <p className="text-sm text-slate-600 mt-1">
            Analyzing your academic and project skills against recruiter expectations for <span className="font-bold text-slate-900">{selectedCareer}</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Target Career Path:</label>
            <select
              value={selectedCareer}
              onChange={(e) => {
                setSelectedCareer(e.target.value);
                setTargetCareer(e.target.value);
              }}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
            >
              {Object.keys(careerPathsDatabase).map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddSkillModal(true)}
            className="self-end inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Main Readiness Gauge & Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Readiness Gauge */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center md:col-span-1">
          <div className="relative w-28 h-28 flex items-center justify-center mb-2">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-100"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - gapAnalysis.overallMatchPercentage / 100)}
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-slate-900">{gapAnalysis.overallMatchPercentage}%</span>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Acquired</div>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-800">Skill Preparedness</div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {100 - gapAnalysis.overallMatchPercentage}% gap to target benchmark
          </p>
        </div>

        {/* 1. Proficient Skills */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Proficient Skills</span>
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                {proficientSkills.length}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-950 mt-2">{proficientSkills.length} Verified</div>
            <p className="text-xs text-emerald-800 mt-1">Meets or exceeds target requirements for {selectedCareer}.</p>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {proficientSkills.slice(0, 3).map(s => (
              <span key={s.name} className="text-[10px] font-bold px-2 py-0.5 bg-white text-emerald-800 rounded-md border border-emerald-200">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Developing Skills */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Developing Skills</span>
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">
                {developingSkills.length}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-amber-950 mt-2">{developingSkills.length} In Progress</div>
            <p className="text-xs text-amber-800 mt-1">Learned foundational concepts; requires project practice.</p>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {developingSkills.slice(0, 3).map(s => (
              <span key={s.name} className="text-[10px] font-bold px-2 py-0.5 bg-white text-amber-800 rounded-md border border-amber-200">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Missing Skills */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Missing Skills</span>
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                {missingSkills.length}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-rose-950 mt-2">{missingSkills.length} Critical Gaps</div>
            <p className="text-xs text-rose-800 mt-1">Recommended to complete specific coursework before placement drives.</p>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {missingSkills.slice(0, 3).map(s => (
              <span key={s.name} className="text-[10px] font-bold px-2 py-0.5 bg-white text-rose-800 rounded-md border border-rose-200">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Skill Comparison Matrix */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold font-heading text-slate-900">Required Skills vs. Your Current Proficiency</h2>
            <p className="text-xs text-slate-500">Visual comparison against placement benchmarks with direct course bridges</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> Your Level
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" /> Required Benchmark
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {gapAnalysis.skillsBreakdown.map((item) => {
            const statusStyles = {
              proficient: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', text: 'Proficient' },
              developing: { badge: 'bg-amber-50 text-amber-800 border-amber-200', text: 'Developing' },
              missing: { badge: 'bg-rose-50 text-rose-800 border-rose-200', text: 'Missing Gap' }
            };

            const style = statusStyles[item.status];

            return (
              <div key={item.name} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Skill Name & Category */}
                <div className="w-full lg:w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {style.text}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Category: {item.category}</div>
                </div>

                {/* Comparative Progress Bars */}
                <div className="w-full lg:w-1/3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">Current: {item.studentProficiency}%</span>
                    <span className="text-slate-400">Target: {item.requiredProficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 relative overflow-hidden">
                    {/* Target marker */}
                    <div
                      className="absolute top-0 bottom-0 bg-slate-300 rounded-full"
                      style={{ width: `${item.requiredProficiency}%` }}
                    />
                    {/* Student progress */}
                    <div
                      className={`h-full rounded-full transition-all duration-700 relative z-10 ${
                        item.status === 'proficient' ? 'bg-emerald-500' : item.status === 'developing' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${item.studentProficiency}%` }}
                    />
                  </div>
                </div>

                {/* Course Bridge Recommendation */}
                <div className="w-full lg:w-1/3 flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0">
                  {item.recommendedCourseTitle ? (
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] uppercase font-bold text-indigo-700">Recommended Course</div>
                        <div className="text-xs font-semibold text-slate-800 line-clamp-1 max-w-[200px]">
                          {item.recommendedCourseTitle}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (item.recommendedCourseId) {
                            enrollInCourse(item.recommendedCourseId);
                          }
                          setActiveTab('courses');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition-colors cursor-pointer shrink-0"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Learn Skill</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Ready for Assessment
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Skill to Profile</h3>
              <button
                onClick={() => setShowAddSkillModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSkillSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Docker, Python, PostgreSQL, System Design"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="Technical">Technical</option>
                  <option value="Tool">Tool / DevOps</option>
                  <option value="Core">Core Computer Science / Math</option>
                  <option value="Soft">Soft Skills / Communication</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  <span>Proficiency Level</span>
                  <span className="text-indigo-600 font-bold">{newSkillLevel * 20}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Beginner (20%)</span>
                  <span>Intermediate (60%)</span>
                  <span>Expert (100%)</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
