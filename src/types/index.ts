export type UserRole = 'student' | 'college' | 'employer';

export interface SkillItem {
  name: string;
  level: number; // 1 to 5 (or 20% to 100%)
  category: 'Technical' | 'Soft' | 'Core' | 'Tool';
  verified?: boolean;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  link?: string;
  type: 'college' | 'industry' | 'personal' | 'hackathon';
  duration: string;
  featured?: boolean;
}

export interface StudentInternship {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  skillsGained: string[];
  status: 'Completed' | 'Ongoing';
  certificateUrl?: string;
}

export interface StudentCertification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  skillsCovered: string[];
  url?: string;
}

export interface DetailedAssessmentData {
  personalInfo: {
    name: string;
    age: string;
    educationLevel: string;
    courseStream: string;
  };
  interests: {
    enjoyTechnology: number; // 1-5 scale
    likeHelpingPeople: number;
    enjoyCreativeWork: number;
    preferBusinessActivities: number;
    enjoyResearchAnalysis?: number;
    handsOnBuilding?: number;
  };
  skills: {
    communication: number; // 1-5
    leadership: number; // 1-5
    problemSolving: number; // 1-5
    codingTechnical: number; // 1-5
    creativity: number; // 1-5
    teamwork: number; // 1-5
  };
  personality: {
    introvertExtrovert: 'introvert' | 'extrovert' | 'ambivert';
    workStyle: 'independent' | 'team-oriented' | 'balanced';
    thinkingStyle: 'analytical' | 'creative' | 'hybrid';
    decisionStyle: 'risk-taking' | 'cautious' | 'calculated';
  };
  academicStrengths: {
    favoriteSubjects: string[];
    bestPerformingSubjects: string[];
    previousAchievements: string;
  };
}

export interface CareerAssessmentAnswer {
  questionId: number;
  selectedOptionIndex: number;
  category: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  industry: string;
  matchScore: number; // 0-100%
  description: string;
  avgSalary: string;
  demandLevel: 'Very High' | 'High' | 'Moderate';
  topCompanies: string[];
  whyRelevant: string;
  requiredSkills: string[];
  coreResponsibilities: string[];
}

export interface SkillGapAnalysis {
  careerTitle: string;
  overallMatchPercentage: number;
  skillsBreakdown: {
    name: string;
    category: string;
    studentProficiency: number; // 0-100
    requiredProficiency: number; // 0-100
    status: 'proficient' | 'developing' | 'missing';
    recommendedCourseId?: string;
    recommendedCourseTitle?: string;
  }[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'reading' | 'quiz';
  summary?: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'Technical' | 'Communication' | 'Leadership' | 'Problem Solving' | 'Interview Preparation' | 'Resume Writing' | 'Digital Skills';
  instructor: string;
  instructorRole: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  description: string;
  thumbnail: string;
  modules: CourseModule[];
  skillsCovered: string[];
  certificateAvailable: boolean;
  progress?: number; // 0 - 100
  enrolled?: boolean;
  completed?: boolean;
  completedAt?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  companyOrOrg: string;
  companyLogo?: string;
  type: 'internship' | 'job' | 'college_project' | 'industry_project' | 'workshop' | 'hackathon';
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipendOrSalary: string;
  field: string;
  skillsRequired: string[];
  description: string;
  requirements: string[];
  deadline: string;
  openings: number;
  applicantsCount: number;
  eligibility: string;
  experience?: string;
  postedByRole: 'college' | 'employer' | 'platform';
  status: 'active' | 'closed';
  featured?: boolean;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  companyName: string;
  opportunityType: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentCollege: string;
  studentDepartment: string;
  studentYear: string;
  studentGpa: string;
  skills: string[];
  appliedAt: string;
  status: 'Applied' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
  coverNote?: string;
  resumeFileName?: string;
  feedback?: string;
}

export interface ResumeDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  education: {
    institution: string;
    degree: string;
    field: string;
    year: string;
    score: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    location: string;
    bullets: string[];
  }[];
  projects: {
    title: string;
    tech: string;
    link: string;
    description: string;
  }[];
  skills: string[];
  certifications: string[];
  template: 'modern' | 'minimal' | 'executive';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  college: string;
  course: string;
  department: string;
  yearOfStudy: string;
  cgpa: string;
  skills: SkillItem[];
  interests: string[];
  careerGoals: string;
  targetCareer: string;
  bio: string;
  location: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  resumeData: ResumeDetails;
  completedProjects: StudentProject[];
  internships: StudentInternship[];
  certifications: StudentCertification[];
  assessmentCompleted: boolean;
  detailedAssessment?: DetailedAssessmentData;
  assessmentScores?: {
    analytical: number;
    creative: number;
    technical: number;
    social: number;
    management: number;
  };
  recommendedCareers: CareerRecommendation[];
  placementReadiness: {
    overall: number; // 0-100%
    aptitudeScore: number;
    technicalScore: number;
    hrScore: number;
    resumeScore: number;
    completedMockInterviews: number;
  };
}

export interface CollegeProfile {
  id: string;
  officerName: string;
  designation: string;
  collegeName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  placementStats: {
    totalEligibleStudents: number;
    placedStudents: number;
    placementPercentage: number;
    averagePackage: string;
    highestPackage: string;
    activeDrives: number;
    partnerCompanies: number;
  };
}

export interface EmployerProfile {
  id: string;
  companyName: string;
  recruiterName: string;
  recruiterRole: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  industry: string;
  companySize: string;
  description: string;
  logo: string;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  driveDate: string;
  packageOffered: string;
  departmentsEligible: string[];
  minCgpa: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  registeredCount: number;
  rounds: string[];
}

export interface AptitudeQuestion {
  id: number;
  category: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TechnicalInterviewQuestion {
  id: number;
  topic: 'Data Structures' | 'Algorithms' | 'Web Development' | 'Databases & SQL' | 'System Design' | 'Object Oriented Programming';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  answer: string;
  keyPoints: string[];
  codeSnippet?: string;
}

export interface HRQuestion {
  id: number;
  category: 'General' | 'Behavioral' | 'Situation' | 'Career Ambition';
  question: string;
  sampleAnswer: string;
  tips: string[];
  starBreakdown?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}
