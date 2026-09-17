import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Edit3,
  Award,
  BookOpen,
  Briefcase,
  Code,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  FileText
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const { student, updateStudentProfile, addSkill, removeSkill, setActiveTab } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    college: student.college,
    course: student.course,
    department: student.department,
    yearOfStudy: student.yearOfStudy,
    cgpa: student.cgpa,
    location: student.location,
    targetCareer: student.targetCareer,
    bio: student.bio,
    careerGoals: student.careerGoals,
    interests: student.interests.join(', '),
    linkedin: student.linkedin,
    github: student.github,
    portfolioUrl: student.portfolioUrl
  });

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    role: '',
    technologies: '',
    link: '',
    type: 'college' as const,
    duration: '2 Months'
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      ...editForm,
      interests: editForm.interests.split(',').map(i => i.trim()).filter(Boolean)
    });
    setIsEditingProfile(false);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    const project = {
      id: `proj_${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      role: newProject.role || 'Contributor',
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
      link: newProject.link,
      type: newProject.type,
      duration: newProject.duration,
      featured: true
    };
    updateStudentProfile({
      completedProjects: [project, ...student.completedProjects]
    });
    setShowAddProjectModal(false);
    setNewProject({ title: '', description: '', role: '', technologies: '', link: '', type: 'college', duration: '2 Months' });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        {/* Cover Gradient */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-indigo-700 via-sky-700 to-indigo-900 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold backdrop-blur-md transition-colors cursor-pointer border border-white/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Details Header */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-14 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{student.name}</h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Verified Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {student.course} ({student.department}) • {student.yearOfStudy}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{student.college}</span>
                </p>
              </div>
            </div>

            {/* Placement Readiness Badge */}
            <div className="self-start sm:self-auto bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Readiness Score</div>
                <div className="text-lg font-black text-indigo-700">{student.placementReadiness.overall}%</div>
              </div>
              <button
                onClick={() => setActiveTab('prep')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Prep Hub
              </button>
            </div>
          </div>

          {/* Bio & Links Row */}
          <div className="border-t border-slate-100 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2 space-y-2">
              <div>
                <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">About Me</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{student.bio}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Career Ambitions</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{student.careerGoals}</p>
              </div>
            </div>

            {/* Quick Contact & Socials */}
            <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/60 space-y-2 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{student.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Cumulative CGPA: <strong className="text-slate-800">{student.cgpa} / 10</strong></span>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-3 text-indigo-600 font-medium">
                <a href={`https://${student.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a href={`https://${student.github}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Competencies Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold font-heading text-slate-900">Skills & Proficiencies ({student.skills.length})</h2>
            <p className="text-xs text-slate-500">Verified through projects, coursework, and assessments</p>
          </div>
          <button
            onClick={() => setActiveTab('skills')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Run Skill Gap Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {student.skills.map(skill => (
            <div
              key={skill.name}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                  {skill.verified && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {skill.category} • Level {skill.level}/5 ({skill.level * 20}%)
                </div>
                <div className="w-24 bg-slate-200 rounded-full h-1 mt-1.5">
                  <div className="bg-indigo-600 h-1 rounded-full" style={{ width: `${skill.level * 20}%` }} />
                </div>
              </div>

              <button
                onClick={() => removeSkill(skill.name)}
                className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                title="Remove skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold font-heading text-slate-900">Academic & Industry Projects</h2>
            <p className="text-xs text-slate-500">Hands-on systems built during degree curriculum</p>
          </div>
          <button
            onClick={() => setShowAddProjectModal(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.completedProjects.map(proj => (
            <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 capitalize">
                    {proj.type} Project
                  </span>
                  <span className="text-xs text-slate-400">{proj.duration}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                <div className="text-[11px] text-slate-500 mt-0.5">Role: {proj.role}</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {proj.technologies.map(tech => (
                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {proj.link && (
                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    <span>View Repository / Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Internships & Work Experience */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-base font-bold font-heading text-slate-900 mb-1">Internships & Professional Experience</h2>
        <p className="text-xs text-slate-500 mb-4">Corporate industry experience and apprenticeships</p>

        <div className="space-y-3">
          {student.internships.map(intern => (
            <div key={intern.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{intern.role}</h3>
                  <div className="text-xs font-semibold text-slate-700">{intern.company} • {intern.location}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{intern.duration}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{intern.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {intern.skillsGained.map(sk => (
                      <span key={sk} className="text-[10px] font-medium px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {intern.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certifications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold font-heading text-slate-900">Verified Certifications & Credentials</h2>
            <p className="text-xs text-slate-500">Issued by industry partners and CareerBridge Academy</p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Earn More Certificates
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.certifications.map(cert => (
            <div key={cert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-xs text-slate-900">{cert.title}</h3>
                <div className="text-[11px] text-slate-600 font-medium">Issuer: {cert.issuer}</div>
                <div className="text-[10px] text-slate-400">Issued: {cert.issueDate} • ID: {cert.credentialId}</div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {cert.skillsCovered.map(sk => (
                    <span key={sk} className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold font-heading text-slate-900">Edit Student Profile</h2>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">College / University</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={e => setEditForm({ ...editForm, college: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Course & Degree</label>
                  <input
                    type="text"
                    value={editForm.course}
                    onChange={e => setEditForm({ ...editForm, course: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Year of Study</label>
                  <input
                    type="text"
                    value={editForm.yearOfStudy}
                    onChange={e => setEditForm({ ...editForm, yearOfStudy: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Current CGPA</label>
                  <input
                    type="text"
                    value={editForm.cgpa}
                    onChange={e => setEditForm({ ...editForm, cgpa: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Target Career Goal</label>
                <input
                  type="text"
                  value={editForm.targetCareer}
                  onChange={e => setEditForm({ ...editForm, targetCareer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Interests (Comma Separated)</label>
                <input
                  type="text"
                  value={editForm.interests}
                  onChange={e => setEditForm({ ...editForm, interests: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Professional Bio</label>
                <textarea
                  rows={2}
                  value={editForm.bio}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold font-heading text-slate-900">Add Academic / Industry Project</h2>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProjectSubmit} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-Powered Smart Campus Waste Sorter"
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Your Role</label>
                <input
                  type="text"
                  placeholder="e.g. Team Lead / Backend Architect"
                  value={newProject.role}
                  onChange={e => setNewProject({ ...newProject, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Type</label>
                <select
                  value={newProject.type}
                  onChange={e => setNewProject({ ...newProject, type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                >
                  <option value="college">College Project</option>
                  <option value="industry">Industry Project</option>
                  <option value="personal">Personal / Open Source</option>
                  <option value="hackathon">Hackathon Project</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Technologies Used (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="React, Python, OpenCV, Docker"
                  value={newProject.technologies}
                  onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Project Description</label>
                <textarea
                  rows={3}
                  placeholder="Explain problem statement, architecture, and results..."
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">GitHub or Demo Link</label>
                <input
                  type="text"
                  placeholder="https://github.com/your-name/project"
                  value={newProject.link}
                  onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
