import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building,
  BarChart2,
  ExternalLink,
  ChevronRight,
  Printer
} from 'lucide-react';

export const CollegeDashboard: React.FC = () => {
  const { collegeStats, collegeStudents, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [minReadiness, setMinReadiness] = useState(0);
  const [inspectingStudent, setInspectingStudent] = useState<any | null>(null);

  const departments = ['All', 'Computer Science & Engineering', 'Information Technology', 'Electronics & Comm.', 'Mechanical Engineering'];
  const statuses = ['All', 'Placed', 'Shortlisted', 'Interviewing', 'Seeking Placement'];

  const filteredStudents = collegeStudents.filter(st => {
    const matchesDept = selectedDept === 'All' || st.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || st.status === selectedStatus;
    const matchesReadiness = st.readinessScore >= minReadiness;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (st.placedCompany && st.placedCompany.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesStatus && matchesReadiness && matchesSearch;
  });

  const handleExportReport = () => {
    showToast('Placement report generated! Downloading CSV report...', 'success');
    const headers = ['Student ID,Name,Department,CGPA,Readiness Score,Status,Company,Package'];
    const rows = filteredStudents.map(s =>
      `"${s.id}","${s.name}","${s.department}",${s.cgpa},${s.readinessScore}%,"${s.status}","${s.placedCompany || 'N/A'}","${s.package || 'N/A'}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CareerBridge_Placement_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* College Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Training & Placement Officer (TPO) Portal</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">{collegeStats.collegeName}</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Academic Session 2025–2026 • Real-time student readiness tracking and placement analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportReport}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Placement Report</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Total Enrolled</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{collegeStats.totalStudents}</div>
          <div className="text-xs text-slate-500 mt-1">Registered for Placement 2026</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Placed Students</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {collegeStats.placedStudents}{' '}
            <span className="text-xs text-slate-500 font-semibold">({collegeStats.placementRate}%)</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Offers accepted & verified</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Avg Readiness Score</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">{collegeStats.averageReadinessScore}%</div>
          <div className="text-xs text-slate-500 mt-1">Across 4 assessment vectors</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Hiring Companies</span>
            <Building className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-600 mt-2">{collegeStats.activeRecruiters}</div>
          <div className="text-xs text-slate-500 mt-1">Highest: {collegeStats.highestPackage}</div>
        </div>
      </div>

      {/* Department Analytics & Skill Gap Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Placement Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold font-heading text-slate-900">Department Placement Performance</h2>
              <p className="text-xs text-slate-500">Placement conversion ratios across engineering divisions</p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              Avg Package: {collegeStats.averagePackage}
            </span>
          </div>

          <div className="space-y-4">
            {collegeStats.departmentBreakdown.map(dept => {
              const rate = Math.round((dept.placed / dept.total) * 100);
              return (
                <div key={dept.department} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">{dept.department}</span>
                    <span className="text-slate-600">
                      {dept.placed} / {dept.total} Placed (<strong className="text-indigo-600">{rate}%</strong>)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-700" style={{ width: `${rate}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Skill Deficiency Alert */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-700 mb-2">
              <AlertCircle className="w-4 h-4" />
              <h2 className="text-base font-bold font-heading text-slate-900">Campus Skill Gap Report</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Top skill deficiencies identified during recent technical placement drives. Recommended for immediate workshop scheduling.
            </p>

            <div className="space-y-3">
              {[
                { skill: 'Docker & Kubernetes', deficiency: '48% Deficient', action: 'Schedule DevOps Bootcamp' },
                { skill: 'System Design & High Concurrency', deficiency: '42% Deficient', action: 'Senior Arch Lectures' },
                { skill: 'Relational Database Optimization', deficiency: '34% Deficient', action: 'SQL Drill Series' },
                { skill: 'STAR Framework in HR Rounds', deficiency: '28% Deficient', action: 'Alumni Mock Drives' }
              ].map(item => (
                <div key={item.skill} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900">{item.skill}</span>
                    <span className="text-rose-700 text-[11px]">{item.deficiency}</span>
                  </div>
                  <div className="text-[10px] text-indigo-700 font-semibold mt-1">Recommended: {item.action}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => showToast('Bootcamp proposal dispatched to HOD council.', 'success')}
            className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Dispatch Curriculum Notification to Faculty
          </button>
        </div>
      </div>

      {/* Registered Students Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold font-heading text-slate-900">Registered Students Directory</h2>
            <p className="text-xs text-slate-500">Search, filter, and inspect individual student placement readiness</p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Showing {filteredStudents.length} of {collegeStudents.length} Students
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 flex flex-wrap items-center gap-3 text-xs">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, email, or skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Dept */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Dept:</span>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 cursor-pointer"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 cursor-pointer"
            >
              {statuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department & Year</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Readiness Score</th>
                <th className="py-3 px-4">Key Skills</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => {
                const statusStyles = {
                  Placed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  Shortlisted: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                  Interviewing: 'bg-amber-50 text-amber-800 border-amber-200',
                  'Seeking Placement': 'bg-slate-100 text-slate-700 border-slate-200'
                }[student.status] || 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{student.name}</div>
                      <div className="text-[10px] text-slate-400">{student.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{student.department}</div>
                      <div className="text-[10px] text-slate-400">{student.yearOfStudy}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{student.cgpa}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{student.readinessScore}%</span>
                        <div className="w-12 bg-slate-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              student.readinessScore >= 80 ? 'bg-emerald-500' : student.readinessScore >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${student.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {student.skills.slice(0, 3).map(sk => (
                          <span key={sk} className="text-[9px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyles}`}>
                        {student.status}
                      </span>
                      {student.placedCompany && (
                        <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                          {student.placedCompany} • {student.package}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setInspectingStudent(student)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Student Drawer/Modal */}
      {inspectingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{inspectingStudent.name}</h3>
                <p className="text-xs text-slate-500">{inspectingStudent.department} • {inspectingStudent.yearOfStudy}</p>
              </div>
              <button
                onClick={() => setInspectingStudent(null)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Current CGPA</div>
                  <div className="text-base font-black text-slate-900">{inspectingStudent.cgpa} / 10</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Readiness Score</div>
                  <div className="text-base font-black text-indigo-700">{inspectingStudent.readinessScore}%</div>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 uppercase text-[10px]">Verified Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {inspectingStudent.skills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded font-semibold text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 uppercase text-[10px]">Placement Status:</span>
                <div className="mt-1 text-slate-700">
                  Current Stage: <strong>{inspectingStudent.status}</strong>
                  {inspectingStudent.placedCompany && (
                    <div className="text-emerald-700 font-bold mt-0.5">
                      Offered by {inspectingStudent.placedCompany} ({inspectingStudent.package})
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    showToast(`TPO notification sent to ${inspectingStudent.name}`, 'success');
                    setInspectingStudent(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Send Placement Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
