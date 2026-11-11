// Centralized Indian Tech Recruitment Demo Data for Proof of Work
// All data is explicitly categorized and labeled as demonstration mock data.

export const INITIAL_USER = {
  id: 'cand-001',
  role: 'candidate',
  name: 'Rohan Sharma',
  title: 'Full-Stack & Backend Systems Engineer',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
  banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  bio: 'Final year B.Tech Computer Science and Engineering student at IIT Bombay (Class of 2026). Passionate about high-throughput concurrent Java, distributed Redis caching, and low-latency microservices.',
  location: 'Mumbai, India (Open to Bengaluru, Pune & Remote)',
  email: 'rohan.sharma@iitb.ac.in',
  website: 'https://rohansharma.dev',
  github: 'https://github.com/rohan-sharma-dev',
  
  // 1. Academic Details
  education: {
    institution: 'IIT Bombay',
    degree: 'B.Tech Computer Science and Engineering',
    graduationYear: 2026,
    currentYear: '4th Year (Final Year)',
    cgpa: '9.2 / 10',
    specialization: 'Distributed Systems & Algorithms',
    coursework: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Distributed Systems']
  },

  // 2. Programming Languages
  programmingLanguages: [
    { name: 'Java', proficiency: 'Advanced', years: '3 yrs', verified: true },
    { name: 'TypeScript', proficiency: 'Advanced', years: '3 yrs', verified: true },
    { name: 'C++', proficiency: 'Competitive Programming', years: '3 yrs', verified: true },
    { name: 'Python', proficiency: 'Intermediate', years: '2 yrs', verified: false },
    { name: 'SQL', proficiency: 'Advanced', years: '2 yrs', verified: true }
  ],

  // 3. Technical Skills
  technicalSkills: [
    'Spring Boot & Virtual Threads',
    'PostgreSQL & ACID Transactions',
    'Redis Clustering & Caching',
    'React & Next.js',
    'Docker & CI/CD Pipelines',
    'Kafka Event Streaming',
    'REST & gRPC APIs'
  ],

  // Structured multi-domain skill categories
  skillCategories: [
    {
      id: 'programming',
      title: 'Programming',
      skills: [
        { name: 'Python', percentage: 90 },
        { name: 'JavaScript', percentage: 85 },
        { name: 'React', percentage: 88 },
        { name: 'TypeScript', percentage: 82 }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI & ML',
      skills: [
        { name: 'Agentic AI', percentage: 92 },
        { name: 'LLMs', percentage: 88 },
        { name: 'AI Agent Development', percentage: 90 },
        { name: 'Prompt Engineering', percentage: 85 }
      ]
    },
    {
      id: 'design',
      title: 'Design',
      skills: [
        { name: 'UX/UI Design', percentage: 87 },
        { name: 'Figma', percentage: 83 },
        { name: 'User Research', percentage: 85 },
        { name: 'Prototyping', percentage: 86 }
      ]
    },
    {
      id: 'backend',
      title: 'Backend',
      skills: [
        { name: 'FastAPI', percentage: 88 },
        { name: 'API Integration', percentage: 90 },
        { name: 'Database Design', percentage: 82 },
        { name: 'Postman / REST', percentage: 80 }
      ]
    },
    {
      id: 'tools',
      title: 'Tools',
      skills: [
        { name: 'Git & GitHub', percentage: 89 },
        { name: 'VS Code', percentage: 92 },
        { name: 'Docker', percentage: 78 },
        { name: 'Vercel', percentage: 85 }
      ]
    }
  ],

  // 4. Connected Coding Profiles (Labeled as DEMO DATA)
  codingProfiles: {
    leetcode: {
      username: 'rohan_iitb',
      profileUrl: 'https://leetcode.com/u/rohan_iitb',
      ranking: 'Top 1.9% (Rating: 2,120)',
      contestRating: 2120,
      totalSolved: 642,
      easySolved: 198,
      mediumSolved: 356,
      hardSolved: 88,
      acceptanceRate: '69.2%',
      badges: ['Guardian 2026', 'Knight', '100 Days Streak'],
      isDemoData: true
    },
    codeforces: {
      handle: 'rohan_algo',
      profileUrl: 'https://codeforces.com/profile/tourist', // fallback live handle
      rating: 1824,
      maxRating: 1886,
      rank: 'Candidate Master',
      maxRank: 'Candidate Master',
      contestsCount: 34,
      lastContests: [
        { name: 'Codeforces Round 984 (Div. 2)', rank: 230, change: '+42', newRating: 1824 },
        { name: 'Educational Codeforces Round 171', rank: 412, change: '+18', newRating: 1782 },
        { name: 'Codeforces Round 978 (Div. 2)', rank: 520, change: '-12', newRating: 1764 }
      ],
      isLiveCapable: true
    },
    geeksforgeeks: {
      username: 'rohan_sharma_iitb',
      profileUrl: 'https://www.geeksforgeeks.org/user/rohan_sharma_iitb',
      codingScore: 1920,
      problemsSolved: 480,
      instituteRank: '#3 (IIT Bombay)',
      monthlyStreak: '60 days',
      isDemoData: true
    },
    github: {
      username: 'rohan-sharma-dev',
      profileUrl: 'https://github.com/rohan-sharma-dev',
      publicRepos: 16,
      starsCount: 340,
      contributionsPastYear: 1240,
      topLanguages: ['Java (48%)', 'TypeScript (34%)', 'C++ (12%)', 'SQL (6%)']
    }
  },

  // 5. LinkedIn Integration Schema & State (Prepared for official OpenID Connect OAuth)
  linkedIn: {
    status: 'Not Connected', // 'Connected' | 'Not Connected'
    profileUrl: 'https://www.linkedin.com/in/rohan-sharma-cs-dev',
    memberId: null, // Populated only via verified backend OpenID Connect token
    fullName: null,
    profilePicture: null,
    email: null,
    scopeGranted: [], // e.g. ['openid', 'profile', 'email']
    connectedAt: null,
    consentGiven: false,
    consentTimestamp: null,
    integrationNotice: 'OAuth integration coming soon. Official LinkedIn OpenID Connect credentials will be securely validated via backend server.'
  },

  // 6. Vedam & College Verification System (Separate Academic Trust Tier)
  collegeVerification: {
    status: 'Verified Vedam Cohort', // 'Verified Vedam Cohort' | 'Pending Verification' | 'Unverified'
    collegeEmail: 'rohan.sharma@iitb.ac.in',
    isEmailVerified: true,
    verificationCodeSent: false,
    verifiedAt: '2025-08-15T10:00:00Z',
    vedamStudentId: 'VDM-2026-CS-042',
    cohortTrack: 'Vedam Engineering Fellowship - Systems & Microservices Track',
    academicTrustLevel: 'Level 3 - Cryptographically Verified Institutional Email & Cohort Record'
  },

  // 5. Internships & Experience
  internships: [
    {
      company: 'Razorpay',
      role: 'Software Development Engineer Intern (Payment Systems)',
      period: 'May 2025 - Jul 2025',
      location: 'Bengaluru, India',
      highlights: [
        'Built an idempotency validation gateway in Java preventing duplicate payment charges during network timeouts',
        'Optimized Redis distributed lock acquisition latency from 8ms to 1.2ms under peak load'
      ]
    },
    {
      company: 'Zerodha',
      role: 'Backend Engineering Intern',
      period: 'Dec 2024 - Jan 2025',
      location: 'Bengaluru, India',
      highlights: [
        'Contributed to order queue websocket publisher handling market tick bursts during opening bell hours',
        'Implemented automated unit and regression test suites with 94% coverage'
      ]
    }
  ],

  powScore: 940,
  rank: 'Top 2%',
  verifiedSkills: [
    { name: 'Java & Concurrency', level: 'Expert', score: 96, verifiedCount: 6 },
    { name: 'Data Structures & Algorithms', level: 'Expert', score: 95, verifiedCount: 8 },
    { name: 'TypeScript & Next.js', level: 'Advanced', score: 92, verifiedCount: 7 },
    { name: 'PostgreSQL / Prisma', level: 'Advanced', score: 90, verifiedCount: 5 },
    { name: 'Distributed Systems & Redis', level: 'Advanced', score: 88, verifiedCount: 4 }
  ],
  stats: {
    verifiedProjects: 5,
    challengesSolved: 12,
    codeReviewsPassed: 28,
    employerSaves: 19,
    profileViews: 412
  }
};

export const INITIAL_EMPLOYER = {
  id: 'emp-101',
  role: 'employer',
  company: 'Nexora Technologies',
  name: 'Pooja Kulkarni',
  title: 'Engineering Director & Campus Hiring Lead',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&q=80&w=120',
  website: 'https://nexora.mock',
  industry: 'FinTech & Cloud Infrastructure (India)',
  location: 'Bengaluru, Karnataka',
  openRoles: [
    { id: 'role-1', title: 'Software Development Engineer Intern (SDE Intern)', salary: '₹60,000 / month stipend', location: 'Bengaluru / Hybrid', applicantsCount: 48, tags: ['Java', 'Spring Boot', 'SQL'] },
    { id: 'role-2', title: 'Graduate Engineer Trainee (GET - 2026 Batch)', salary: '₹14 - 18 LPA', location: 'Bengaluru / Pune', applicantsCount: 36, tags: ['React', 'TypeScript', 'Node.js'] },
    { id: 'role-3', title: 'Associate Software Engineer (Backend)', salary: '₹16 - 22 LPA', location: 'Hyderabad, Telangana', applicantsCount: 22, tags: ['Python', 'PostgreSQL', 'Docker'] }
  ],
  savedCandidates: ['cand-001', 'cand-002', 'cand-004']
};

export const INITIAL_ADMIN = {
  id: 'admin-001',
  role: 'admin',
  name: 'Vikramaditya Verma',
  title: 'Platform Lead & Trust & Safety Administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  email: 'admin@proofwork.demo',
  department: 'Operations, Moderation & Security',
  accessLevel: 'Tier 1 - Full Governance',
  lastAuditAction: '2026-11-12T01:40:00Z'
};

export const INITIAL_EMPLOYERS_LIST = [
  {
    id: 'emp-101',
    company: 'Nexora Technologies',
    name: 'Pooja Kulkarni',
    email: 'employer@proofwork.demo',
    role: 'employer',
    title: 'Engineering Director & Campus Hiring Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    location: 'Bengaluru, Karnataka',
    industry: 'FinTech & Cloud Infrastructure',
    verificationStatus: 'Verified Enterprise',
    accountStatus: 'Active',
    membersCount: 8,
    activeListingsCount: 3
  },
  {
    id: 'emp-102',
    company: 'Razorpay Software',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@razorpay.mock',
    role: 'employer',
    title: 'Staff Tech Recruiter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    location: 'Bengaluru, Karnataka',
    industry: 'Payment Gateways & Banking API',
    verificationStatus: 'Verified Enterprise',
    accountStatus: 'Active',
    membersCount: 14,
    activeListingsCount: 5
  },
  {
    id: 'emp-103',
    company: 'KissanAI Labs',
    name: 'Deepika Rao',
    email: 'deepika@kissanai.mock',
    role: 'employer',
    title: 'Founding Engineer & CTO',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    location: 'Hyderabad, Telangana',
    industry: 'AgriTech & AI Agents',
    verificationStatus: 'Pending Verification',
    accountStatus: 'Active',
    membersCount: 3,
    activeListingsCount: 1
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-001',
    timestamp: '2026-11-12 02:15:20',
    actor: 'admin@proofwork.demo',
    action: 'VERIFIED_ORGANIZATION',
    target: 'Razorpay Software (emp-102)',
    details: 'Corporate domain razorpay.com cryptographic DNS verification approved.',
    status: 'Success'
  },
  {
    id: 'log-002',
    timestamp: '2026-11-12 01:45:10',
    actor: 'admin@proofwork.demo',
    action: 'AUDITED_HACKATHON',
    target: 'Smart India Hackathon (hack-sih-2026)',
    details: 'Verified AICTE/MoE official problem statement schedule and nodal centers.',
    status: 'Success'
  },
  {
    id: 'log-003',
    timestamp: '2026-11-11 22:30:00',
    actor: 'system',
    action: 'AUTOMATED_AST_CHECK',
    target: 'cand-001 (Kestrel Stream Repo)',
    details: 'CI verification test suite execution: 34 tests passed, 0 GC pauses.',
    status: 'Verified'
  }
];

export const SAMPLE_CANDIDATES = [
  {
    id: 'cand-001',
    name: 'Rohan Sharma',
    title: 'Full-Stack & Backend Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    location: 'Mumbai (Open to Bengaluru & Pune)',
    experienceLevel: 'Entry-Level / 2026 Batch',
    graduationYear: 2026,
    education: 'IIT Bombay',
    degree: 'B.Tech Computer Science and Engineering',
    cgpa: '9.2 / 10',
    powScore: 940,
    rank: 'Top 2%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Available for 2026 Grad / SDE Intern',
    summary: 'Final year CSE student at IIT Bombay. Prior SDE intern at Razorpay and Zerodha. Guardian on LeetCode (Rating: 2,120) with deep focus on concurrent Java, Redis, and Next.js.',
    programmingLanguages: ['Java', 'TypeScript', 'C++', 'Python', 'SQL'],
    skills: ['Java', 'TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 'Spring Boot'],
    verifiedProjectsCount: 5,
    codingStats: {
      leetcodeSolved: 642,
      leetcodeRating: 2120,
      codeforcesRating: 1824,
      codeforcesRank: 'Candidate Master',
      geeksforgeeksScore: 1920,
      githubStars: 340
    },
    topProject: {
      title: 'Kestrel: High-Throughput Event Broker',
      demoUrl: 'https://kestrel-demo.mock',
      githubUrl: 'https://github.com/rohan-sharma-dev/kestrel',
      badge: 'Verified Production Benchmark (Demo)',
      verifiedHighlights: 'Processed 120,000 msgs/sec with zero GC spikes in simulated load test.'
    }
  },
  {
    id: 'cand-002',
    name: 'Ananya Verma',
    title: 'Frontend Systems & Web Performance Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    location: 'Bengaluru, Karnataka',
    experienceLevel: 'Entry-Level / 2026 Batch',
    graduationYear: 2026,
    education: 'NIT Trichy',
    degree: 'B.Tech Computer Science and Engineering',
    cgpa: '8.9 / 10',
    powScore: 925,
    rank: 'Top 3%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Available Immediately / SDE Intern',
    summary: 'Frontend enthusiast at NIT Trichy. Former frontend intern at Freshworks. Built accessible headless component kit adopted by 1,200+ students. Knight on LeetCode.',
    programmingLanguages: ['TypeScript', 'JavaScript', 'HTML/CSS', 'Python'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Web Accessibility (WCAG AAA)'],
    verifiedProjectsCount: 4,
    codingStats: {
      leetcodeSolved: 510,
      leetcodeRating: 1940,
      codeforcesRating: 1640,
      codeforcesRank: 'Expert',
      geeksforgeeksScore: 1560,
      githubStars: 820
    },
    topProject: {
      title: 'AuraUI: Zero-Runtime Accessible Component Kit',
      demoUrl: 'https://auraui.mock',
      githubUrl: 'https://github.com/ananya-v/auraui',
      badge: 'WCAG AAA Verified (Demo)',
      verifiedHighlights: 'Lightweight headless library with zero layout shifts and 99.4% test coverage.'
    }
  },
  {
    id: 'cand-003',
    name: 'Aditya Singh',
    title: 'AI / Machine Learning & Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    location: 'Hyderabad, Telangana',
    experienceLevel: 'Entry-Level / 2026 Batch',
    graduationYear: 2026,
    education: 'IIIT Hyderabad',
    degree: 'B.Tech CSE (Artificial Intelligence and Machine Learning)',
    cgpa: '9.4 / 10',
    powScore: 955,
    rank: 'Top 1%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Open to Offers (2026 Batch)',
    summary: 'IIIT Hyderabad student specializing in fast LLM inference, vector similarity search, and PyTorch acceleration. Former research intern at Postman AI labs.',
    programmingLanguages: ['Python', 'C++', 'SQL', 'Bash'],
    skills: ['Python', 'PyTorch', 'vLLM', 'FastAPI', 'pgvector', 'Docker'],
    verifiedProjectsCount: 4,
    codingStats: {
      leetcodeSolved: 740,
      leetcodeRating: 2210,
      codeforcesRating: 1940,
      codeforcesRank: 'Candidate Master',
      geeksforgeeksScore: 2040,
      githubStars: 690
    },
    topProject: {
      title: 'VectorPulse: Sub-millisecond Embeddings Ingester',
      demoUrl: 'https://vectorpulse.mock',
      githubUrl: 'https://github.com/aditya-singh/vectorpulse',
      badge: 'Benchmarked Top Performer (Demo)',
      verifiedHighlights: '3.8x faster vector search querying on 5M embeddings benchmark.'
    }
  },
  {
    id: 'cand-004',
    name: 'Priya Nair',
    title: 'Cloud Native & DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300',
    location: 'Kochi, Kerala (Open to Bengaluru)',
    experienceLevel: 'Entry-Level / 2027 Batch',
    graduationYear: 2027,
    education: 'NIT Warangal',
    degree: 'B.Tech Information Technology',
    cgpa: '8.7 / 10',
    powScore: 895,
    rank: 'Top 7%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Available for Summer 2026 Internship',
    summary: '3rd year IT student at NIT Warangal. Experienced with Docker containerization, Kubernetes operator patterns, and Go microservices. Former intern at PhonePe infrastructure.',
    programmingLanguages: ['Go', 'Python', 'TypeScript', 'Bash'],
    skills: ['Kubernetes', 'Go', 'Docker', 'PostgreSQL', 'Terraform'],
    verifiedProjectsCount: 3,
    codingStats: {
      leetcodeSolved: 420,
      leetcodeRating: 1780,
      codeforcesRating: 1510,
      codeforcesRank: 'Specialist',
      geeksforgeeksScore: 1280,
      githubStars: 280
    },
    topProject: {
      title: 'CloudPod: Ephemeral Staging Previews for PRs',
      demoUrl: 'https://cloudpod.mock',
      githubUrl: 'https://github.com/priya-nair/cloudpod',
      badge: 'Security Audited (Demo)',
      verifiedHighlights: 'Decreased automated deployment spin-up latency from 12 mins to 90 seconds.'
    }
  },
  {
    id: 'cand-005',
    name: 'Arjun Mehta',
    title: 'Full Stack Developer & Java Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    location: 'Pune, Maharashtra',
    experienceLevel: 'Entry-Level / 2027 Batch',
    graduationYear: 2027,
    education: 'Ajeenkya DY Patil University',
    degree: 'B.E. Computer Engineering',
    cgpa: '8.4 / 10',
    powScore: 880,
    rank: 'Top 10%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Looking for 6-Month Internship',
    summary: 'Hands-on developer at ADYPU Pune. Built production-ready full stack booking and inventory portals using Java Spring Boot and React. Active GFG problem solver.',
    programmingLanguages: ['Java', 'JavaScript', 'SQL', 'C++'],
    skills: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs', 'Hibernate'],
    verifiedProjectsCount: 3,
    codingStats: {
      leetcodeSolved: 360,
      leetcodeRating: 1680,
      codeforcesRating: 1420,
      codeforcesRank: 'Pupil',
      geeksforgeeksScore: 1480,
      githubStars: 190
    },
    topProject: {
      title: 'QuickMart: Distributed Inventory Ledger',
      demoUrl: 'https://quickmart.mock',
      githubUrl: 'https://github.com/arjun-mehta/quickmart',
      badge: 'ACID Validated (Demo)',
      verifiedHighlights: 'Prevented flash sale inventory overbooking with optimistic database locks.'
    }
  },
  {
    id: 'cand-006',
    name: 'Sneha Reddy',
    title: 'Algorithms & Backend Engineering Student',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    location: 'Hyderabad, Telangana',
    experienceLevel: 'Entry-Level / 2028 Batch',
    graduationYear: 2028,
    education: 'VIT Vellore',
    degree: 'B.Tech Computer Science and Engineering',
    cgpa: '9.1 / 10',
    powScore: 870,
    rank: 'Top 12%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Open to Summer Internship',
    summary: '2nd year CSE undergraduate at VIT Vellore. Keen competitive programmer with 320+ LeetCode problems solved. Strong foundation in dynamic programming and graph theory.',
    programmingLanguages: ['C++', 'Java', 'Python'],
    skills: ['Data Structures & Algorithms', 'C++', 'Java', 'SQL', 'Object-Oriented Design'],
    verifiedProjectsCount: 2,
    codingStats: {
      leetcodeSolved: 320,
      leetcodeRating: 1720,
      codeforcesRating: 1490,
      codeforcesRank: 'Specialist',
      geeksforgeeksScore: 1340,
      githubStars: 120
    },
    topProject: {
      title: 'GraphRoute: Optimal Multi-Stop Logistics Router',
      demoUrl: 'https://graphroute.mock',
      githubUrl: 'https://github.com/sneha-reddy/graphroute',
      badge: 'Algorithms Evaluated (Demo)',
      verifiedHighlights: 'Implemented A* heuristic graph traversal with custom priority heaps.'
    }
  },
  {
    id: 'cand-007',
    name: 'Karthik Iyer',
    title: 'Data Engineering & Analytics Developer',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    location: 'Chennai, Tamil Nadu',
    experienceLevel: 'Entry-Level / 2026 Batch',
    graduationYear: 2026,
    education: 'SRM Institute of Science and Technology',
    degree: 'B.Tech Information Technology',
    cgpa: '8.6 / 10',
    powScore: 890,
    rank: 'Top 8%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Available Immediately / 2026 Grad',
    summary: 'Final year student at SRM Chennai. Passionate about real-time financial data analytics, Apache Kafka pipelines, and pandas/SQL optimization. Former intern at Swiggy analytics team.',
    programmingLanguages: ['Python', 'SQL', 'Java', 'Bash'],
    skills: ['Python', 'SQL', 'Apache Kafka', 'Pandas', 'PostgreSQL', 'Tableau'],
    verifiedProjectsCount: 3,
    codingStats: {
      leetcodeSolved: 390,
      leetcodeRating: 1710,
      codeforcesRating: 1440,
      codeforcesRank: 'Pupil',
      geeksforgeeksScore: 1410,
      githubStars: 160
    },
    topProject: {
      title: 'StreamMetrics: Real-time Window Anomaly Detector',
      demoUrl: 'https://streammetrics.mock',
      githubUrl: 'https://github.com/karthik-iyer/streammetrics',
      badge: 'Data Pipeline Evaluated (Demo)',
      verifiedHighlights: 'Analyzed streaming tick variance across 40,000 events/sec with sub-second sliding windows.'
    }
  },
  {
    id: 'cand-008',
    name: 'Rahul Gupta',
    title: 'Software Development Engineer & DSA Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    location: 'Delhi NCR (Noida / Gurugram)',
    experienceLevel: 'Entry-Level / 2027 Batch',
    graduationYear: 2027,
    education: 'Thapar Institute of Engineering and Technology',
    degree: 'B.E. Computer Engineering',
    cgpa: '8.8 / 10',
    powScore: 905,
    rank: 'Top 6%',
    verificationStatus: 'Verified Candidate (Demo)',
    availability: 'Available for 2026 Internships',
    summary: '3rd year computer engineering student at Thapar. Deeply skilled in Java OOP, microservices, and LeetCode problem solving. Built a collaborative text sync engine using WebSockets.',
    programmingLanguages: ['Java', 'C++', 'JavaScript', 'SQL'],
    skills: ['Java', 'Spring Boot', 'WebSockets', 'MySQL', 'Data Structures & Algorithms'],
    verifiedProjectsCount: 3,
    codingStats: {
      leetcodeSolved: 480,
      leetcodeRating: 1860,
      codeforcesRating: 1580,
      codeforcesRank: 'Specialist',
      geeksforgeeksScore: 1620,
      githubStars: 240
    },
    topProject: {
      title: 'SyncDoc: Low-Latency Collaborative Code Editor',
      demoUrl: 'https://syncdoc.mock',
      githubUrl: 'https://github.com/rahul-gupta/syncdoc',
      badge: 'Concurrency Verified (Demo)',
      verifiedHighlights: 'Maintained sub-40ms operational transformation sync across 12 simultaneous sockets.'
    }
  }
];

export const SAMPLE_PROJECTS = [
  {
    id: 'proj-1',
    candidateId: 'cand-001',
    title: 'Kestrel: High-Throughput Event Broker & Streamer',
    tagline: 'High-throughput event log written with zero garbage collection spikes.',
    category: 'Backend & Systems',
    liveUrl: 'https://kestrel-stream.mock',
    githubUrl: 'https://github.com/rohan-sharma-dev/kestrel',
    architectureImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Java 21', 'Spring Boot', 'Redis', 'WebSockets', 'Docker'],
    verificationStatus: 'Verified (Demo)',
    verificationScore: 98,
    metrics: {
      throughput: '120k events/sec',
      latencyP99: '1.4ms',
      testCoverage: '94%'
    },
    highlights: [
      'Zero-allocation memory pooling in high frequency ring buffers',
      'Raft consensus layer implementation for clustered leader elections',
      'Interactive benchmark dashboard with real-time SVG charting'
    ],
    verifiedBy: 'Proof of Work Test Runner (Demo)',
    date: 'Oct 2026'
  },
  {
    id: 'proj-2',
    candidateId: 'cand-001',
    title: 'PulseGrid: Financial Micro-Tick Live Visualizer',
    tagline: 'Real-time financial exchange orderbook rendered using WebGL shaders.',
    category: 'Frontend Performance',
    liveUrl: 'https://pulsegrid.mock',
    githubUrl: 'https://github.com/rohan-sharma-dev/pulsegrid',
    architectureImageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'TypeScript', 'WebGL', 'Tailwind CSS'],
    verificationStatus: 'Verified (Demo)',
    verificationScore: 95,
    metrics: {
      fps: '60 FPS stable',
      dataRate: '20,000 updates/sec',
      bundleSize: '34 KB gzip'
    },
    highlights: [
      'OffscreenCanvas worker thread separation for frictionless UI thread',
      'Binary WebSocket payload parsing using Uint8Array views',
      'Smooth interpolation of bid/ask depth curves'
    ],
    verifiedBy: 'Proof of Work Benchmark Lab (Demo)',
    date: 'Aug 2026'
  },
  {
    id: 'proj-3',
    candidateId: 'cand-001',
    title: 'HyperSQL: Automated Database Migration & Safety Guard',
    tagline: 'CLI & GitHub Action that statically verifies zero table locks during schema changes.',
    category: 'DevOps & Database',
    liveUrl: 'https://hypersql.mock',
    githubUrl: 'https://github.com/rohan-sharma-dev/hypersql',
    architectureImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    tags: ['PostgreSQL', 'Java', 'CLI', 'GitHub Actions'],
    verificationStatus: 'Verified (Demo)',
    verificationScore: 92,
    metrics: {
      lockPrevention: '100% evaluated',
      cliExecution: '24ms',
      stars: '340+ GitHub'
    },
    highlights: [
      'AST parser evaluating Postgres DDL commands for blocking operations',
      'Interactive visual replay of lock escalations',
      'Built-in safe ALTER TABLE rewrite suggestions'
    ],
    verifiedBy: 'Automated CI/CD Test Harness (Demo)',
    date: 'June 2026'
  }
];

export const SAMPLE_CHALLENGES = [
  {
    id: 'chal-java-1',
    title: 'Java DSA Challenge: Order Matching Engine',
    category: 'Java Programming',
    difficulty: 'Advanced',
    reward: 'Java Systems Verified Badge (Demo)',
    timeEst: '2 - 3 hours',
    deadline: 'Nov 30, 2026',
    participants: 342,
    completionRate: '28%',
    requiredSkills: ['Java 21', 'Spring Boot', 'Multithreading', 'Data Structures'],
    tags: ['Java 21', 'Spring Boot', 'Virtual Threads', 'Low Latency'],
    description: 'Implement an in-memory limit order matching engine using Java Virtual Threads and ring buffer queues capable of processing 100,000 orders/sec without object allocation pauses.',
    requirements: [
      'Zero garbage-collection lock contention in core matching loop',
      'Deterministic order book matching with price-time priority (FIFO)',
      'Thread-safe concurrent order submission with JUnit 5 tests',
      'Clean maven or gradle build script with runnable test harness'
    ],
    submissionCount: 84
  },
  {
    id: 'chal-array-1',
    title: 'Array and String Problems: Subarray Sum & Window Kadane',
    category: 'Data Structures and Algorithms',
    difficulty: 'Medium',
    reward: 'Algorithmic DSA Badge (Demo)',
    timeEst: '1.5 hours',
    deadline: 'Dec 02, 2026',
    participants: 512,
    completionRate: '54%',
    requiredSkills: ['C++', 'Java', 'Two Pointers', 'Sliding Window', 'Kadane'],
    tags: ['Arrays', 'Strings', 'Sliding Window', 'Time Complexity'],
    description: 'Solve optimal sliding window maximum and circular subarray constraints in O(n) time and O(1) auxiliary space without standard library sorting.',
    requirements: [
      'Strict O(n) linear time complexity with proof',
      'Edge case coverage: negative integers, single element arrays, integer overflow',
      'Pass 50 automated hidden test cases with 0 memory errors'
    ],
    submissionCount: 290
  },
  {
    id: 'chal-sql-1',
    title: 'SQL Query Challenge: High-Frequency Ledger & Window Aggregates',
    category: 'Data Analysis',
    difficulty: 'Medium',
    reward: 'Database Mastery Badge (Demo)',
    timeEst: '1.5 hours',
    deadline: 'Dec 05, 2026',
    participants: 418,
    completionRate: '62%',
    requiredSkills: ['PostgreSQL', 'Window Functions', 'Query Optimization', 'Indexes'],
    tags: ['SQL', 'PostgreSQL', 'Window Aggregates', 'CTE'],
    description: 'Write robust analytical SQL queries computing rolling user balances, detecting rapid concurrent transaction spikes, and preventing deadlocks using EXPLAIN ANALYZE.',
    requirements: [
      'Avoid full table scans using composite B-Tree indexes',
      'Use window functions (PARTITION BY, ROW_NUMBER, DENSE_RANK)',
      'Guaranteed query execution under 25ms on 2,000,000 mock rows'
    ],
    submissionCount: 260
  },
  {
    id: 'chal-react-1',
    title: 'React Frontend Task: Virtualized Order Book & Real-Time Ticks',
    category: 'Web Development',
    difficulty: 'Hard',
    reward: 'React Lead Badge (Demo)',
    timeEst: '2 - 3 hours',
    deadline: 'Dec 08, 2026',
    participants: 360,
    completionRate: '38%',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Virtualization'],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
    description: 'Build a smooth 60fps pan/zoom whiteboard render engine capable of rendering 10,000 interactive nodes without dropping frames.',
    requirements: [
      'Viewport frustum culling to render only visible DOM/WebGL elements',
      'Undo/redo state stack optimized with structural sharing',
      'Smooth gesture handling on touchpads and mobile screens'
    ],
    submissionCount: 132
  },
  {
    id: 'chal-uiux-1',
    title: 'UI/UX Design Challenge: Modern Fintech Trading Terminal',
    category: 'UI/UX Design',
    difficulty: 'Medium',
    reward: 'UI/UX Specialist Badge (Demo)',
    timeEst: '2.5 hours',
    deadline: 'Dec 10, 2026',
    participants: 295,
    completionRate: '45%',
    requiredSkills: ['Figma', 'Design Systems', 'Micro-interactions', 'Accessibility'],
    tags: ['UI/UX', 'Design System', 'Dark Mode', 'Figma'],
    description: 'Design an accessible, high-density order execution dashboard with high contrast WCAG AAA compliance, keyboard navigation focus rings, and modular dock panels.',
    requirements: [
      'Interactive Figma or live HTML/CSS prototype',
      'Standardized spacing tokens and typography scale',
      'Full keyboard accessibility and clear visual status states'
    ],
    submissionCount: 110
  },
  {
    id: 'chal-api-1',
    title: 'REST API Development: Idempotent Payment Webhook Service',
    category: 'Web Development',
    difficulty: 'Medium',
    reward: 'API Architect Badge (Demo)',
    timeEst: '2 hours',
    deadline: 'Dec 12, 2026',
    participants: 490,
    completionRate: '58%',
    requiredSkills: ['Node.js / Java', 'Express / Spring Boot', 'Idempotency', 'PostgreSQL'],
    tags: ['REST API', 'Idempotency', 'JWT Auth', 'PostgreSQL'],
    description: 'Design and write an audit-resilient webhook ingest service that guarantees at-most-once state mutation even with duplicated or out-of-order deliveries.',
    requirements: [
      'Database transaction locking or optimistic concurrency checks',
      'Cryptographic HMAC SHA-256 signature verification',
      'Comprehensive unit and integration tests'
    ],
    submissionCount: 284
  },
  {
    id: 'chal-python-1',
    title: 'Python Data Analysis: E-commerce Funnel & Cohort Retention',
    category: 'Data Analysis',
    difficulty: 'Medium',
    reward: 'Data Analyst Badge (Demo)',
    timeEst: '2 hours',
    deadline: 'Dec 15, 2026',
    participants: 380,
    completionRate: '64%',
    requiredSkills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Cohort Analysis'],
    tags: ['Python', 'Pandas', 'Data Analysis', 'Seaborn'],
    description: 'Analyze 500,000 checkout funnel events in Python to compute 30-day cohort retention curves and identify drop-off bottlenecks in the payment gateway flow.',
    requirements: [
      'Vectorized pandas transformations with zero iterative iterrows loops',
      'Statistical z-score anomaly detection on drop-off rates',
      'Clean interactive Jupyter / visualization charts'
    ],
    submissionCount: 240
  },
  {
    id: 'chal-ml-1',
    title: 'Basic Machine Learning: Customer Churn Predictor with ROC-AUC',
    category: 'Basic Machine Learning',
    difficulty: 'Medium',
    reward: 'ML Practitioner Badge (Demo)',
    timeEst: '2 - 3 hours',
    deadline: 'Dec 18, 2026',
    participants: 290,
    completionRate: '46%',
    requiredSkills: ['Python', 'Scikit-Learn', 'Feature Engineering', 'ROC-AUC', 'Random Forest'],
    tags: ['Machine Learning', 'Scikit-Learn', 'Classification', 'Python'],
    description: 'Train and evaluate a supervised classifier predicting customer churn on imbalanced tabular data with hyperparameter tuning and cross-validation.',
    requirements: [
      'Stratified K-Fold cross validation with ROC-AUC score >= 0.88',
      'Handling class imbalance using SMOTE or class weights',
      'Feature importance analysis and confusion matrix report'
    ],
    submissionCount: 130
  },
  {
    id: 'chal-backend-1',
    title: 'Backend Development Challenge: Distributed Rate Limiter with Redis',
    category: 'Backend Development Challenge',
    difficulty: 'Advanced',
    reward: 'Backend Systems Badge (Demo)',
    timeEst: '2 - 3 hours',
    deadline: 'Dec 22, 2026',
    participants: 310,
    completionRate: '32%',
    requiredSkills: ['Go / Java / Node.js', 'Redis Lua Scripts', 'Concurrency', 'Sliding Window'],
    tags: ['Backend', 'Redis', 'Rate Limiting', 'Concurrency'],
    description: 'Implement a token bucket / sliding window rate limiter that handles 50,000 req/sec across clustered worker instances without race conditions.',
    requirements: [
      'Zero external network bottlenecks on Redis key lock contention using atomic Lua script',
      'Provide load testing benchmark report using k6 or autocannon',
      'Graceful fallback when cache node temporarily partitions'
    ],
    submissionCount: 96
  }
];
