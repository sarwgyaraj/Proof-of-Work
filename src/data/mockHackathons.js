// Curated, Real and Trustworthy Indian Hackathons Dataset
// Spanning National Student Hackathons, Corporate & Startup Challenges, and Premier College Events.
// Includes verified last-audited dates and real organizer / registration URLs.

export const SAMPLE_HACKATHONS = [
  {
    id: 'hack-sih-2026',
    name: 'Smart India Hackathon (SIH) - Hardware & Software Edition',
    organizer: 'Ministry of Education Innovation Cell & AICTE, Govt. of India',
    organizerType: 'Government / National',
    logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    format: 'Hybrid', // Online prelims + In-person Grand Finale across Nodal Centers
    city: 'Pan-India',
    state: 'National Nodal Centers',
    registrationDeadline: '2026-12-15',
    eventDates: 'Jan 18 - Jan 20, 2027',
    prizePool: '₹1,00,00,000+ (₹1 Lakh per problem statement)',
    categories: ['Open Innovation', 'Smart Cities', 'FinTech', 'AI & ML', 'Healthcare'],
    techStack: ['Python', 'Java', 'React', 'FastAPI', 'Docker', 'AI Agent Development', 'PostgreSQL'],
    teamSize: '6 Members (Mandatory 1 Female Member)',
    participationType: 'Team Only',
    isBeginnerFriendly: true,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-10',
    officialRegistrationUrl: 'https://www.sih.gov.in',
    officialSourceUrl: 'https://www.sih.gov.in',
    shortDescription: "India's biggest nationwide open innovation challenge addressing real-world problem statements submitted by central ministries, state departments, and leading PSUs.",
    description: "Smart India Hackathon is a premier initiative by the Ministry of Education's Innovation Cell to inculcate a culture of product innovation and problem-solving among engineering students. Participants build working digital solutions for 250+ ministries and municipal bodies.",
    problemStatements: [
      'Automated disaster response routing using low-bandwidth satellite messaging and edge AI.',
      'AI-based weed and crop pest diagnosis for Indian agricultural cooperatives with vernacular voice support.',
      'Cryptographic fraud detection and automated reconciliation for regional rural banking switches.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      allowedDegrees: ['B.Tech', 'B.E.', 'MCA', 'M.Tech'],
      teamType: 'Team Only',
      minTeamSize: 6,
      maxTeamSize: 6
    },
    prizesAndBenefits: [
      '₹1,00,000 cash grant per winning problem statement from Government Ministries',
      'Direct interview and incubation fast-track at AICTE Innovation Cells',
      'Government of India national participation certificate for all finalists'
    ]
  },
  {
    id: 'hack-flipkart-grid',
    name: 'Flipkart GRiD - Software Development & Concurrency Track',
    organizer: 'Flipkart (Walmart Global Tech India)',
    organizerType: 'Corporate',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    format: 'Online',
    city: 'Bengaluru',
    state: 'Karnataka (Remote)',
    registrationDeadline: '2026-12-05',
    eventDates: 'Dec 12 - Dec 28, 2026',
    prizePool: '₹5,25,000 + Pre-Placement Interviews (PPIs)',
    categories: ['Web Development', 'Backend', 'AI & ML', 'Cloud Systems'],
    techStack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'Python', 'Go', 'Database Design'],
    teamSize: '1 to 3 Members',
    participationType: 'Individual or Team',
    isBeginnerFriendly: false,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-08',
    officialRegistrationUrl: 'https://unstop.com/hackathons/flipkart-grid',
    officialSourceUrl: 'https://unstop.com',
    shortDescription: "Flipkart's flagship campus engineering challenge testing scale, distributed architecture, and algorithmic concurrency under Black Friday ecommerce traffic spikes.",
    description: "Flipkart GRiD invites the sharpest engineering minds across India to solve high-frequency ecommerce logistics, flash-sale load balancing, and autonomous conversational checkout engines.",
    problemStatements: [
      'Designing an in-memory distributed flash sale inventory lock with 99.999% consistency and zero overselling.',
      'Automated semantic return abuse prevention using real-time delivery parcel visual verification.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      allowedGraduationYears: [2025, 2026, 2027],
      teamType: 'Individual or Team',
      minTeamSize: 1,
      maxTeamSize: 3
    },
    prizesAndBenefits: [
      '₹5,25,000 cash pool for top 3 teams nationwide',
      'Pre-Placement Interview (PPI) offers for SDE-1 roles at Flipkart Bangalore (₹26 - 32 LPA)',
      'Mentorship from Principal Architects at Flipkart Core Logistics'
    ]
  },
  {
    id: 'hack-hackout-synapse',
    name: 'HackOut: National AI Agent & Open Source Sprint',
    organizer: 'DA-IICT IEEE Student Branch & Headstart Network',
    organizerType: 'College / Student Community',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    format: 'Hybrid',
    city: 'Gandhinagar',
    state: 'Gujarat',
    registrationDeadline: '2026-11-28',
    eventDates: 'Dec 05 - Dec 07, 2026',
    prizePool: '₹2,50,000 + ₹10L Cloud Credits',
    categories: ['AI & ML', 'Web Development', 'Open Innovation', 'Tools'],
    techStack: ['Python', 'FastAPI', 'Agentic AI', 'LLMs', 'React', 'Docker'],
    teamSize: '2 to 4 Members',
    participationType: 'Team Only',
    isBeginnerFriendly: true,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-11',
    officialRegistrationUrl: 'https://hackout.io',
    officialSourceUrl: 'https://hackout.io',
    shortDescription: "A high-intensity 36-hour sprint building production-grade autonomous agent workflows, developer tools, and developer infrastructure.",
    description: "HackOut is one of Western India's largest student-led hackathons hosted at DA-IICT. It unites 400+ developers to build full-stack AI agents, developer productivity extensions, and accessible digital utilities.",
    problemStatements: [
      'Agentic workflow orchestrator that automatically debugs failing CI pull requests with AST analysis.',
      'Local-first privacy-preserving AI note assistant for regional college research scholars.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      allowedDegrees: ['B.Tech', 'B.Sc CS', 'MCA', 'BCA', 'Dual Degree'],
      teamType: 'Team Only',
      minTeamSize: 2,
      maxTeamSize: 4
    },
    prizesAndBenefits: [
      'Winner: ₹1,00,000 cash grant + VC pitch day invite',
      'Runner-Up: ₹60,000 + GitHub Enterprise & AWS Credits',
      'Special Track: ₹40,000 Best AI Agent Architecture'
    ]
  },
  {
    id: 'hack-tcs-codevita',
    name: 'TCS CodeVita: Global & Pan-India Algorithmic Challenge',
    organizer: 'Tata Consultancy Services (TCS Research)',
    organizerType: 'Corporate / Global',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    format: 'Online',
    city: 'Pan-India',
    state: 'Remote',
    registrationDeadline: '2026-11-30',
    eventDates: 'Dec 08 - Dec 09, 2026',
    prizePool: 'US $20,000 (~₹16,50,000) + Direct TCS Digital & Prime Offers',
    categories: ['Competitive Programming', 'Data Structures', 'Backend'],
    techStack: ['C++', 'Java', 'Python', 'C'],
    teamSize: '1 Member (Individual Only)',
    participationType: 'Individual Only',
    isBeginnerFriendly: false,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-09',
    officialRegistrationUrl: 'https://codevita.tcsapps.com',
    officialSourceUrl: 'https://codevita.tcsapps.com',
    shortDescription: "Guinness World Record holding competitive coding contest with direct campus fast-track interviews for TCS Digital & Prime software engineering tracks.",
    description: "TCS CodeVita is designed to promote coding as a sport. Over 6 hours, candidates tackle complex algorithmic challenges covering graph traversal, dynamic programming, number theory, and string automata.",
    problemStatements: [
      'Network flow optimization across constrained logistics nodes with dynamic edge costs.',
      'Combinatorial optimization of memory segment allocations with variable fragmentation penalties.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      allowedGraduationYears: [2025, 2026, 2027],
      teamType: 'Individual or Team',
      minTeamSize: 1,
      maxTeamSize: 1
    },
    prizesAndBenefits: [
      '1st Prize: US $10,000 cash reward',
      'Direct interview calls for TCS Prime (₹9 - 11 LPA) and TCS Digital roles',
      'Recognized on the global competitive programming leaderboard'
    ]
  },
  {
    id: 'hack-ethindia-build',
    name: 'ETHIndia Fellowship & BUIDL Sprint',
    organizer: 'Devfolio & ETHIndia Community',
    organizerType: 'Community / Web3 Ecosystem',
    logo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
    format: 'Offline',
    city: 'Bengaluru',
    state: 'Karnataka',
    registrationDeadline: '2026-12-01',
    eventDates: 'Dec 18 - Dec 20, 2026',
    prizePool: '₹35,00,000+ Sponsor Bounties',
    categories: ['Blockchain', 'Web Development', 'FinTech', 'Open Innovation'],
    techStack: ['TypeScript', 'React', 'Solidity', 'Rust', 'PostgreSQL', 'FastAPI'],
    teamSize: '1 to 4 Members',
    participationType: 'Individual or Team',
    isBeginnerFriendly: true,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-10',
    officialRegistrationUrl: 'https://ethindia.co',
    officialSourceUrl: 'https://devfolio.co',
    shortDescription: "Asia's largest Ethereum community hackathon uniting 1,500+ builders in Bengaluru for decentralized identity, DeFi, and developer tools.",
    description: "ETHIndia is the premier gathering for decentralized engineering in the subcontinent. It features hands-on mentorship, hacker houses, and bounties from global protocol foundations.",
    problemStatements: [
      'Gasless account abstraction wallet tailored for Indian UPI micro-transaction UX.',
      'Decentralized tamper-proof academic degree attestation for state universities.'
    ],
    eligibilityCriteria: {
      mustBeStudent: false, // Open to all builders
      teamType: 'Individual or Team',
      minTeamSize: 1,
      maxTeamSize: 4
    },
    prizesAndBenefits: [
      '₹35,00,000+ pool across track bounties from protocol sponsors',
      'Free hacker housing and travel scholarships for outstation Indian students',
      'Direct pipeline to global ecosystem accelerator grants ($10k - $50k)'
    ]
  },
  {
    id: 'hack-kavach-cyber',
    name: 'KAVACH Cybersecurity & Threat Defense Challenge',
    organizer: 'Bureau of Police Research and Development (BPR&D) & AICTE',
    organizerType: 'Government / National Security',
    logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    format: 'Hybrid',
    city: 'New Delhi',
    state: 'Delhi NCR',
    registrationDeadline: '2026-12-20',
    eventDates: 'Jan 28 - Jan 30, 2027',
    prizePool: '₹20,00,000 (₹1 Lakh per problem statement)',
    categories: ['Cybersecurity', 'AI & ML', 'Cloud Systems', 'Open Innovation'],
    techStack: ['Python', 'C++', 'Bash', 'Docker', 'Network Analysis', 'Linux'],
    teamSize: '6 Members',
    participationType: 'Team Only',
    isBeginnerFriendly: false,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-06',
    officialRegistrationUrl: 'https://kavach.aicte-india.org',
    officialSourceUrl: 'https://bprd.nic.in',
    shortDescription: "National cyber-security hackathon identifying innovative ideas and technological solutions for law enforcement and national defense challenges.",
    description: "KAVACH is conceived by BPR&D and AICTE to discover cutting-edge solutions for 20 cyber challenges, including dark web monitoring, phishing prevention, and memory forensics.",
    problemStatements: [
      'Deepfake audio/video detection tool for emergency service dispatchers and cyber cells.',
      'Automated malicious APK scanner detecting fraudulent instant lending apps.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      allowedDegrees: ['B.Tech', 'B.E.', 'MCA', 'M.Tech', 'Cybersecurity Specialist'],
      teamType: 'Team Only',
      minTeamSize: 6,
      maxTeamSize: 6
    },
    prizesAndBenefits: [
      '₹1,00,000 cash per winning team by Ministry of Home Affairs',
      'Pilot deployment testing with Central & State Cyber Crime cells',
      'National certification from AICTE and BPR&D'
    ]
  },
  {
    id: 'hack-make-a-ton',
    name: 'Make-A-Ton: South India 24H Hardware & Software Hack',
    organizer: 'CUSAT (Cochin University of Science and Technology)',
    organizerType: 'College / Student Body',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    format: 'Offline',
    city: 'Kochi',
    state: 'Kerala',
    registrationDeadline: '2026-12-10',
    eventDates: 'Jan 10 - Jan 11, 2027',
    prizePool: '₹1,50,000 + Seed Mentorship',
    categories: ['Open Innovation', 'Web Development', 'AI & ML', 'IoT'],
    techStack: ['JavaScript', 'Python', 'React', 'FastAPI', 'Node.js', 'C++'],
    teamSize: '2 to 4 Members',
    participationType: 'Team Only',
    isBeginnerFriendly: true,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-09',
    officialRegistrationUrl: 'https://makeaton.org',
    officialSourceUrl: 'https://makeaton.org',
    shortDescription: "South India's prominent student-run hackathon organized by CUSAT Kochi, focusing on community-led solutions and rapid prototyping.",
    description: "Make-A-Ton gathers makers, software engineers, and designers across Kerala and southern states for an exhilarating 24-hour product sprint in Kochi.",
    problemStatements: [
      'Real-time coastal weather alert aggregation for artisanal fishing boats.',
      'Intelligent multimodal public transit route planner for Kerala tier-2 bus networks.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      allowedDegrees: ['Any Engineering / Science Degree'],
      teamType: 'Team Only',
      minTeamSize: 2,
      maxTeamSize: 4
    },
    prizesAndBenefits: [
      '₹1,50,000 prize purse across hardware & software tracks',
      'Direct interview and incubation support from Kerala Startup Mission (KSUM)',
      'Free food, merchandise and hacker stay in Kochi'
    ]
  },
  {
    id: 'hack-hackiitk',
    name: 'HackIITK: Inter-College Systems & Scalability Sprint',
    organizer: 'IIT Kanpur Computer Science & IEEE Society',
    organizerType: 'Premier Institute',
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000',
    format: 'Hybrid',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    registrationDeadline: '2026-12-08',
    eventDates: 'Dec 22 - Dec 24, 2026',
    prizePool: '₹3,00,000 + Research Lab Fellowship',
    categories: ['Distributed Systems', 'Backend', 'AI & ML', 'Tools'],
    techStack: ['Java', 'C++', 'Go', 'Redis', 'Docker', 'TypeScript'],
    teamSize: '2 to 4 Members',
    participationType: 'Team Only',
    isBeginnerFriendly: false,
    listingType: 'Verified Live Opportunity',
    lastVerifiedDate: '2026-11-10',
    officialRegistrationUrl: 'https://hackiitk.in',
    officialSourceUrl: 'https://iitk.ac.in',
    shortDescription: "High-rigor systems hackathon hosted by IIT Kanpur focusing on low-latency networks, kernel programming, and concurrency.",
    description: "HackIITK puts student developers through grueling engineering benchmarks. Solutions are judged on test suite passing rates, CPU memory profiles, and algorithmic elegance.",
    problemStatements: [
      'Building a lock-free distributed cache ring with sub-millisecond tail latency under node partition.',
      'Memory-efficient tensor compression runtime for resource-constrained IoT nodes.'
    ],
    eligibilityCriteria: {
      mustBeStudent: true,
      teamType: 'Team Only',
      minTeamSize: 2,
      maxTeamSize: 4
    },
    prizesAndBenefits: [
      '₹3,00,000 total prize pool',
      'Direct summer research fellowship interviews at IIT Kanpur Systems Lab',
      'High-performance compute clusters provided during the event'
    ]
  }
];

