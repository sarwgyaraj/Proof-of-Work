import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import {
  ShieldCheck,
  Github,
  Globe,
  MapPin,
  Mail,
  Award,
  CheckCircle2,
  ExternalLink,
  Code2,
  Cpu,
  Share2,
  Bookmark,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  ArrowLeft,
  Calendar,
  Clock,
  Check,
  Copy,
  BookOpen,
  GraduationCap,
  Briefcase,
  Trophy,
  BadgeCheck,
  FileCode,
  Building,
  Linkedin
} from 'lucide-react';
import ConnectedCodingProfiles from '../components/ConnectedCodingProfiles';
import LinkedInIntegrationCard from '../components/LinkedInIntegrationCard';
import SkillCategoriesGrid from '../components/SkillCategoriesGrid';

export default function CandidateProfile() {
  const {
    viewedProfileId,
    candidates,
    projects,
    navigateTo,
    toggleSaveCandidate,
    savedCandidateIds,
    setInterviewCandidate,
    showToast,
    currentUser,
    updateProfile
  } = useApp();

  // Redesigned navigation tabs focusing exclusively on CS & Software Engineering
  // 1. Coding Profiles & Stats (LeetCode, Codeforces, GFG, GitHub)
  // 2. Education, Experience & Internships
  // 3. Projects & Codebase Evidence
  // 4. Practical Assessments & Test Benchmarks
  const [activeTab, setActiveTab] = useState('coding-profiles');
  const [copied, setCopied] = useState(false);

  // Match candidate by viewedProfileId or fallback to cand-001
  const candidate =
    candidates.find((c) => c.id === viewedProfileId) || candidates[0];
  const isSaved = savedCandidateIds.includes(candidate.id);

  // Candidate's projects
  const candidateProjects = projects.filter(
    (p) => p.candidateId === candidate.id || candidate.id === 'cand-001'
  );

  const handleShareProfile = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    showToast('Public profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  // Education fallback (Indian context)
  const education = candidate.education || {
    institution: 'IIT Bombay',
    degree: 'B.Tech Computer Science and Engineering',
    graduationYear: candidate.graduationYear || 2026,
    cgpa: '9.2 / 10',
    coursework: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Distributed Systems']
  };

  // Programming languages fallback
  const programmingLanguages = candidate.programmingLanguages || [
    { name: 'Java', proficiency: 'Advanced', years: '3 yrs', verified: true },
    { name: 'TypeScript', proficiency: 'Advanced', years: '3 yrs', verified: true },
    { name: 'C++', proficiency: 'Competitive Programming', years: '3 yrs', verified: true },
    { name: 'Python', proficiency: 'Intermediate', years: '2 yrs', verified: false },
    { name: 'SQL', proficiency: 'Advanced', years: '2 yrs', verified: true }
  ];

  // Technical skills fallback
  const technicalSkills = candidate.skills || [
    'Spring Boot & Virtual Threads',
    'PostgreSQL / Prisma',
    'Redis Clustering & Caching',
    'React & Next.js Core',
    'Docker & CI/CD Pipelines',
    'Kafka Event Streaming',
    'REST & gRPC APIs'
  ];

  // Internships fallback (Indian Tech Ecosystem)
  const internships = [
    {
      company: 'Razorpay',
      role: 'Software Development Engineer Intern (Payment Systems)',
      period: 'May 2025 - Jul 2025',
      location: 'Bengaluru, Karnataka',
      highlights: [
        'Built an idempotency validation gateway in Java preventing duplicate payment charges during network timeouts',
        'Optimized Redis distributed lock acquisition latency from 8ms to 1.2ms under peak load'
      ]
    },
    {
      company: 'Zerodha',
      role: 'Backend Engineering Intern',
      period: 'Dec 2024 - Jan 2025',
      location: 'Bengaluru, Karnataka',
      highlights: [
        'Contributed to order queue websocket publisher handling market tick bursts during opening bell hours',
        'Implemented automated unit and regression test suites with 94% coverage'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb & Share Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('talent')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Talent Directory</span>
        </button>

        <button
          onClick={handleShareProfile}
          className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">URL Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-brand-400" />
              <span>Share Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Profile Header (CS & Software Focus) */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
        
        {/* Banner with code mesh pattern */}
        <div className="h-44 sm:h-56 w-full bg-gradient-to-r from-navy-900 via-brand-950 to-navy-900 relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200')`
            }}
          />
          <div className="absolute bottom-4 right-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Computer Science & Software Verified</span>
            </span>
          </div>
        </div>

        {/* Candidate Basic Information */}
        <div className="p-6 sm:p-8 pt-0 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            
            <div className="flex items-end gap-5">
              <div className="relative shrink-0">
                <Avatar
                  src={candidate.avatar}
                  name={candidate.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-4 border-navy-950 shadow-2xl text-4xl"
                />
                <div
                  className="absolute -bottom-1 -right-1 p-2 bg-brand-600 rounded-2xl text-white shadow-glow-sm"
                  title="Verified CS Candidate"
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {candidate.name}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {candidate.rank || 'Top 2%'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Class of {candidate.graduationYear || 2026}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-medium text-slate-200 mt-1">
                  {candidate.title}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <GraduationCap className="w-4 h-4 text-brand-400" />
                    {typeof candidate.education === 'string' ? candidate.education : `${education.institution} (${education.degree || 'B.Tech CSE'})`}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                    CGPA: {education.cgpa || '8.8 / 10'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {candidate.location}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    ● {candidate.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Recruiter Actions (Visible to Employers & Admins) */}
            {(currentUser?.role === 'employer' || currentUser?.role === 'admin') && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSaveCandidate(candidate.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSaved
                      ? 'bg-violet-600/20 text-violet-300 border-violet-500/40'
                      : 'bg-navy-950 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-violet-400' : ''}`} />
                  <span>{isSaved ? 'Shortlisted' : 'Shortlist Candidate'}</span>
                </button>

                <button
                  onClick={() => setInterviewCandidate(candidate)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Interview / Fast Track</span>
                </button>
              </div>
            )}

          </div>

          {/* Short Introduction / Bio */}
          <div className="max-w-4xl text-sm text-slate-300 leading-relaxed space-y-2">
            <p>{candidate.summary || candidate.bio}</p>

            {/* Profile Trust & Identity Badges (LinkedIn & Vedam Status) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {candidate.linkedIn?.profileUrl && (
                <a
                  href={candidate.linkedIn.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2] border border-[#0A66C2]/30 text-xs font-semibold hover:bg-[#0A66C2]/25 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn Profile Linked</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              )}

              {candidate.collegeVerification?.status && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{candidate.collegeVerification.status}</span>
                </span>
              )}

              {candidate.collegeVerification?.vedamStudentId && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono">
                  ID: {candidate.collegeVerification.vedamStudentId}
                </span>
              )}
            </div>
          </div>

          {/* Core Technical Highlights Ribbon */}
          <div className="mt-8 p-5 rounded-2xl bg-navy-950/90 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-5">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                PoW Skill Score
              </span>
              <div className="text-3xl font-extrabold font-mono text-brand-400 mt-0.5">
                {candidate.powScore} <span className="text-sm font-normal text-slate-500">/ 1000</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-0.5 font-mono">
                {candidate.rank || 'Top 2% Percentile'}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                LeetCode Solved
              </span>
              <div className="text-3xl font-extrabold font-mono text-amber-400 mt-0.5">
                {candidate.codingStats?.leetcodeSolved || 684}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Rating: {candidate.codingStats?.leetcodeRating || 2142} (Guardian)
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                Codeforces Rating
              </span>
              <div className="text-3xl font-extrabold font-mono text-rose-400 mt-0.5">
                {candidate.codingStats?.codeforcesRating || 1845}
              </div>
              <div className="text-[11px] text-rose-300 mt-0.5 font-mono">
                {candidate.codingStats?.codeforcesRank || 'Candidate Master'}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                Verified Repositories
              </span>
              <div className="text-3xl font-extrabold font-mono text-white mt-0.5">
                {candidateProjects.length}
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5 font-mono">
                100% CI passes & live demos
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Revised Navigation Tabs for Technical Recruiter Evaluation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2 overflow-x-auto">
        
        <button
          onClick={() => setActiveTab('coding-profiles')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'coding-profiles'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Connected Coding Profiles (LeetCode, CF, GFG, GitHub)</span>
        </button>

        <button
          onClick={() => setActiveTab('education-experience')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'education-experience'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education, Languages & Experience</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'portfolio'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>GitHub Projects & Code Evidence ({candidateProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'assessments'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Practical Assessments & Benchmarks</span>
        </button>

        <button
          onClick={() => setActiveTab('identity-verification')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'identity-verification'
              ? 'bg-[#0A66C2] text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Linkedin className="w-4 h-4 fill-current" />
          <span>LinkedIn & Academic Verification</span>
        </button>

      </div>

      {/* Tab 1: Connected Coding Profiles (LeetCode, Codeforces, GeeksforGeeks, GitHub) */}
      {activeTab === 'coding-profiles' && (
        <div className="space-y-6">
          <ConnectedCodingProfiles
            codingProfiles={candidate.codingProfiles}
            isEditable={false}
          />
        </div>
      )}

      {/* Tab 2: Education, Programming Languages & Internships */}
      {activeTab === 'education-experience' && (
        <div className="space-y-8">
          
          {/* Education Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-500/20 text-brand-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Education & Academic Background</h3>
                <p className="text-xs text-slate-400">Formal Computer Science training and graduation timeline</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {typeof candidate.education === 'string' ? candidate.education : education.institution}
                  </h4>
                  <p className="text-xs text-brand-300 font-medium">
                    {education.degree} • <span className="text-emerald-400 font-mono font-semibold">CGPA: {education.cgpa || '9.2 / 10'}</span>
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 self-start sm:self-auto">
                  Graduating: {candidate.graduationYear || education.graduationYear}
                </div>
              </div>

              {education.coursework && (
                <div className="pt-2 border-t border-slate-850">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 block mb-1.5">
                    Core CS Coursework:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {education.coursework.map(c => (
                      <span key={c} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-850 text-slate-300 border border-slate-750 font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Categorized Technical Skills Matrix (User Provided Format) */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800">
            <SkillCategoriesGrid
              categories={candidate.skillCategories}
              title="Programming & Technical Skill Proficiencies"
              subtitle="Demonstrated ability & verified code benchmark proficiency by technical domain"
            />
          </div>

          {/* Programming Languages & Technical Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Programming Languages */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-brand-400" />
                Programming Languages
              </h3>

              <div className="space-y-2.5">
                {(Array.isArray(programmingLanguages) ? programmingLanguages : []).map((lang, idx) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const langProf = typeof lang === 'string' ? 'Advanced' : lang.proficiency;
                  const langYears = typeof lang === 'string' ? '2+ yrs' : lang.years;

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-navy-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-brand-400" />
                        <span className="font-bold text-white">{langName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-mono">{langYears}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20 font-semibold">
                          {langProf}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Technical Skills & Frameworks
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {technicalSkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-xs px-3 py-1.5 rounded-xl bg-navy-950 text-slate-200 border border-slate-800 font-mono flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{sk}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Internships & Engineering Experience */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-violet-500/20 text-violet-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Internships & Professional Experience</h3>
                <p className="text-xs text-slate-400">Practical production engineering contributions</p>
              </div>
            </div>

            <div className="space-y-4">
              {internships.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-navy-950 border border-slate-800 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{exp.role}</span>
                      <span className="text-xs text-brand-400 font-semibold">@{exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{exp.period} • {exp.location}</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: h }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: GitHub Projects & Code Evidence */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Verified repositories with reproduction instructions, code quality scans, and live production demos.</span>
          </div>

          <div className="space-y-6">
            {candidateProjects.map((proj) => (
              <div
                key={proj.id}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 glass-panel-hover"
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {proj.verificationStatus}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Date: {proj.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">{proj.title}</h3>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{proj.tagline}</p>
                  </div>

                  <div className="text-right sm:shrink-0 bg-navy-950 px-4 py-2 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">
                      Evaluation Score
                    </span>
                    <span className="text-xl font-mono font-bold text-brand-400">
                      {proj.verificationScore} / 100
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                {proj.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-navy-950 p-4 rounded-2xl border border-slate-800/80 font-mono text-xs">
                    {Object.entries(proj.metrics).map(([k, v]) => (
                      <div key={k} className="p-1.5">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                          {k}
                        </span>
                        <span className="text-white font-semibold text-sm mt-0.5 block truncate">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                {proj.highlights && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Verified Technical Proof Points:
                    </h4>
                    <div className="space-y-2">
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies and Links: GitHub + Live Demo */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors underline"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub Repository (Source)</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Production Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Practical Assessments & Benchmarks */}
      {activeTab === 'assessments' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Practical Assessment Results & Headless Benchmarks</h3>
            <p className="text-xs text-slate-400 mt-1">
              Runtime test outputs, latency traces, and deterministic assessment logs recorded inside isolated containers.
            </p>
          </div>

          <div className="bg-navy-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto">
            <div className="text-slate-500">// Headless load test: Kestrel Distributed Event Log (Go 1.23)</div>
            <div className="text-brand-300">k6 run --vus 500 --duration 60s benchmark_stress.js</div>
            <div className="text-emerald-400">✓ http_req_duration..............: avg=1.12ms min=412µs med=890µs max=9.2ms p(90)=1.3ms p(95)=1.4ms</div>
            <div className="text-emerald-400">✓ ws_connecting_duration.........: avg=2.4ms min=1.1ms med=2.1ms max=6.4ms</div>
            <div className="text-emerald-400">✓ checks.........................: 100.00% ✓ 2,400,960 / ✗ 0</div>
            <div className="text-slate-400">✓ Static AST branch depth........: 3.4 per function (Pass threshold &lt; 10)</div>
          </div>
        </div>
      )}

      {/* Tab 5: LinkedIn Identity & Vedam College Verification */}
      {activeTab === 'identity-verification' && (
        <div className="space-y-6">
          <LinkedInIntegrationCard
            candidate={candidate}
            isOwner={currentUser?.id === candidate.id || candidate.id === 'cand-001'}
            onUpdateLinkedIn={(updatedLinkedIn) => {
              updateProfile?.({ linkedIn: updatedLinkedIn });
            }}
            onUpdateCollegeVerification={(updatedCollege) => {
              updateProfile?.({ collegeVerification: updatedCollege });
            }}
            showToast={showToast}
          />
        </div>
      )}

    </div>
  );
}
