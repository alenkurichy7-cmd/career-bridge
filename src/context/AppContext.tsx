import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  StudentProfile,
  CollegeProfile,
  EmployerProfile,
  Course,
  Opportunity,
  Application,
  PlacementDrive,
  ResumeDetails,
  SkillGapAnalysis,
  DetailedAssessmentData,
  CareerRecommendation
} from '../types';
import {
  initialStudentProfile,
  initialCollegeProfile,
  initialEmployerProfile,
  initialCourses,
  initialOpportunities,
  initialApplications,
  initialPlacementDrives,
  careerPathsDatabase
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Student State
  student: StudentProfile;
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  addSkill: (skill: { name: string; level: number; category: 'Technical' | 'Soft' | 'Core' | 'Tool' }) => void;
  removeSkill: (skillName: string) => void;
  setTargetCareer: (careerTitle: string) => void;
  submitCareerAssessment: (answers?: Record<number, number>, detailedData?: DetailedAssessmentData) => void;
  updateResumeData: (resume: ResumeDetails) => void;
  
  // Courses State
  courses: Course[];
  enrollInCourse: (courseId: string) => void;
  completeCourseModule: (courseId: string, moduleId: string) => void;
  claimCertificate: (courseId: string) => void;
  
  // Opportunities State
  opportunities: Opportunity[];
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'applicantsCount' | 'status'>) => void;
  applyToOpportunity: (opportunityId: string, coverNote?: string, resumeFileName?: string) => boolean;
  
  // Applications State
  applications: Application[];
  updateApplicationStatus: (applicationId: string, status: Application['status'], feedback?: string) => void;
  
  // Placement Drives
  placementDrives: PlacementDrive[];
  registerForDrive: (driveId: string) => void;
  addPlacementDrive: (drive: Omit<PlacementDrive, 'id' | 'registeredCount'>) => void;
  
  // Profiles
  collegeProfile: CollegeProfile;
  employerProfile: EmployerProfile;
  updateCollegeProfile: (updates: Partial<CollegeProfile>) => void;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => void;
  
  // Helper calculations
  getSkillGapForCareer: (careerTitle?: string) => SkillGapAnalysis;
  
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  
  // Reset demo
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role State
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('careerbridge_role') as UserRole) || 'student';
  });
  
  const [activeTab, setActiveTab] = useState<string>('home');

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('careerbridge_student');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  // College Profile
  const [collegeProfile, setCollegeProfile] = useState<CollegeProfile>(() => {
    const saved = localStorage.getItem('careerbridge_college');
    return saved ? JSON.parse(saved) : initialCollegeProfile;
  });

  // Employer Profile
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile>(() => {
    const saved = localStorage.getItem('careerbridge_employer');
    return saved ? JSON.parse(saved) : initialEmployerProfile;
  });

  // Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('careerbridge_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  // Opportunities
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('careerbridge_opps');
    return saved ? JSON.parse(saved) : initialOpportunities;
  });

  // Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('careerbridge_apps');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  // Placement Drives
  const [placementDrives, setPlacementDrives] = useState<PlacementDrive[]>(() => {
    const saved = localStorage.getItem('careerbridge_drives');
    return saved ? JSON.parse(saved) : initialPlacementDrives;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('careerbridge_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('careerbridge_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('careerbridge_college', JSON.stringify(collegeProfile));
  }, [collegeProfile]);

  useEffect(() => {
    localStorage.setItem('careerbridge_employer', JSON.stringify(employerProfile));
  }, [employerProfile]);

  useEffect(() => {
    localStorage.setItem('careerbridge_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('careerbridge_opps', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('careerbridge_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('careerbridge_drives', JSON.stringify(placementDrives));
  }, [placementDrives]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setActiveTab(newRole === 'student' ? 'home' : 'dashboard');
    showToast(`Switched view to ${newRole === 'student' ? 'Student & Graduate' : newRole === 'college' ? 'College Placement Officer' : 'Employer & Recruiter'} Portal`, 'info');
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  const addSkill = (newSkill: { name: string; level: number; category: 'Technical' | 'Soft' | 'Core' | 'Tool' }) => {
    setStudent(prev => {
      const exists = prev.skills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase());
      if (exists) {
        return {
          ...prev,
          skills: prev.skills.map(s => s.name.toLowerCase() === newSkill.name.toLowerCase() ? { ...s, level: newSkill.level } : s)
        };
      }
      return {
        ...prev,
        skills: [...prev.skills, { ...newSkill, verified: true }]
      };
    });
    showToast(`Added skill: ${newSkill.name}`, 'success');
  };

  const removeSkill = (skillName: string) => {
    setStudent(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
    showToast(`Removed skill: ${skillName}`, 'info');
  };

  const setTargetCareer = (careerTitle: string) => {
    setStudent(prev => ({
      ...prev,
      targetCareer: careerTitle
    }));
    showToast(`Target career path updated to: ${careerTitle}`, 'success');
  };

  const submitCareerAssessment = (answers?: Record<number, number>, detailedData?: DetailedAssessmentData) => {
    let scores = {
      analytical: 75,
      technical: 80,
      creative: 65,
      management: 60,
      social: 70
    };

    let calculatedCareers: CareerRecommendation[] = [...student.recommendedCareers];

    if (detailedData) {
      // 1. Calculate scores based on the explicit 1-5 skills, interests, and personality
      const techScore = Math.min(98, Math.round(
        (detailedData.skills.codingTechnical * 12) +
        (detailedData.interests.enjoyTechnology * 5) +
        (detailedData.skills.problemSolving * 4) +
        (detailedData.personality.thinkingStyle === 'analytical' ? 4 : 0) + 10
      ));

      const analyticalScore = Math.min(98, Math.round(
        (detailedData.skills.problemSolving * 12) +
        (detailedData.interests.enjoyTechnology * 4) +
        (detailedData.personality.thinkingStyle === 'analytical' ? 8 : 4) + 12
      ));

      const creativeScore = Math.min(98, Math.round(
        (detailedData.skills.creativity * 13) +
        (detailedData.interests.enjoyCreativeWork * 5) +
        (detailedData.personality.thinkingStyle === 'creative' ? 8 : 2) + 10
      ));

      const managementScore = Math.min(98, Math.round(
        (detailedData.skills.leadership * 12) +
        (detailedData.interests.preferBusinessActivities * 6) +
        (detailedData.personality.workStyle === 'team-oriented' ? 6 : 2) + 10
      ));

      const socialScore = Math.min(98, Math.round(
        (detailedData.skills.communication * 9) +
        (detailedData.skills.teamwork * 8) +
        (detailedData.interests.likeHelpingPeople * 5) + 12
      ));

      scores = {
        analytical: analyticalScore,
        technical: techScore,
        creative: creativeScore,
        management: managementScore,
        social: socialScore
      };

      // 2. Generate customized career matches tailored to the assessment responses
      const candidates: CareerRecommendation[] = [
        {
          id: 'car_01',
          title: 'Full Stack Software Engineer',
          industry: 'Software & Internet Technology',
          matchScore: Math.min(98, Math.max(60, Math.round(
            (detailedData.skills.codingTechnical * 7 +
             detailedData.skills.problemSolving * 5 +
             detailedData.interests.enjoyTechnology * 5 +
             (detailedData.academicStrengths.favoriteSubjects.some(s => /coding|programming|algorithms|data structures|web/i.test(s)) ? 8 : 2))
          ))),
          description: 'Designs, develops, and maintains both client-facing frontends and robust server-side APIs, databases, and microservices.',
          avgSalary: '$85,000 - $115,000 / ₹12 - 22 LPA',
          demandLevel: 'Very High',
          topCompanies: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Razorpay', 'Uber'],
          whyRelevant: `Matches your strong technical coding rating (${detailedData.skills.codingTechnical}/5) and problem-solving aptitude (${detailedData.skills.problemSolving}/5). Your academic interest in ${detailedData.academicStrengths.favoriteSubjects[0] || 'Software Engineering'} and ${detailedData.personality.thinkingStyle} thinking directly supports building scalable software.`,
          requiredSkills: ['React / Frontend Framework', 'Node.js / Backend', 'PostgreSQL / SQL', 'System Design', 'Docker & CI/CD', 'DSA & Problem Solving'],
          coreResponsibilities: [
            'Develop end-to-end web architectures from UI components to relational databases',
            'Write clean, modular code with comprehensive automated tests',
            'Collaborate with Product Managers and UX Designers to deliver user features'
          ]
        },
        {
          id: 'car_02',
          title: 'AI & Data Solutions Engineer',
          industry: 'Artificial Intelligence & Machine Learning',
          matchScore: Math.min(98, Math.max(55, Math.round(
            (detailedData.skills.problemSolving * 7 +
             detailedData.interests.enjoyTechnology * 4 +
             detailedData.skills.codingTechnical * 4 +
             (detailedData.personality.thinkingStyle === 'analytical' ? 8 : 2) +
             (detailedData.academicStrengths.favoriteSubjects.some(s => /ai|machine learning|data|math|statistics/i.test(s)) ? 9 : 3))
          ))),
          description: 'Builds machine learning pipelines, fine-tunes LLMs, and extracts actionable predictive analytics from complex datasets.',
          avgSalary: '$95,000 - $135,000 / ₹14 - 26 LPA',
          demandLevel: 'Very High',
          topCompanies: ['NVIDIA', 'OpenAI', 'Google DeepMind', 'Databricks', 'Flipkart'],
          whyRelevant: `Your problem-solving score (${detailedData.skills.problemSolving}/5) and ${detailedData.personality.thinkingStyle} mindset provide the analytical backbone needed for statistical modeling, algorithmic optimization, and AI architecture.`,
          requiredSkills: ['Python & PyTorch', 'Machine Learning & Neural Nets', 'SQL & Vector Databases', 'Prompt Engineering', 'Statistics & Linear Algebra'],
          coreResponsibilities: [
            'Train and evaluate predictive machine learning and generative AI models',
            'Engineer data ingestion, vector indexing, and low-latency inference pipelines',
            'Translate mathematical theories into production-ready software solutions'
          ]
        },
        {
          id: 'car_03',
          title: 'Cloud DevOps & Site Reliability Engineer',
          industry: 'Infrastructure & Cloud Computing',
          matchScore: Math.min(98, Math.max(50, Math.round(
            (detailedData.skills.codingTechnical * 6 +
             detailedData.skills.problemSolving * 5 +
             (detailedData.personality.decisionStyle === 'cautious' || detailedData.personality.decisionStyle === 'calculated' ? 8 : 3) +
             detailedData.interests.enjoyTechnology * 4)
          ))),
          description: 'Automates software delivery pipelines, manages cloud infrastructure reliability, orchestrates containers, and safeguards production uptime.',
          avgSalary: '$90,000 - $125,000 / ₹14 - 24 LPA',
          demandLevel: 'High',
          topCompanies: ['AWS', 'Microsoft Azure', 'Red Hat', 'Salesforce', 'CrowdStrike'],
          whyRelevant: `Your methodical problem-solving (${detailedData.skills.problemSolving}/5) and ${detailedData.personality.decisionStyle} decision-making match the high reliability standards needed to manage containerized clusters and zero-downtime CI/CD pipelines.`,
          requiredSkills: ['Linux & Shell Scripting', 'Docker & Kubernetes', 'AWS / Cloud Architecture', 'CI/CD Pipelines (GitHub Actions)', 'Infrastructure as Code (Terraform)'],
          coreResponsibilities: [
            'Provision and manage multi-cloud Kubernetes clusters with Terraform',
            'Implement automated canary deployments and zero-downtime release workflows',
            'Monitor service latency, error budgets, and resolve production incidents'
          ]
        },
        {
          id: 'car_04',
          title: 'UI/UX & Product Designer',
          industry: 'Design & Human-Computer Interaction',
          matchScore: Math.min(98, Math.max(45, Math.round(
            (detailedData.skills.creativity * 8 +
             detailedData.interests.enjoyCreativeWork * 5 +
             detailedData.skills.communication * 4 +
             detailedData.interests.likeHelpingPeople * 3 +
             (detailedData.personality.thinkingStyle === 'creative' ? 8 : 2))
          ))),
          description: 'Transforms complex user workflows into intuitive, beautiful, and accessible digital products through research, wireframing, and design systems.',
          avgSalary: '$75,000 - $105,000 / ₹9 - 18 LPA',
          demandLevel: 'High',
          topCompanies: ['Apple', 'Airbnb', 'Figma', 'Spotify', 'Swiggy', 'Canva'],
          whyRelevant: `Your creativity rating (${detailedData.skills.creativity}/5), appreciation for user-centered solutions, and strong visual intuition make you a natural fit for crafting engaging digital product experiences.`,
          requiredSkills: ['Figma & Prototyping', 'User Research & Personas', 'Design Systems', 'Information Architecture', 'Micro-interactions & UX Copy'],
          coreResponsibilities: [
            'Conduct empathetic user interviews, usability testing, and synthesis sessions',
            'Architect scalable design systems and high-fidelity clickable interactive prototypes',
            'Partner with developers to verify pixel-perfect frontend implementations'
          ]
        },
        {
          id: 'car_05',
          title: 'Technical Product Manager',
          industry: 'Product Strategy & Cross-functional Leadership',
          matchScore: Math.min(98, Math.max(45, Math.round(
            (detailedData.skills.leadership * 7 +
             detailedData.skills.communication * 6 +
             detailedData.interests.preferBusinessActivities * 5 +
             detailedData.skills.teamwork * 4 +
             (detailedData.personality.workStyle === 'team-oriented' ? 6 : 2))
          ))),
          description: 'Orchestrates product strategy, defines feature roadmaps, aligns engineering with business goals, and leads cross-functional teams to market.',
          avgSalary: '$95,000 - $130,000 / ₹15 - 28 LPA',
          demandLevel: 'High',
          topCompanies: ['Google', 'Meta', 'Stripe', 'Zomato', 'Microsoft', 'Atlassian'],
          whyRelevant: `Your leadership score (${detailedData.skills.leadership}/5), communication strength (${detailedData.skills.communication}/5), and ${detailedData.personality.workStyle} collaboration style position you to lead high-velocity product squads and communicate across engineering and business.`,
          requiredSkills: ['Product Strategy & Vision', 'Agile Scrum & Roadmap Planning', 'Data Analytics (SQL/Mixpanel)', 'User Empathy', 'Stakeholder Management'],
          coreResponsibilities: [
            'Define product vision, quarterly roadmaps, and measurable OKRs',
            'Synthesize customer feedback, analytics, and technical trade-offs into PRDs',
            'Run sprint planning and guide cross-functional squads to high-impact releases'
          ]
        },
        {
          id: 'car_06',
          title: 'Cybersecurity & Systems Analyst',
          industry: 'Information Security & Cloud Defense',
          matchScore: Math.min(98, Math.max(45, Math.round(
            (detailedData.skills.problemSolving * 6 +
             detailedData.skills.codingTechnical * 5 +
             (detailedData.personality.decisionStyle === 'cautious' ? 8 : 4) +
             (detailedData.personality.thinkingStyle === 'analytical' ? 6 : 3))
          ))),
          description: 'Defends digital infrastructure from threats, analyzes vulnerabilities, enforces zero-trust security postures, and conducts penetration testing.',
          avgSalary: '$88,000 - $120,000 / ₹11 - 22 LPA',
          demandLevel: 'Very High',
          topCompanies: ['Palo Alto Networks', 'CrowdStrike', 'Cisco', 'Cloudflare', 'Mandiant'],
          whyRelevant: `Your analytical problem-solving skills (${detailedData.skills.problemSolving}/5) and cautious, thorough evaluation style are essential for threat modeling, forensic analysis, and auditing system perimeters.`,
          requiredSkills: ['Network Security & Protocols', 'Vulnerability Assessment', 'Threat Modeling', 'Linux Internals', 'Python & Bash Scripting'],
          coreResponsibilities: [
            'Perform threat assessments and penetration testing across web applications',
            'Implement defense-in-depth firewalls, IAM roles, and encryption standards',
            'Respond to incident security alerts and maintain compliance audits'
          ]
        }
      ];

      candidates.sort((a, b) => b.matchScore - a.matchScore);
      calculatedCareers = candidates;
    } else if (answers) {
      let technical = 70;
      let analytical = 65;
      let creative = 50;
      let management = 55;
      let social = 60;

      Object.entries(answers).forEach(([qId, optIdx]) => {
        if (optIdx === 0) technical += 6;
        else if (optIdx === 1) analytical += 6;
        else if (optIdx === 2) creative += 6;
        else if (optIdx === 3) management += 6;
        social += 3;
      });

      scores = {
        analytical: Math.min(95, analytical),
        technical: Math.min(98, technical),
        creative: Math.min(92, creative),
        management: Math.min(90, management),
        social: Math.min(88, social)
      };
    }

    // Calculate updated placement readiness
    const newReadiness = {
      ...student.placementReadiness,
      overall: Math.min(96, student.placementReadiness.overall + 5)
    };

    setStudent(prev => ({
      ...prev,
      name: detailedData?.personalInfo.name || prev.name,
      course: detailedData?.personalInfo.courseStream || prev.course,
      department: detailedData?.personalInfo.courseStream || prev.department,
      assessmentCompleted: true,
      detailedAssessment: detailedData || prev.detailedAssessment,
      assessmentScores: scores,
      recommendedCareers: calculatedCareers,
      placementReadiness: newReadiness
    }));

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    showToast('Career assessment completed! Tailored career paths unlocked.', 'success');
  };

  const updateResumeData = (resume: ResumeDetails) => {
    setStudent(prev => ({
      ...prev,
      resumeData: resume,
      placementReadiness: {
        ...prev.placementReadiness,
        resumeScore: 92,
        overall: Math.round((prev.placementReadiness.aptitudeScore + prev.placementReadiness.technicalScore + prev.placementReadiness.hrScore + 92) / 4)
      }
    }));
    showToast('Resume saved successfully!', 'success');
  };

  const enrollInCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: true, progress: c.progress || 10 };
      }
      return c;
    }));
    showToast('Successfully enrolled in course!', 'success');
  };

  const completeCourseModule = (courseId: string, moduleId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const updatedModules = c.modules.map(m => m.id === moduleId ? { ...m, completed: true } : m);
        const completedCount = updatedModules.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedModules.length) * 100);
        const completed = progress === 100;
        
        if (completed && !c.completed) {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
          showToast(`🎉 Congratulations! You completed "${c.title}"! Certificate unlocked.`, 'success');
        }

        return {
          ...c,
          modules: updatedModules,
          progress,
          completed,
          completedAt: completed ? new Date().toISOString().split('T')[0] : c.completedAt
        };
      }
      return c;
    }));
  };

  const claimCertificate = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Add to student's certifications if not already there
    const certTitle = `${course.title} Professional Certificate`;
    const exists = student.certifications.some(cert => cert.title.includes(course.title));
    
    if (!exists) {
      const newCert = {
        id: `cert_${Date.now()}`,
        title: certTitle,
        issuer: `CareerBridge Academy • ${course.instructor}`,
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        credentialId: `CB-${Math.floor(100000 + Math.random() * 900000)}`,
        skillsCovered: course.skillsCovered
      };

      setStudent(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCert],
        placementReadiness: {
          ...prev.placementReadiness,
          technicalScore: Math.min(95, prev.placementReadiness.technicalScore + 4),
          overall: Math.min(98, prev.placementReadiness.overall + 3)
        }
      }));
    }

    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } catch {}

    showToast(`Certificate issued for ${course.title}! Added to your verified credentials.`, 'success');
  };

  const addOpportunity = (opp: Omit<Opportunity, 'id' | 'applicantsCount' | 'status'>) => {
    const newOpp: Opportunity = {
      ...opp,
      id: `opp_${Date.now()}`,
      applicantsCount: 0,
      status: 'active'
    };
    setOpportunities(prev => [newOpp, ...prev]);
    showToast('Opportunity published successfully!', 'success');
  };

  const applyToOpportunity = (opportunityId: string, coverNote?: string, resumeFileName?: string): boolean => {
    const opp = opportunities.find(o => o.id === opportunityId);
    if (!opp) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.opportunityId === opportunityId && a.studentId === student.id);
    if (alreadyApplied) {
      showToast('You have already submitted an application for this opportunity.', 'info');
      return false;
    }

    const newApp: Application = {
      id: `app_${Date.now()}`,
      opportunityId,
      opportunityTitle: opp.title,
      companyName: opp.companyOrOrg,
      opportunityType: opp.type === 'internship' ? 'Internship' : opp.type === 'job' ? 'Job' : 'Project',
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      studentPhone: student.phone,
      studentCollege: student.college,
      studentDepartment: student.department,
      studentYear: student.yearOfStudy,
      studentGpa: student.cgpa,
      skills: student.skills.map(s => s.name),
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Applied',
      coverNote: coverNote || 'Excited to apply for this opportunity through CareerBridge.',
      resumeFileName: resumeFileName || 'Rahul_Sharma_Resume_2026.pdf'
    };

    setApplications(prev => [newApp, ...prev]);
    setOpportunities(prev => prev.map(o => o.id === opportunityId ? { ...o, applicantsCount: o.applicantsCount + 1 } : o));

    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch {}

    showToast(`Application submitted to ${opp.companyOrOrg}! You can track its status in Opportunities.`, 'success');
    return true;
  };

  const updateApplicationStatus = (applicationId: string, status: Application['status'], feedback?: string) => {
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, status, feedback: feedback || a.feedback } : a));
    showToast(`Application status updated to: ${status}`, 'success');
  };

  const registerForDrive = (driveId: string) => {
    setPlacementDrives(prev => prev.map(d => d.id === driveId ? { ...d, registeredCount: d.registeredCount + 1 } : d));
    showToast('Successfully registered for placement drive! Check your student email for round dates.', 'success');
  };

  const addPlacementDrive = (drive: Omit<PlacementDrive, 'id' | 'registeredCount'>) => {
    const newDrive: PlacementDrive = {
      ...drive,
      id: `drv_${Date.now()}`,
      registeredCount: 0
    };
    setPlacementDrives(prev => [newDrive, ...prev]);
    showToast('Placement drive published to campus directory!', 'success');
  };

  const updateCollegeProfile = (updates: Partial<CollegeProfile>) => {
    setCollegeProfile(prev => ({ ...prev, ...updates }));
    showToast('Placement cell profile updated.', 'success');
  };

  const updateEmployerProfile = (updates: Partial<EmployerProfile>) => {
    setEmployerProfile(prev => ({ ...prev, ...updates }));
    showToast('Company profile updated.', 'success');
  };

  // Skill Gap Analysis Engine
  const getSkillGapForCareer = (careerTitle?: string): SkillGapAnalysis => {
    const target = careerTitle || student.targetCareer || 'Full Stack Software Engineer';
    const careerData = careerPathsDatabase[target] || careerPathsDatabase['Full Stack Software Engineer'];

    const studentSkillMap = new Map<string, number>();
    student.skills.forEach(s => {
      // Map level 1-5 to percentage 20-100%
      studentSkillMap.set(s.name.toLowerCase(), s.level * 20);
    });

    let totalMatchWeight = 0;
    let totalPossibleWeight = 0;

    const skillsBreakdown = careerData.requiredSkills.map(req => {
      let matchedScore = 0;
      // find fuzzy or direct match
      studentSkillMap.forEach((prof, key) => {
        if (key.includes(req.name.toLowerCase().split(' ')[0]) || req.name.toLowerCase().includes(key.split(' ')[0])) {
          matchedScore = Math.max(matchedScore, prof);
        }
      });

      totalPossibleWeight += req.targetLevel;
      totalMatchWeight += Math.min(matchedScore, req.targetLevel);

      let status: 'proficient' | 'developing' | 'missing' = 'missing';
      if (matchedScore >= req.targetLevel * 0.85) {
        status = 'proficient';
      } else if (matchedScore > 0) {
        status = 'developing';
      }

      // recommend course matching the skill
      const matchedCourse = courses.find(c => 
        c.skillsCovered.some(sk => sk.toLowerCase().includes(req.name.toLowerCase().split(' ')[0])) ||
        careerData.recommendedCourseIds.includes(c.id)
      );

      return {
        name: req.name,
        category: req.category,
        studentProficiency: matchedScore,
        requiredProficiency: req.targetLevel,
        status,
        recommendedCourseId: matchedCourse?.id,
        recommendedCourseTitle: matchedCourse?.title
      };
    });

    const overallMatchPercentage = Math.min(100, Math.round((totalMatchWeight / Math.max(1, totalPossibleWeight)) * 100));

    return {
      careerTitle: target,
      overallMatchPercentage,
      skillsBreakdown
    };
  };

  const resetToDemoData = () => {
    setStudent(initialStudentProfile);
    setCollegeProfile(initialCollegeProfile);
    setEmployerProfile(initialEmployerProfile);
    setCourses(initialCourses);
    setOpportunities(initialOpportunities);
    setApplications(initialApplications);
    setPlacementDrives(initialPlacementDrives);
    showToast('Reset application data to initial demo state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        student,
        updateStudentProfile,
        addSkill,
        removeSkill,
        setTargetCareer,
        submitCareerAssessment,
        updateResumeData,
        courses,
        enrollInCourse,
        completeCourseModule,
        claimCertificate,
        opportunities,
        addOpportunity,
        applyToOpportunity,
        applications,
        updateApplicationStatus,
        placementDrives,
        registerForDrive,
        addPlacementDrive,
        collegeProfile,
        employerProfile,
        updateCollegeProfile,
        updateEmployerProfile,
        getSkillGapForCareer,
        toasts,
        showToast,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
