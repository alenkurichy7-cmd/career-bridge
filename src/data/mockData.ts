import {
  StudentProfile,
  CollegeProfile,
  EmployerProfile,
  Course,
  Opportunity,
  Application,
  AptitudeQuestion,
  TechnicalInterviewQuestion,
  HRQuestion,
  PlacementDrive,
  CareerRecommendation
} from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'std_01',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@apex.edu',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  college: 'Apex Institute of Technology',
  course: 'B.Tech',
  department: 'Computer Science & Engineering',
  yearOfStudy: '3rd Year (Class of 2026)',
  cgpa: '8.7',
  location: 'Bangalore, India',
  targetCareer: 'Full Stack Software Engineer',
  bio: 'Aspiring Full Stack Engineer passionate about high-scale distributed systems, React, TypeScript, and modern cloud architectures. Eager to solve real-world problems.',
  linkedin: 'linkedin.com/in/rahul-sharma-dev',
  github: 'github.com/rahul-sharma-code',
  portfolioUrl: 'https://rahulsharma.dev',
  interests: ['Cloud Computing', 'Open Source', 'System Design', 'Web3', 'AI/ML Applications'],
  careerGoals: 'To join an innovative tech company as an associate software engineer, contribute to microservices backend development, and lead high-impact user features.',
  skills: [
    { name: 'JavaScript / TypeScript', level: 4, category: 'Technical', verified: true },
    { name: 'React.js', level: 4, category: 'Technical', verified: true },
    { name: 'Node.js & Express', level: 3, category: 'Technical', verified: true },
    { name: 'Python', level: 3, category: 'Technical', verified: false },
    { name: 'SQL & PostgreSQL', level: 3, category: 'Technical', verified: true },
    { name: 'Data Structures & Algorithms', level: 3, category: 'Core', verified: true },
    { name: 'Git & GitHub', level: 4, category: 'Tool', verified: true },
    { name: 'Team Communication', level: 4, category: 'Soft', verified: false },
    { name: 'Problem Solving', level: 4, category: 'Soft', verified: true }
  ],
  completedProjects: [
    {
      id: 'proj_01',
      title: 'EduSync - Campus Collaboration Hub',
      description: 'A full-stack collaborative platform for college study circles featuring real-time document sync, Kanban task boards, and peer chat.',
      role: 'Full Stack Lead',
      technologies: ['React', 'Node.js', 'Socket.io', 'Tailwind CSS', 'PostgreSQL'],
      link: 'https://github.com/rahul/edusync',
      type: 'college',
      duration: '3 Months',
      featured: true
    },
    {
      id: 'proj_02',
      title: 'HealthTrack Microservices API',
      description: 'Developed RESTful healthcare management API handling appointment scheduling, doctor availability slots, and patient medical record telemetry.',
      role: 'Backend Developer',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'JWT'],
      link: 'https://github.com/rahul/healthtrack-api',
      type: 'industry',
      duration: '2 Months',
      featured: true
    }
  ],
  internships: [
    {
      id: 'int_01',
      company: 'NextWave Digital Labs',
      role: 'Frontend Engineering Intern',
      duration: 'May 2025 - Jul 2025 (2 Mos)',
      location: 'Remote, Bangalore',
      description: 'Built customer onboarding UI flows in Next.js, optimized Core Web Vitals resulting in 28% faster page load times, and collaborated in daily Agile scrums.',
      skillsGained: ['React', 'Next.js', 'Tailwind CSS', 'Agile/Jira', 'Jest Unit Testing'],
      status: 'Completed',
      certificateUrl: 'https://certificate.sample.org/verify/NW-8891'
    }
  ],
  certifications: [
    {
      id: 'cert_01',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      issueDate: 'August 2025',
      credentialId: 'META-FE-9921',
      skillsCovered: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Version Control']
    },
    {
      id: 'cert_02',
      title: 'AWS Certified Cloud Practitioner (Foundational)',
      issuer: 'Amazon Web Services',
      issueDate: 'October 2025',
      credentialId: 'AWS-CCP-44120',
      skillsCovered: ['Cloud Architecture', 'AWS S3', 'EC2', 'IAM Security']
    },
    {
      id: 'cert_03',
      title: 'Python for Problem Solving & Data Analytics',
      issuer: 'CareerBridge Academy',
      issueDate: 'January 2026',
      credentialId: 'CB-PY-3019',
      skillsCovered: ['Python', 'Problem Solving', 'Data Analytics', 'Algorithms']
    }
  ],
  assessmentCompleted: true,
  detailedAssessment: {
    personalInfo: {
      name: 'Rahul Sharma',
      age: '21',
      educationLevel: 'Undergraduate (B.Tech / B.E.)',
      courseStream: 'Computer Science & Engineering'
    },
    interests: {
      enjoyTechnology: 5,
      likeHelpingPeople: 4,
      enjoyCreativeWork: 4,
      preferBusinessActivities: 3,
      enjoyResearchAnalysis: 4,
      handsOnBuilding: 5
    },
    skills: {
      communication: 4,
      leadership: 3,
      problemSolving: 5,
      codingTechnical: 5,
      creativity: 4,
      teamwork: 4
    },
    personality: {
      introvertExtrovert: 'ambivert',
      workStyle: 'team-oriented',
      thinkingStyle: 'analytical',
      decisionStyle: 'calculated'
    },
    academicStrengths: {
      favoriteSubjects: ['Data Structures & Algorithms', 'Web Technologies', 'Database Systems', 'Operating Systems'],
      bestPerformingSubjects: ['Object Oriented Programming', 'Database Management Systems', 'Discrete Mathematics'],
      previousAchievements: 'Top 5% in University Coding Sprint 2025; Finalist in Smart India Hackathon; AWS Cloud Practitioner Certified.'
    }
  },
  assessmentScores: {
    analytical: 85,
    technical: 90,
    creative: 75,
    social: 70,
    management: 65
  },
  recommendedCareers: [
    {
      id: 'car_01',
      title: 'Full Stack Software Engineer',
      industry: 'Software & Internet Technology',
      matchScore: 92,
      description: 'Designs, develops, and maintains both client-facing frontends and robust server-side APIs, databases, and microservices.',
      avgSalary: '$85,000 - $115,000 / ₹12 - 22 LPA',
      demandLevel: 'Very High',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Razorpay', 'Uber'],
      whyRelevant: 'Your high technical proficiency (90%) and strong analytical mindset align with building scalable end-to-end web architectures. Your projects already demonstrate React and Node.js aptitude.',
      requiredSkills: ['React / Frontend Framework', 'Node.js / Backend', 'PostgreSQL / SQL', 'System Design', 'Docker & CI/CD', 'DSA & Problem Solving'],
      coreResponsibilities: [
        'Develop end-to-end web architectures from UI components to relational databases',
        'Write clean, modular code with comprehensive automated tests',
        'Collaborate with Product Managers and UX Designers to deliver user features'
      ]
    },
    {
      id: 'car_02',
      title: 'Cloud DevOps Engineer',
      industry: 'Infrastructure & Cloud Computing',
      matchScore: 82,
      description: 'Automates software delivery pipelines, manages cloud infrastructure reliability, orchestrates containers, and safeguards production uptime.',
      avgSalary: '$90,000 - $125,000 / ₹14 - 24 LPA',
      demandLevel: 'Very High',
      topCompanies: ['AWS', 'Cisco', 'RedHat', 'Infosys', 'Salesforce'],
      whyRelevant: 'Your interest in cloud computing and your AWS Cloud Practitioner certification indicate a natural capability for building automated deployment pipelines.',
      requiredSkills: ['Docker & Kubernetes', 'AWS / Azure', 'CI/CD Pipelines (GitHub Actions)', 'Linux & Shell Scripting', 'Infrastructure as Code (Terraform)'],
      coreResponsibilities: [
        'Build and maintain continuous integration and continuous deployment pipelines',
        'Monitor production infrastructure health and respond to service incidents',
        'Implement Infrastructure as Code for scalable cloud environments'
      ]
    },
    {
      id: 'car_03',
      title: 'AI & Data Solutions Engineer',
      industry: 'Artificial Intelligence & Big Data',
      matchScore: 78,
      description: 'Integrates machine learning models and generative AI capabilities into production applications, managing data pipelines and inference APIs.',
      avgSalary: '$95,000 - $130,000 / ₹15 - 28 LPA',
      demandLevel: 'Very High',
      topCompanies: ['NVIDIA', 'OpenAI', 'Google DeepMind', 'Fractal Analytics', 'Databricks'],
      whyRelevant: 'Your solid mathematical aptitude and Python foundation provide an ideal stepping stone into machine learning pipelines and LLM application integrations.',
      requiredSkills: ['Python & Pandas', 'Machine Learning Fundamentals', 'API Development', 'Prompt Engineering & Vector DBs', 'SQL & Data Warehousing'],
      coreResponsibilities: [
        'Connect AI models and vector embeddings into software systems',
        'Clean, preprocess, and pipeline structured and unstructured datasets',
        'Optimize inference latency and monitor model drift'
      ]
    }
  ],
  placementReadiness: {
    overall: 78,
    aptitudeScore: 82,
    technicalScore: 76,
    hrScore: 74,
    resumeScore: 85,
    completedMockInterviews: 3
  },
  resumeData: {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@apex.edu',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    github: 'github.com/rahul-sharma-code',
    linkedin: 'linkedin.com/in/rahul-sharma-dev',
    portfolio: 'rahulsharma.dev',
    summary: 'Results-driven 3rd-year Computer Science undergraduate with practical experience in Full Stack development, modern React, Node.js, and cloud platforms. Proven track record of shipping college and industry projects with 8.7 CGPA.',
    education: [
      {
        institution: 'Apex Institute of Technology',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        year: '2022 - 2026',
        score: 'CGPA: 8.7 / 10'
      },
      {
        institution: 'Delhi Public School, R.K. Puram',
        degree: 'Senior Secondary (Class XII CBSE)',
        field: 'Science (PCM + CS)',
        year: '2020 - 2022',
        score: '94.2%'
      }
    ],
    experience: [
      {
        role: 'Frontend Engineering Intern',
        company: 'NextWave Digital Labs',
        duration: 'May 2025 - July 2025',
        location: 'Remote',
        bullets: [
          'Engineered responsive customer onboarding flows in React and Tailwind CSS for 45,000+ active users.',
          'Reduced time-to-interactive by 28% through code splitting, lazy loading, and SVG sprite optimizations.',
          'Participated in daily Agile standups and authored automated unit tests using Jest and React Testing Library.'
        ]
      }
    ],
    projects: [
      {
        title: 'EduSync - Campus Collaboration Hub',
        tech: 'React, Node.js, Socket.io, Tailwind CSS, PostgreSQL',
        link: 'github.com/rahul/edusync',
        description: 'Built a real-time collaborative platform for 800+ college peers featuring instant document synchronization, markdown notes, and kanban study organizers.'
      },
      {
        title: 'HealthTrack Microservices API',
        tech: 'Node.js, Express, Docker, Redis, JWT',
        link: 'github.com/rahul/healthtrack-api',
        description: 'Architected high-throughput patient management microservice with rate limiting, tokenized auth, and Redis caching for under 40ms query latency.'
      }
    ],
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React.js',
      'Node.js & Express',
      'PostgreSQL',
      'Python',
      'Data Structures & Algorithms',
      'Git & CI/CD',
      'Docker Fundamentals'
    ],
    certifications: [
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'AWS Certified Cloud Practitioner (Amazon Web Services)'
    ],
    template: 'modern'
  }
};

export const initialCollegeProfile: CollegeProfile = {
  id: 'col_01',
  officerName: 'Dr. Arvind Menon',
  designation: 'Head, Training & Placement Cell',
  collegeName: 'Apex Institute of Technology',
  email: 'tpo@apex.edu',
  phone: '+91 80 2345 6789',
  location: 'Electronic City, Bangalore, Karnataka',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  placementStats: {
    totalEligibleStudents: 480,
    placedStudents: 362,
    placementPercentage: 75.4,
    averagePackage: '₹8.4 LPA',
    highestPackage: '₹42.0 LPA',
    activeDrives: 8,
    partnerCompanies: 112
  }
};

export const initialEmployerProfile: EmployerProfile = {
  id: 'emp_01',
  companyName: 'CloudScale Technologies',
  recruiterName: 'Sarah Jenkins',
  recruiterRole: 'University Talent Acquisition Lead',
  email: 'careers@cloudscale.tech',
  phone: '+1 (415) 890-3412',
  website: 'https://cloudscale.tech',
  location: 'San Francisco, CA & Bangalore Hub',
  industry: 'Enterprise Cloud & SaaS',
  companySize: '500 - 1000 Employees',
  description: 'CloudScale is building next-generation serverless observability and multi-cloud optimization platforms trusted by Fortune 500 engineering teams.',
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'
};

export const initialCourses: Course[] = [
  {
    id: 'crs_py',
    title: 'Python for Beginners',
    category: 'Technical',
    instructor: 'Anita Sharma',
    instructorRole: 'Senior Python Engineer & Educator',
    duration: '12 Hours • 5 Modules',
    level: 'Beginner',
    rating: 4.9,
    enrolledCount: 6840,
    description: 'Master core programming fundamentals with Python. Learn variables, control flows, data structures, automation scripts, and problem-solving basics.',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Python', 'Programming', 'Problem Solving', 'Databases', 'Git'],
    certificateAvailable: true,
    enrolled: true,
    progress: 68,
    completed: false,
    modules: [
      { id: 'm_py1', title: 'Python Syntax, Variables & Control Flow', duration: '2.0 hrs', completed: true, type: 'video' },
      { id: 'm_py2', title: 'Functions, Scopes and Modular Code', duration: '2.5 hrs', completed: true, type: 'video' },
      { id: 'm_py3', title: 'Lists, Dictionaries and Data Manipulation', duration: '3.0 hrs', completed: true, type: 'video' },
      { id: 'm_py4', title: 'Object-Oriented Programming & Exceptions', duration: '2.5 hrs', completed: false, type: 'reading' },
      { id: 'm_py5', title: 'Hands-on Automation Project & Final Quiz', duration: '2.0 hrs', completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'crs_01',
    title: 'Modern Full-Stack Development with React & Node',
    category: 'Technical',
    instructor: 'Alex Rivera',
    instructorRole: 'Staff Software Architect, ex-Stripe',
    duration: '18 Hours • 6 Modules',
    level: 'Intermediate',
    rating: 4.8,
    enrolledCount: 3420,
    description: 'Master industry-grade full-stack web applications. Learn state architecture, RESTful API design, database ORMs, JWT security, and Dockerized deployment.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['React.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'Authentication'],
    certificateAvailable: true,
    enrolled: true,
    progress: 70,
    completed: false,
    modules: [
      { id: 'm1', title: 'Modern React Architecture & Component Patterns', duration: '2.5 hrs', completed: true, type: 'video' },
      { id: 'm2', title: 'State Management & Custom React Hooks', duration: '3.0 hrs', completed: true, type: 'video' },
      { id: 'm3', title: 'Express.js Backend & Middleware Design', duration: '3.2 hrs', completed: true, type: 'video' },
      { id: 'm4', title: 'Relational Database Modeling with Prisma & PostgreSQL', duration: '3.5 hrs', completed: false, type: 'video' },
      { id: 'm5', title: 'API Security, JWT Authentication & Rate Limiting', duration: '2.8 hrs', completed: false, type: 'reading' },
      { id: 'm6', title: 'End-to-End Capstone Project & Deployment', duration: '3.0 hrs', completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'crs_02',
    title: 'Executive Communication & Campus-to-Corporate Transition',
    category: 'Communication',
    instructor: 'Pooja Varma',
    instructorRole: 'Global Leadership Coach',
    duration: '8 Hours • 4 Modules',
    level: 'Beginner',
    rating: 4.9,
    enrolledCount: 4210,
    description: 'Elevate your verbal clarity, business email etiquette, presentation storytelling, and active listening skills required to shine in corporate interviews.',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Public Speaking', 'Executive Email Etiquette', 'Active Listening', 'Conflict Resolution'],
    certificateAvailable: true,
    enrolled: true,
    progress: 100,
    completed: true,
    completedAt: '2026-02-14',
    modules: [
      { id: 'm201', title: 'Foundations of High-Impact Workplace Communication', duration: '2.0 hrs', completed: true, type: 'video' },
      { id: 'm202', title: 'The Art of Storytelling in Technical Presentations', duration: '2.0 hrs', completed: true, type: 'video' },
      { id: 'm203', title: 'Crafting Persuasive Emails & Slack Messages', duration: '2.0 hrs', completed: true, type: 'reading' },
      { id: 'm204', title: 'Cross-functional Collaboration & Feedback Loops', duration: '2.0 hrs', completed: true, type: 'quiz' }
    ]
  },
  {
    id: 'crs_03',
    title: 'Cracking the Coding Interview: DSA Mastery',
    category: 'Interview Preparation',
    instructor: 'David Chen',
    instructorRole: 'Lead Algorithms Researcher',
    duration: '24 Hours • 8 Modules',
    level: 'Advanced',
    rating: 4.9,
    enrolledCount: 5600,
    description: 'Comprehensive walkthrough of arrays, linked lists, trees, graphs, dynamic programming, and binary search patterns commonly tested by top tech companies.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Data Structures', 'Algorithms', 'Time Complexity Analysis', 'Binary Trees', 'Dynamic Programming'],
    certificateAvailable: true,
    enrolled: true,
    progress: 45,
    completed: false,
    modules: [
      { id: 'm301', title: 'Big-O Asymptotic Analysis & Space Optimization', duration: '2.5 hrs', completed: true, type: 'video' },
      { id: 'm302', title: 'Two Pointers & Sliding Window Mastery', duration: '3.0 hrs', completed: true, type: 'video' },
      { id: 'm303', title: 'Binary Trees & Tree Traversals Deep Dive', duration: '3.5 hrs', completed: false, type: 'video' },
      { id: 'm304', title: 'Graph BFS/DFS and Shortest Path Algorithms', duration: '4.0 hrs', completed: false, type: 'video' },
      { id: 'm305', title: 'Dynamic Programming Top-Down & Bottom-Up', duration: '4.5 hrs', completed: false, type: 'video' },
      { id: 'm306', title: 'System Design Patterns for Fresh Graduates', duration: '3.5 hrs', completed: false, type: 'quiz' }
    ]
  },
  {
    id: 'crs_04',
    title: 'ATS-Friendly Resume Writing & Personal Branding',
    category: 'Resume Writing',
    instructor: 'Rachel Adams',
    instructorRole: 'Senior Technical Recruiter',
    duration: '5 Hours • 3 Modules',
    level: 'Beginner',
    rating: 4.8,
    enrolledCount: 2980,
    description: 'Learn how recruiters and automated ATS screen resumes. Transform ordinary bullet points into high-impact quantified achievements with action verbs.',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Resume Architecture', 'Action-Verbs & Quantified Metrics', 'ATS Optimization', 'LinkedIn Branding'],
    certificateAvailable: true,
    enrolled: false,
    progress: 0,
    completed: false,
    modules: [
      { id: 'm401', title: 'How ATS Algorithms Parse Applicant Resumes', duration: '1.5 hrs', completed: false, type: 'video' },
      { id: 'm402', title: 'Transforming Experiences: The XYZ Formula', duration: '2.0 hrs', completed: false, type: 'video' },
      { id: 'm403', title: 'Portfolio Curation & LinkedIn Profile Optimization', duration: '1.5 hrs', completed: false, type: 'reading' }
    ]
  },
  {
    id: 'crs_05',
    title: 'Analytical Problem Solving & Critical Thinking for Engineers',
    category: 'Problem Solving',
    instructor: 'Dr. Marcus Vance',
    instructorRole: 'Professor of Cognitive Informatics',
    duration: '10 Hours • 5 Modules',
    level: 'Intermediate',
    rating: 4.7,
    enrolledCount: 1890,
    description: 'Deconstruct ambiguous real-world challenges, apply root-cause analysis, MECE breakdown principles, and design resilient logical solutions.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Root-Cause Analysis', 'First Principles Thinking', 'Quantitative Logic', 'Decision Frameworks'],
    certificateAvailable: true,
    enrolled: false,
    progress: 0,
    completed: false,
    modules: [
      { id: 'm501', title: 'First Principles Thinking in Software Architecture', duration: '2.0 hrs', completed: false, type: 'video' },
      { id: 'm502', title: 'Root-Cause Analysis (The 5 Whys Method)', duration: '2.0 hrs', completed: false, type: 'video' },
      { id: 'm503', title: 'Case Studies: Debugging Enterprise Production Outages', duration: '2.5 hrs', completed: false, type: 'reading' }
    ]
  },
  {
    id: 'crs_06',
    title: 'Cloud Architecture & DevOps Essentials (Docker, CI/CD, AWS)',
    category: 'Digital Skills',
    instructor: 'Siddharth Nair',
    instructorRole: 'Principal Cloud Specialist',
    duration: '14 Hours • 6 Modules',
    level: 'Intermediate',
    rating: 4.9,
    enrolledCount: 3100,
    description: 'Bridge the gap between code on localhost and production cloud deployment. Containerize applications with Docker, build GitHub Actions pipelines, and deploy on AWS.',
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Docker', 'AWS Services', 'GitHub Actions CI/CD', 'Linux Shell', 'Cloud Security'],
    certificateAvailable: true,
    enrolled: false,
    progress: 0,
    completed: false,
    modules: [
      { id: 'm601', title: 'Introduction to Containers & Dockerfile Best Practices', duration: '2.5 hrs', completed: false, type: 'video' },
      { id: 'm602', title: 'Multi-Container Orchestration with Docker Compose', duration: '2.5 hrs', completed: false, type: 'video' },
      { id: 'm603', title: 'Automated CI/CD with GitHub Actions', duration: '3.0 hrs', completed: false, type: 'video' },
      { id: 'm604', title: 'Core AWS Services: EC2, S3, RDS & VPCs', duration: '3.5 hrs', completed: false, type: 'reading' }
    ]
  },
  {
    id: 'crs_07',
    title: 'Student Leadership & Agile Project Management',
    category: 'Leadership',
    instructor: 'Elena Rostova',
    instructorRole: 'Head of People Operations',
    duration: '7 Hours • 3 Modules',
    level: 'Beginner',
    rating: 4.8,
    enrolledCount: 1450,
    description: 'Learn how to lead student teams, organize hackathon squads, facilitate Agile sprints, resolve interpersonal friction, and deliver on target.',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
    skillsCovered: ['Team Leadership', 'Agile/Scrum', 'Stakeholder Management', 'Time Allocation'],
    certificateAvailable: true,
    enrolled: false,
    progress: 0,
    completed: false,
    modules: [
      { id: 'm701', title: 'Agile & Scrum Fundamentals for Campus Teams', duration: '2.0 hrs', completed: false, type: 'video' },
      { id: 'm702', title: 'Conflict Resolution & Motivating High Performers', duration: '2.5 hrs', completed: false, type: 'video' },
      { id: 'm703', title: 'Sprint Retrospectives & Continuous Improvement', duration: '2.5 hrs', completed: false, type: 'reading' }
    ]
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp_job_01',
    title: 'Junior Software Developer',
    companyOrOrg: 'TechBridge Systems',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=80',
    type: 'job',
    location: 'Bengaluru',
    workMode: 'On-site',
    duration: 'Full-time',
    stipendOrSalary: '₹8.5 - ₹13.5 LPA',
    field: 'Software Engineering',
    skillsRequired: ['Python', 'SQL', 'Git', 'Problem Solving'],
    experience: '0 - 1 Years (Freshers Eligible)',
    description: 'Build enterprise web applications, write performant SQL queries, integrate microservices, and collaborate in Agile sprint cycles.',
    requirements: [
      'Degree in Computer Science, IT, or related technical field',
      'Solid command of Python programming and relational databases',
      'Familiarity with Git version control and team workflows'
    ],
    deadline: '2026-11-20',
    openings: 8,
    applicantsCount: 74,
    eligibility: 'All 2026 Graduates with strong coding fundamentals',
    postedByRole: 'employer',
    status: 'active',
    featured: true
  },
  {
    id: 'opp_ws_01',
    title: 'Full-Stack System Architecture & Microservices Workshop',
    companyOrOrg: 'Cloud Engineering Alliance',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    type: 'workshop',
    location: 'Online Live',
    workMode: 'Remote',
    duration: '2-Day Intensive (Weekend)',
    stipendOrSalary: 'Free Campus Pass + Certificate',
    field: 'System Architecture',
    skillsRequired: ['System Design', 'Microservices', 'REST APIs', 'Cloud Scalability'],
    experience: 'Open to all students',
    description: 'Live interactive masterclass exploring distributed system architectures, load balancers, caching strategies, and placement interview case studies.',
    requirements: ['Basic understanding of web technologies and client-server architecture'],
    deadline: '2026-10-18',
    openings: 200,
    applicantsCount: 135,
    eligibility: 'Open to all college students',
    postedByRole: 'employer',
    status: 'active'
  },
  {
    id: 'opp_01',
    title: 'Software Development Engineering Intern (Summer 2026)',
    companyOrOrg: 'CloudScale Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    type: 'internship',
    location: 'Bangalore / Hybrid',
    workMode: 'Hybrid',
    duration: '3 Months (Jun - Aug 2026)',
    stipendOrSalary: '₹45,000 / month',
    field: 'Software Engineering',
    skillsRequired: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git'],
    description: 'Join our Core Platform squad to build high-throughput dashboard telemetry and API gateways for enterprise cloud deployments. Strong pre-placement offer (PPO) opportunities.',
    requirements: [
      'Currently enrolled in 3rd or 4th year B.Tech/BE Computer Science or equivalent',
      'Strong knowledge of JavaScript/TypeScript and at least one backend language',
      'Familiarity with relational databases and RESTful API standards',
      'Minimum CGPA of 7.5'
    ],
    deadline: '2026-10-30',
    openings: 5,
    applicantsCount: 68,
    eligibility: 'B.Tech CSE/IT/ECE, 2026 Batch, CGPA >= 7.5',
    postedByRole: 'employer',
    status: 'active',
    featured: true
  },
  {
    id: 'opp_02',
    title: 'Associate Full Stack Developer (Placement Drive)',
    companyOrOrg: 'NexaHealth Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    type: 'job',
    location: 'Hyderabad / Pune',
    workMode: 'On-site',
    duration: 'Full-Time Employment',
    stipendOrSalary: '₹12.5 - ₹16.0 LPA',
    field: 'Full Stack Engineering',
    skillsRequired: ['React', 'Node.js', 'Python', 'SQL', 'Docker'],
    description: 'Build mission-critical digital health solutions connecting hospitals, diagnostic centers, and patients across India and Southeast Asia.',
    requirements: [
      'Graduating batch of 2026',
      'Proven projects in React and Node.js or Python backend',
      'Solid command of Data Structures, Algorithms, and Object-Oriented Design'
    ],
    deadline: '2026-11-15',
    openings: 12,
    applicantsCount: 142,
    eligibility: 'All Engineering streams with coding proficiency, CGPA >= 7.0',
    postedByRole: 'employer',
    status: 'active',
    featured: true
  },
  {
    id: 'opp_03',
    title: 'Smart Campus IoT & Energy Management System',
    companyOrOrg: 'Apex Institute Research Center',
    companyLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    type: 'college_project',
    location: 'On-Campus (IoT Lab)',
    workMode: 'On-site',
    duration: '4 Months',
    stipendOrSalary: 'Funded Project + Certificate',
    field: 'IoT & Embedded Systems',
    skillsRequired: ['Python', 'MQTT', 'React', 'Raspberry Pi', 'Data Visualization'],
    description: 'Faculty-mentored college project to install wireless IoT sensors across academic blocks to monitor real-time energy dissipation and build live dashboards.',
    requirements: [
      'Interest in hardware-software interfaces and sensor networks',
      'Basic scripting in Python or C++',
      'Team commitment of 6-8 hours weekly'
    ],
    deadline: '2026-10-15',
    openings: 4,
    applicantsCount: 19,
    eligibility: '2nd & 3rd Year B.Tech students',
    postedByRole: 'college',
    status: 'active'
  },
  {
    id: 'opp_04',
    title: 'Open Source FinTech Payment Gateway Integrator',
    companyOrOrg: 'FinTech Open Labs',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
    type: 'industry_project',
    location: 'Remote',
    workMode: 'Remote',
    duration: '6 Weeks',
    stipendOrSalary: '₹20,000 Completion Grant',
    field: 'Financial Engineering',
    skillsRequired: ['Node.js', 'Webhooks', 'REST APIs', 'Security', 'Testing'],
    description: 'Real-world industry project with mentor code reviews. Build an idempotent webhook handler and signature verification pipeline for banking gateways.',
    requirements: [
      'Solid grasp of HTTP status codes, cryptography basics (HMAC/SHA256)',
      'Git discipline and documentation writing'
    ],
    deadline: '2026-10-25',
    openings: 8,
    applicantsCount: 47,
    eligibility: 'Open to all college students nationwide',
    postedByRole: 'employer',
    status: 'active'
  },
  {
    id: 'opp_05',
    title: 'National College AI & Web3 Hackathon 2026',
    companyOrOrg: 'National Innovation Council & Apex College',
    companyLogo: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=120&auto=format&fit=crop&q=80',
    type: 'hackathon',
    location: 'Virtual + Grand Finale Bangalore',
    workMode: 'Remote',
    duration: '36-Hour Hackathon',
    stipendOrSalary: '₹5,00,000 Prize Pool',
    field: 'AI / Software Innovation',
    skillsRequired: ['Full Stack', 'AI Models', 'Rapid Prototyping', 'Pitching'],
    description: 'Compete with top college teams across India. Build innovative prototypes addressing Healthcare, Education, Climate Tech, or Smart Governance.',
    requirements: [
      'Teams of 2 to 4 college students',
      'Working demo prototype required for round 2 screening'
    ],
    deadline: '2026-11-01',
    openings: 100,
    applicantsCount: 310,
    eligibility: 'All undergraduate and postgraduate college students',
    postedByRole: 'college',
    status: 'active',
    featured: true
  },
  {
    id: 'opp_06',
    title: 'Masterclass Workshop: System Design & Microservices at Scale',
    companyOrOrg: 'Apex Training & Placement Cell',
    companyLogo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=120&auto=format&fit=crop&q=80',
    type: 'workshop',
    location: 'Auditorium 2 & Live Stream',
    workMode: 'Hybrid',
    duration: '2-Day Weekend Workshop',
    stipendOrSalary: 'Free for Registered Students',
    field: 'Technical Interview Prep',
    skillsRequired: ['Architecture', 'Caching', 'Load Balancers', 'Databases'],
    description: 'Led by Senior Staff Engineers from Uber and Google. Hands-on architectural diagrams, scaling Redis, database sharding, and real interview question drills.',
    requirements: [
      'Familiarity with basic server architectures',
      'Apex College enrollment verification'
    ],
    deadline: '2026-10-08',
    openings: 150,
    applicantsCount: 138,
    eligibility: '3rd & 4th Year B.Tech students',
    postedByRole: 'college',
    status: 'active'
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app_01',
    opportunityId: 'opp_01',
    opportunityTitle: 'Software Development Engineering Intern (Summer 2026)',
    companyName: 'CloudScale Technologies',
    opportunityType: 'Internship',
    studentId: 'std_01',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@apex.edu',
    studentPhone: '+91 98765 43210',
    studentCollege: 'Apex Institute of Technology',
    studentDepartment: 'Computer Science & Engineering',
    studentYear: '3rd Year',
    studentGpa: '8.7',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git'],
    appliedAt: '2026-09-10',
    status: 'Shortlisted',
    coverNote: 'Excited about CloudScale\'s observability suite. Built EduSync and HealthTrack with similar modern React and Node.js microservices.',
    resumeFileName: 'Rahul_Sharma_Resume_2026.pdf',
    feedback: 'Impressive project portfolio and solid React proficiency. Technical round scheduled for next Tuesday.'
  },
  {
    id: 'app_02',
    opportunityId: 'opp_04',
    opportunityTitle: 'Open Source FinTech Payment Gateway Integrator',
    companyName: 'FinTech Open Labs',
    opportunityType: 'Industry Project',
    studentId: 'std_01',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@apex.edu',
    studentPhone: '+91 98765 43210',
    studentCollege: 'Apex Institute of Technology',
    studentDepartment: 'Computer Science & Engineering',
    studentYear: '3rd Year',
    studentGpa: '8.7',
    skills: ['Node.js', 'Webhooks', 'REST APIs'],
    appliedAt: '2026-09-12',
    status: 'Applied',
    coverNote: 'I have hands-on experience handling REST APIs, secure token auth, and rate limiters.',
    resumeFileName: 'Rahul_Sharma_Resume_2026.pdf'
  }
];

export const initialPlacementDrives: PlacementDrive[] = [
  {
    id: 'drv_01',
    companyName: 'CloudScale Technologies',
    role: 'Associate Software Engineer & SDE Intern',
    driveDate: 'October 12, 2026',
    packageOffered: '₹14.0 - 18.0 LPA',
    departmentsEligible: ['Computer Science', 'Information Science', 'Electronics'],
    minCgpa: 7.5,
    status: 'Upcoming',
    registeredCount: 84,
    rounds: ['Online Coding Assessment (DSA)', 'Technical Interview 1 (Core CS)', 'System Design / Project Review', 'HR Discussion']
  },
  {
    id: 'drv_02',
    companyName: 'NexaHealth Solutions',
    role: 'Graduate Software Engineer',
    driveDate: 'October 20, 2026',
    packageOffered: '₹12.5 - 16.0 LPA',
    departmentsEligible: ['All Engineering Branches'],
    minCgpa: 7.0,
    status: 'Upcoming',
    registeredCount: 120,
    rounds: ['Aptitude & Technical MCQ', 'Live Coding Round', 'Technical Deep-Dive', 'Management Fit']
  },
  {
    id: 'drv_03',
    companyName: 'Cognitive Matrix AI',
    role: 'Junior ML & Data Analyst',
    driveDate: 'September 28, 2026',
    packageOffered: '₹11.0 LPA',
    departmentsEligible: ['Computer Science', 'Data Science', 'Mathematics & Computing'],
    minCgpa: 7.8,
    status: 'Ongoing',
    registeredCount: 65,
    rounds: ['Data Analysis Assessment', 'Python & Math Interview', 'HR Round']
  }
];

export const careerAssessmentQuestions = [
  {
    id: 1,
    category: 'Interests',
    question: 'What kind of work problems excite you the most?',
    options: [
      { text: 'Building user-facing web or mobile applications that millions of people interact with daily', trait: 'technical', field: 'Software Development' },
      { text: 'Analyzing complex data patterns, discovering hidden insights, and training predictive models', trait: 'analytical', field: 'Data Science & AI' },
      { text: 'Designing intuitive user experiences, wireframing prototypes, and crafting visual delight', trait: 'creative', field: 'UI/UX Design' },
      { text: 'Coordinating cross-functional teams, prioritizing product roadmaps, and business strategy', trait: 'management', field: 'Product Management' }
    ]
  },
  {
    id: 2,
    category: 'Strengths',
    question: 'When assigned a challenging project, where do your natural strengths lie?',
    options: [
      { text: 'Writing clean, efficient logic and debugging tricky code errors step-by-step', trait: 'technical', field: 'Software Development' },
      { text: 'Conducting deep research, crunching numbers, and finding mathematical correlations', trait: 'analytical', field: 'Data Science & AI' },
      { text: 'Empathizing with end-users, understanding human behavior, and aesthetic composition', trait: 'creative', field: 'UI/UX Design' },
      { text: 'Organizing tasks, running team standups, and communicating with clarity under pressure', trait: 'social', field: 'Product Management' }
    ]
  },
  {
    id: 3,
    category: 'Skills',
    question: 'Which set of tools and technologies do you feel most drawn to learning or mastering?',
    options: [
      { text: 'JavaScript/TypeScript, React, Node.js, SQL, Docker, and Cloud architectures', trait: 'technical', field: 'Software Development' },
      { text: 'Python, Pandas, PyTorch, SQL databases, statistics, and machine learning models', trait: 'analytical', field: 'Data Science & AI' },
      { text: 'Figma, Adobe Creative Suite, user research, wireframing, and design systems', trait: 'creative', field: 'UI/UX Design' },
      { text: 'Jira, Notion, Agile Scrum, Product Analytics (Mixpanel), and business modeling', trait: 'management', field: 'Product Management' }
    ]
  },
  {
    id: 4,
    category: 'Personality & Work Preferences',
    question: 'In what kind of work environment do you think you would thrive the best?',
    options: [
      { text: 'An engineering team solving complex technical architecture and scalability puzzles', trait: 'technical', field: 'Software Development' },
      { text: 'An innovation lab or research team extracting intelligence from big datasets', trait: 'analytical', field: 'Data Science & AI' },
      { text: 'A design studio collaborating on user psychology, brand experience, and UI aesthetics', trait: 'creative', field: 'UI/UX Design' },
      { text: 'A dynamic startup environment balancing client needs, developer tasks, and business growth', trait: 'management', field: 'Product Management' }
    ]
  },
  {
    id: 5,
    category: 'Career Interests',
    question: 'Where would you like to see yourself 3 to 5 years after graduating college?',
    options: [
      { text: 'Senior Software Engineer architecting large-scale distributed systems and apps', trait: 'technical', field: 'Software Development' },
      { text: 'Lead Data Scientist or AI Research Engineer shipping predictive intelligence', trait: 'analytical', field: 'Data Science & AI' },
      { text: 'Principal Product Designer steering design language and user journeys', trait: 'creative', field: 'UI/UX Design' },
      { text: 'Technical Product Manager or Founder leading teams to launch new products', trait: 'management', field: 'Product Management' }
    ]
  }
];

export const mockAptitudeQuestions: AptitudeQuestion[] = [
  {
    id: 1,
    category: 'Quantitative',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: ['65 seconds', '89 seconds', '100 seconds', '72 seconds'],
    correctAnswer: 1,
    explanation: 'Speed of train = 240 / 24 = 10 m/sec. Total distance to cross platform = 240 + 650 = 890 m. Time required = 890 / 10 = 89 seconds.'
  },
  {
    id: 2,
    category: 'Quantitative',
    question: 'If the price of petrol increases by 25%, by what percentage must a person reduce consumption so that overall expenditure remains unchanged?',
    options: ['20%', '25%', '15%', '16.67%'],
    correctAnswer: 0,
    explanation: 'Formula: [R / (100 + R)] * 100% = [25 / 125] * 100 = 1/5 * 100 = 20% reduction.'
  },
  {
    id: 3,
    category: 'Logical Reasoning',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctAnswer: 2,
    explanation: 'The only son of Suresh\'s mother is Suresh himself. Thus, the boy in the photograph is the son of Suresh. Hence, Suresh is the father.'
  },
  {
    id: 4,
    category: 'Logical Reasoning',
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['125', '127', '128', '129'],
    correctAnswer: 1,
    explanation: 'Each term is (previous * 2) + 1: (3*2)+1=7, (7*2)+1=15, (15*2)+1=31, (31*2)+1=63, (63*2)+1=127.'
  },
  {
    id: 5,
    category: 'Verbal Ability',
    question: 'Select the synonym of the word: "PRAGMATIC"',
    options: ['Theoretical', 'Practical', 'Arrogant', 'Elusive'],
    correctAnswer: 1,
    explanation: 'Pragmatic means dealing with things sensibly and realistically based on practical rather than theoretical considerations.'
  },
  {
    id: 6,
    category: 'Verbal Ability',
    question: 'Identify the error in the sentence: "Neither the supervisor nor the engineers (A) / was present (B) / at the site during the inspection (C) / No error (D)"',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 1,
    explanation: 'In "neither... nor", the verb agrees with the subject closest to it. "Engineers" is plural, so it should be "were present" instead of "was present".'
  }
];

export const mockTechnicalQuestions: TechnicalInterviewQuestion[] = [
  {
    id: 1,
    topic: 'Data Structures',
    difficulty: 'Medium',
    question: 'How do you detect a cycle in a singly linked list with O(1) space?',
    answer: 'Use Floyd\'s Cycle Detection Algorithm (Tortoise and Hare). Maintain two pointers: a slow pointer moving 1 step and a fast pointer moving 2 steps. If a cycle exists, the fast pointer will eventually loop back and meet the slow pointer. If the fast pointer reaches null, there is no cycle.',
    keyPoints: [
      'Slow pointer moves by 1 node: slow = slow.next',
      'Fast pointer moves by 2 nodes: fast = fast.next.next',
      'Time complexity is O(N), Space complexity is strictly O(1)'
    ],
    codeSnippet: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`
  },
  {
    id: 2,
    topic: 'Web Development',
    difficulty: 'Easy',
    question: 'Explain the difference between useEffect and useLayoutEffect in React.',
    answer: 'useEffect executes asynchronously after the DOM has been painted to the screen, preventing blocking of browser rendering. useLayoutEffect runs synchronously immediately after DOM mutations but before the browser paints, making it ideal for measuring DOM layout dimensions or preventing screen flicker.',
    keyPoints: [
      'useEffect: Asynchronous, after browser paint (standard for fetching, subscriptions)',
      'useLayoutEffect: Synchronous, before paint (used for DOM measurement and preventing layout shifts)'
    ]
  },
  {
    id: 3,
    topic: 'Databases & SQL',
    difficulty: 'Medium',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    answer: 'WHERE filters rows before any groupings are applied, and cannot filter on aggregate functions. HAVING filters groups after GROUP BY aggregation has been calculated and can evaluate aggregate functions like COUNT(), SUM(), AVG().',
    keyPoints: [
      'WHERE applies to individual rows before aggregation',
      'HAVING applies to grouped summaries after GROUP BY'
    ],
    codeSnippet: `SELECT department, COUNT(*) as emp_count
FROM employees
WHERE salary > 50000
GROUP BY department
HAVING COUNT(*) >= 5;`
  },
  {
    id: 4,
    topic: 'System Design',
    difficulty: 'Medium',
    question: 'What is Horizontal Scaling vs Vertical Scaling, and when would you use each?',
    answer: 'Vertical scaling (scaling up) means adding more CPU, RAM, or storage to a single server. Horizontal scaling (scaling out) means adding more machine instances behind a load balancer. While vertical scaling has hardware ceiling limits and single points of failure, horizontal scaling provides elastic elasticity and fault tolerance for distributed web services.',
    keyPoints: [
      'Vertical: Simpler, zero network latency between components, but hard hardware limit and downtime risk',
      'Horizontal: Near-infinite elasticity, zero-downtime rolling updates, requires stateless services and load balancers'
    ]
  }
];

export const mockHRQuestions: HRQuestion[] = [
  {
    id: 1,
    category: 'General',
    question: 'Tell me about yourself and why you chose your engineering field.',
    sampleAnswer: 'I am a 3rd-year Computer Science student at Apex Institute passionate about full-stack engineering and cloud architectures. During my college journey, I have built practical applications like EduSync, a collaborative study hub, and interned at NextWave Digital where I improved web performance by 28%. I chose computer science because I love turning abstract logic into real products that help people.',
    tips: [
      'Keep it structured: Past (education foundation) -> Present (key projects/internships) -> Future (why this role)',
      'Highlight tangible impact with metrics (e.g., 28% speedup, 800+ users)',
      'Keep duration around 90-120 seconds'
    ]
  },
  {
    id: 2,
    category: 'Behavioral',
    question: 'Describe a time when you faced a conflict in a student team project and how you resolved it.',
    sampleAnswer: 'During our college hackathon project, our backend and frontend developers disagreed on whether to use GraphQL or REST API, which stalled progress for half a day. I scheduled a quick 15-minute whiteboard session where we evaluated both options against our tight 36-hour deadline. We realized our team had stronger existing familiarity with REST and Swagger documentation, which allowed us to deliver the prototype on time and win 2nd place.',
    tips: [
      'Use the STAR framework: Situation, Task, Action, Result',
      'Emphasize emotional intelligence, objective decision-making, and team alignment over ego'
    ],
    starBreakdown: {
      situation: '36-hour hackathon project stalled due to architectural disagreement on APIs.',
      task: 'Facilitate consensus without damaging team morale or missing the submission deadline.',
      action: 'Structured a 15-minute whiteboard criteria matrix comparing delivery speed vs complexity.',
      result: 'Agreed on REST APIs, shipped MVP on time, and secured 2nd place in the competition.'
    }
  },
  {
    id: 3,
    category: 'Situation',
    question: 'Where do you see yourself in 5 years?',
    sampleAnswer: 'In 5 years, I envision myself as a seasoned Senior Software Engineer who deeply understands high-scale system design and mentors junior engineers. I want to have led end-to-end features from inception to production, contributed to architectural decisions, and built reliable systems that serve millions of users.',
    tips: [
      'Show ambition balanced with realistic skill progression',
      'Indicate commitment to craft, leadership, and staying updated with modern engineering standards'
    ]
  }
];

export const careerPathsDatabase: Record<string, {
  title: string;
  requiredSkills: { name: string; category: string; targetLevel: number }[];
  description: string;
  recommendedCourseIds: string[];
}> = {
  'Full Stack Software Engineer': {
    title: 'Full Stack Software Engineer',
    description: 'Builds end-to-end applications spanning reactive frontends, cloud backend microservices, and databases.',
    requiredSkills: [
      { name: 'JavaScript / TypeScript', category: 'Technical', targetLevel: 85 },
      { name: 'React.js', category: 'Technical', targetLevel: 80 },
      { name: 'Node.js & Express', category: 'Technical', targetLevel: 75 },
      { name: 'SQL & PostgreSQL', category: 'Technical', targetLevel: 70 },
      { name: 'Data Structures & Algorithms', category: 'Core', targetLevel: 75 },
      { name: 'Git & GitHub', category: 'Tool', targetLevel: 80 },
      { name: 'Docker & Containerization', category: 'Tool', targetLevel: 65 },
      { name: 'REST & GraphQL APIs', category: 'Technical', targetLevel: 75 },
      { name: 'System Design Basics', category: 'Core', targetLevel: 60 },
      { name: 'Team Communication', category: 'Soft', targetLevel: 75 }
    ],
    recommendedCourseIds: ['crs_01', 'crs_03', 'crs_06', 'crs_02']
  },
  'Cloud DevOps Engineer': {
    title: 'Cloud DevOps Engineer',
    description: 'Automates deployments, ensures 99.99% cloud infrastructure reliability, and manages CI/CD pipelines.',
    requiredSkills: [
      { name: 'Linux & Shell Scripting', category: 'Core', targetLevel: 80 },
      { name: 'Docker & Kubernetes', category: 'Tool', targetLevel: 85 },
      { name: 'AWS / Cloud Architecture', category: 'Technical', targetLevel: 80 },
      { name: 'CI/CD Pipelines (GitHub Actions)', category: 'Tool', targetLevel: 80 },
      { name: 'Infrastructure as Code (Terraform)', category: 'Technical', targetLevel: 70 },
      { name: 'Python / Bash Scripting', category: 'Technical', targetLevel: 75 },
      { name: 'System Monitoring & Prometheus', category: 'Tool', targetLevel: 65 },
      { name: 'Problem Solving under Incident', category: 'Soft', targetLevel: 80 }
    ],
    recommendedCourseIds: ['crs_06', 'crs_05', 'crs_01']
  },
  'AI & Data Solutions Engineer': {
    title: 'AI & Data Solutions Engineer',
    description: 'Develops predictive algorithms, connects large language models, and creates data processing pipelines.',
    requiredSkills: [
      { name: 'Python & Pandas', category: 'Technical', targetLevel: 85 },
      { name: 'Machine Learning Algorithms', category: 'Core', targetLevel: 80 },
      { name: 'SQL & Data Modeling', category: 'Technical', targetLevel: 75 },
      { name: 'Deep Learning & Neural Networks', category: 'Core', targetLevel: 70 },
      { name: 'Prompt Engineering & Vector DBs', category: 'Technical', targetLevel: 70 },
      { name: 'Math, Linear Algebra & Probability', category: 'Core', targetLevel: 75 },
      { name: 'Data Visualization & Storytelling', category: 'Soft', targetLevel: 70 }
    ],
    recommendedCourseIds: ['crs_05', 'crs_02', 'crs_01']
  },
  'UI/UX & Product Designer': {
    title: 'UI/UX & Product Designer',
    description: 'Creates user-centric interfaces, conducts design sprints, builds prototypes, and defines design systems.',
    requiredSkills: [
      { name: 'Figma & Prototyping', category: 'Tool', targetLevel: 90 },
      { name: 'User Research & Persona Mapping', category: 'Core', targetLevel: 80 },
      { name: 'Information Architecture', category: 'Core', targetLevel: 75 },
      { name: 'Design Systems & Component Specs', category: 'Technical', targetLevel: 85 },
      { name: 'Basic HTML/CSS Understanding', category: 'Technical', targetLevel: 60 },
      { name: 'User Empathy & Presentation', category: 'Soft', targetLevel: 85 }
    ],
    recommendedCourseIds: ['crs_02', 'crs_07', 'crs_04']
  }
};
