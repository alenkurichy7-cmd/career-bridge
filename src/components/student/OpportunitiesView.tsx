import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity, Application } from '../../types';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  FileText,
  DollarSign,
  Users,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { student, opportunities, applications, applyToOpportunity } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'internship' | 'job' | 'college_project' | 'industry_project' | 'hackathon' | 'workshop' | 'my_apps'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [applyingOpportunity, setApplyingOpportunity] = useState<Opportunity | null>(null);
  const [coverNote, setCoverNote] = useState('');

  // Fields filter options
  const fields = ['All', 'Software Engineering', 'Full Stack Engineering', 'IoT & Embedded Systems', 'Financial Engineering', 'AI / Software Innovation', 'Technical Interview Prep'];
  const workModes = ['All', 'Remote', 'On-site', 'Hybrid'];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesType = activeTab === 'all' || opp.type === activeTab;
    const matchesField = selectedField === 'All' || opp.field === selectedField;
    const matchesMode = selectedWorkMode === 'All' || opp.workMode === selectedWorkMode;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.companyOrOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesField && matchesMode;
  });

  // Calculate match percentage with student skills
  const calculateMatchScore = (skillsRequired: string[]) => {
    if (!skillsRequired.length) return 75;
    const studentSkillNames = student.skills.map(s => s.name.toLowerCase());
    let matchCount = 0;
    skillsRequired.forEach(req => {
      if (studentSkillNames.some(sn => sn.includes(req.toLowerCase()) || req.toLowerCase().includes(sn))) {
        matchCount++;
      }
    });
    return Math.min(98, Math.max(65, Math.round((matchCount / skillsRequired.length) * 100)));
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingOpportunity) return;
    applyToOpportunity(applyingOpportunity.id, coverNote);
    setApplyingOpportunity(null);
    setCoverNote('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Placement & Experiential Bridge</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Opportunities & Placement Matching</h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse verified college projects, industry apprenticeships, internships, hackathons, and placement drives.
          </p>
        </div>

        {/* My Applications Quick Tab */}
        <button
          onClick={() => setActiveTab('my_apps')}
          className={`self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'my_apps'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>My Applications ({applications.length})</span>
        </button>
      </div>

      {/* Segment Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'all', label: 'All Opportunities' },
          { key: 'internship', label: 'Internships' },
          { key: 'job', label: 'Full-Time Jobs' },
          { key: 'college_project', label: 'College Projects' },
          { key: 'industry_project', label: 'Industry Projects' },
          { key: 'hackathon', label: 'Hackathons' },
          { key: 'workshop', label: 'Workshops' },
          { key: 'my_apps', label: `My Applications (${applications.length})` }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* If viewing My Applications */}
      {activeTab === 'my_apps' ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900">My Application Tracking</h2>
              <p className="text-xs text-slate-500">Live status updates from placement officers and recruiters</p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {applications.length} Submitted
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">You haven't applied to any opportunities yet.</p>
              <button
                onClick={() => setActiveTab('all')}
                className="mt-3 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Browse opportunities
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map(app => {
                const statusStyles = {
                  Applied: 'bg-slate-100 text-slate-700 border-slate-200',
                  Reviewing: 'bg-sky-50 text-sky-700 border-sky-200',
                  Shortlisted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                  Interview: 'bg-amber-50 text-amber-800 border-amber-200',
                  Offered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  Rejected: 'bg-rose-50 text-rose-700 border-rose-200'
                };

                return (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{app.opportunityType}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500">Applied: {app.appliedAt}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mt-1">{app.opportunityTitle}</h3>
                      <div className="text-xs font-semibold text-slate-700 mt-0.5">{app.companyName}</div>

                      {app.feedback && (
                        <div className="mt-2 text-xs bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-700 flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>Recruiter Note: {app.feedback}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyles[app.status]}`}>
                        Status: {app.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Standard Opportunity Listings View with Filters */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by title, company, skills, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Field filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold">Field:</span>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 focus:outline-none cursor-pointer"
              >
                {fields.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Work mode filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold">Mode:</span>
              <select
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 focus:outline-none cursor-pointer"
              >
                {workModes.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Opportunities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredOpportunities.map(opp => {
              const matchScore = calculateMatchScore(opp.skillsRequired);
              const alreadyApplied = applications.some(a => a.opportunityId === opp.id && a.studentId === student.id);

              const typeBadgeColors = {
                internship: 'bg-sky-50 text-sky-800 border-sky-200',
                job: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                college_project: 'bg-purple-50 text-purple-800 border-purple-200',
                industry_project: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                hackathon: 'bg-amber-50 text-amber-800 border-amber-200',
                workshop: 'bg-teal-50 text-teal-800 border-teal-200'
              };

              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Type & Match Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${typeBadgeColors[opp.type]}`}>
                        {opp.type.replace('_', ' ')}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>{matchScore}% Profile Match</span>
                      </div>
                    </div>

                    {/* Title & Company */}
                    <h3 className="font-bold text-base text-slate-900 leading-snug">{opp.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mt-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.companyOrOrg}</span>
                    </div>

                    {/* Metadata Row */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{opp.location} ({opp.workMode})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-emerald-800 truncate">{opp.stipendOrSalary}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{opp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{opp.applicantsCount} Applicants</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Required Skills */}
                    <div className="mt-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Required Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {opp.skillsRequired.map(sk => {
                          const studentHasSkill = student.skills.some(s => s.name.toLowerCase().includes(sk.toLowerCase()));
                          return (
                            <span
                              key={sk}
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                                studentHasSkill
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-slate-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              {studentHasSkill ? '✓ ' : ''}{sk}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer & Apply Action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-400">
                      Deadline: <strong className="text-slate-600">{opp.deadline}</strong>
                    </div>

                    {alreadyApplied ? (
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setApplyingOpportunity(opp)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Application Submission Modal */}
      {applyingOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Application Form</span>
                <h2 className="text-lg font-bold font-heading text-slate-900">{applyingOpportunity.title}</h2>
                <p className="text-xs text-slate-500">{applyingOpportunity.companyOrOrg}</p>
              </div>
              <button
                onClick={() => setApplyingOpportunity(null)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 mt-4">
              {/* Pre-populated Candidate Summary */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 text-xs space-y-1">
                <div className="font-bold text-slate-800">Candidate Details (Auto-attached from Profile):</div>
                <div className="text-slate-600">{student.name} • {student.email} • {student.phone}</div>
                <div className="text-slate-600">{student.college} • {student.course} ({student.department}) • CGPA: {student.cgpa}</div>
                <div className="text-slate-600">Target Career: {student.targetCareer}</div>
              </div>

              {/* Resume Attached */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Attached Resume
                </label>
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Rahul_Sharma_Resume_2026.pdf</div>
                      <div className="text-[10px] text-slate-400">ATS Score: 92% • Updated Today</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Verified</span>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Cover Note / Why You are a Great Fit
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Share a short note about your relevant projects, hackathons, or why you are eager to contribute..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplyingOpportunity(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
