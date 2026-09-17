import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity, Application } from '../../types';
import {
  Building2,
  Briefcase,
  Users,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const {
    employer,
    opportunities,
    applications,
    createOpportunity,
    updateApplicationStatus,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'applicants' | 'postings'>('applicants');
  const [searchQuery, setSearchQuery] = useState('');
  const [minCgpaFilter, setMinCgpaFilter] = useState<number>(7.0);
  const [minReadinessFilter, setMinReadinessFilter] = useState<number>(70);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Job Posting Modal State
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    type: 'internship' as const,
    field: 'Software Engineering',
    location: 'Bangalore, India',
    workMode: 'Hybrid' as const,
    duration: '6 Months',
    stipendOrSalary: '₹45,000 / month',
    skillsRequired: 'React, Node.js, TypeScript',
    description: '',
    deadline: 'April 30, 2026'
  });

  // Schedule Interview Modal State
  const [schedulingApp, setSchedulingApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-04-10');
  const [interviewTime, setInterviewTime] = useState('14:00');
  const [interviewType, setInterviewType] = useState('Technical Coding Round');

  // Filter employer's own postings
  const myPostings = opportunities.filter(o => o.companyOrOrg === employer.companyName);

  // Filter candidates applying to my company
  const candidateApps = applications.filter(app => app.companyName === employer.companyName);

  const filteredCandidates = candidateApps.filter(app => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.opportunityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentCollege.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title) return;
    createOpportunity({
      title: newPost.title,
      companyOrOrg: employer.companyName,
      type: newPost.type,
      field: newPost.field,
      location: newPost.location,
      workMode: newPost.workMode,
      duration: newPost.duration,
      stipendOrSalary: newPost.stipendOrSalary,
      skillsRequired: newPost.skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
      description: newPost.description,
      deadline: newPost.deadline,
      applicantsCount: 0
    });
    setShowPostModal(false);
    setNewPost({
      title: '',
      type: 'internship',
      field: 'Software Engineering',
      location: 'Bangalore, India',
      workMode: 'Hybrid',
      duration: '6 Months',
      stipendOrSalary: '₹45,000 / month',
      skillsRequired: 'React, Node.js, TypeScript',
      description: '',
      deadline: 'April 30, 2026'
    });
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingApp) return;
    updateApplicationStatus(
      schedulingApp.id,
      'Interview',
      `Interview scheduled on ${interviewDate} at ${interviewTime} (${interviewType}). Meeting link shared to student email.`
    );
    setSchedulingApp(null);
    showToast(`Interview scheduled with ${schedulingApp.studentName}!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Recruiter Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={employer.logo}
            alt={employer.companyName}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs bg-slate-50"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Campus Talent Acquisition Portal</span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">{employer.companyName}</h1>
            <p className="text-xs text-slate-500">
              {employer.industry} • {employer.location} • Recruiter: {employer.recruiterName} ({employer.recruiterEmail})
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job / Internship</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Postings</div>
          <div className="text-2xl font-black text-slate-900 mt-2">{myPostings.length}</div>
          <div className="text-xs text-slate-500 mt-0.5">Live campus drives</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Applicants</div>
          <div className="text-2xl font-black text-indigo-700 mt-2">{candidateApps.length}</div>
          <div className="text-xs text-slate-500 mt-0.5">Verified college profiles</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Interviews Scheduled</div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {candidateApps.filter(a => a.status === 'Interview').length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Active interview rounds</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Offers Extended</div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {candidateApps.filter(a => a.status === 'Offered').length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Candidates selected</div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'applicants' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Candidate Pipeline ({candidateApps.length})
        </button>
        <button
          onClick={() => setActiveTab('postings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'postings' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          My Posted Roles ({myPostings.length})
        </button>
      </div>

      {/* 1. Candidate Pipeline View */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold font-heading text-slate-900">Applicant Tracking & Screening</h2>
              <p className="text-xs text-slate-500">Filter students by CGPA, Readiness Score, and College</p>
            </div>
          </div>

          {/* Filtering Toolbar */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 flex flex-wrap items-center gap-3 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidate, role, or college..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold">Stage:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All Stages</option>
                <option value="Applied">Applied</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Applicants Table */}
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No candidates match your current filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">College & Dept</th>
                    <th className="py-3 px-4">Applied Role</th>
                    <th className="py-3 px-4">Applied On</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Recruiter Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map(app => {
                    const statusColors = {
                      Applied: 'bg-slate-100 text-slate-700 border-slate-200',
                      Reviewing: 'bg-sky-50 text-sky-700 border-sky-200',
                      Shortlisted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                      Interview: 'bg-amber-50 text-amber-800 border-amber-200',
                      Offered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                      Rejected: 'bg-rose-50 text-rose-700 border-rose-200'
                    }[app.status] || 'bg-slate-100 text-slate-700 border-slate-200';

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{app.studentName}</div>
                          <div className="text-[10px] text-slate-400">{app.studentEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{app.studentCollege}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{app.opportunityTitle}</div>
                          <div className="text-[10px] text-slate-400 capitalize">{app.opportunityType}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{app.appliedAt}</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors}`}>
                            {app.status}
                          </span>
                          {app.feedback && (
                            <div className="text-[10px] text-slate-500 mt-1 line-clamp-1 max-w-[180px]">
                              {app.feedback}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {app.status !== 'Shortlisted' && app.status !== 'Interview' && app.status !== 'Offered' && (
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'Shortlisted', 'Profile screened and shortlisted by technical team.')}
                                className="px-2 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Shortlist
                              </button>
                            )}

                            {app.status !== 'Interview' && app.status !== 'Offered' && (
                              <button
                                onClick={() => setSchedulingApp(app)}
                                className="px-2 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Schedule Interview
                              </button>
                            )}

                            {app.status !== 'Offered' && (
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'Offered', 'Congratulations! Placement offer letter released with verified package details.')}
                                className="px-2 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Offer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 2. My Postings View */}
      {activeTab === 'postings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-slate-900">Active Job & Internship Listings</h2>
            <button
              onClick={() => setShowPostModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Listing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myPostings.map(opp => (
              <div key={opp.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {opp.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                      {opp.applicantsCount} Applicants
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{opp.title}</h3>
                  <div className="text-xs text-slate-500 mt-1">{opp.location} • {opp.workMode} • {opp.stipendOrSalary}</div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{opp.description}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {opp.skillsRequired.map(sk => (
                      <span key={sk} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Deadline: {opp.deadline}</span>
                  <button
                    onClick={() => setActiveTab('applicants')}
                    className="text-indigo-600 font-bold hover:underline cursor-pointer"
                  >
                    View Applicants →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Opportunity Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold font-heading text-slate-900">Post Job / Internship Opening</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Software Engineer / DevOps Intern"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Role Type</label>
                  <select
                    value={newPost.type}
                    onChange={e => setNewPost({ ...newPost, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                  >
                    <option value="internship">Internship</option>
                    <option value="job">Full-Time Job</option>
                    <option value="industry_project">Industry Project</option>
                    <option value="hackathon">Hackathon</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Work Mode</label>
                  <select
                    value={newPost.workMode}
                    onChange={e => setNewPost({ ...newPost, workMode: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    value={newPost.location}
                    onChange={e => setNewPost({ ...newPost, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Compensation</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 / mo or ₹12 LPA"
                    value={newPost.stipendOrSalary}
                    onChange={e => setNewPost({ ...newPost, stipendOrSalary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Required Skills (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="React, TypeScript, AWS, Docker"
                  value={newPost.skillsRequired}
                  onChange={e => setNewPost({ ...newPost, skillsRequired: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Job Description & Responsibilities</label>
                <textarea
                  rows={3}
                  placeholder="Summarize candidate requirements, day-to-day responsibilities, and team culture..."
                  value={newPost.description}
                  onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {schedulingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Schedule Candidate Interview</h3>
                <p className="text-xs text-slate-500">{schedulingApp.studentName} • {schedulingApp.opportunityTitle}</p>
              </div>
              <button
                onClick={() => setSchedulingApp(null)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Interview Round</label>
                <select
                  value={interviewType}
                  onChange={e => setInterviewType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                >
                  <option value="Technical Coding Round">Technical Coding Round (1 Hour)</option>
                  <option value="System Design & Architecture">System Design & Architecture (45 Mins)</option>
                  <option value="Managerial & Culture Fit">Managerial & Culture Fit (30 Mins)</option>
                  <option value="HR & Offer Discussion">HR & Offer Discussion</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={e => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={interviewTime}
                    onChange={e => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-xs">
                Calendar invites with video conferencing link will be dispatched automatically to candidate ({schedulingApp.studentEmail}) and recruiter.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSchedulingApp(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Send Interview Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
