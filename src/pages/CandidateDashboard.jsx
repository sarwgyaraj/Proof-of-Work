import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import LinkedInIntegrationCard from '../components/LinkedInIntegrationCard';
import {
  ShieldCheck,
  Trophy,
  UploadCloud,
  CheckCircle2,
  ExternalLink,
  Github,
  Award,
  ArrowRight,
  Eye,
  Share2,
  Sparkles,
  Layers,
  Edit3,
  Globe,
  Lock,
  Clock,
  Activity,
  Code2,
  Compass,
  Cpu,
  BarChart2,
  Zap,
  TrendingUp,
  Flame,
  Check
} from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';

export default function CandidateDashboard() {
  const {
    currentUser,
    updateProfile,
    toggleVisibility,
    projects,
    challenges,
    navigateTo,
    showToast,
    participateChallenge
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const user = currentUser || {
    name: 'Rohan Sharma',
    title: 'Full-Stack & Backend Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    powScore: 940,
    rank: 'Top 2%',
    location: 'Mumbai, India (Open to Bengaluru, Pune & Remote)',
    availability: 'Available Immediately / 2026 Batch',
    visibility: 'Public',
    education: {
      institution: 'IIT Bombay',
      degree: 'B.Tech Computer Science and Engineering',
      graduationYear: 2026,
      cgpa: '9.2 / 10'
    },
    verifiedSkills: [
      { name: 'Java & Concurrency', level: 'Expert', score: 96, verifiedCount: 6, badge: 'Verified Top 3%' },
      { name: 'Data Structures & Algorithms', level: 'Expert', score: 95, verifiedCount: 8, badge: 'LeetCode 2120+' },
      { name: 'TypeScript & Next.js', level: 'Advanced', score: 92, verifiedCount: 7, badge: 'Production Lead' },
      { name: 'PostgreSQL / Prisma', level: 'Advanced', score: 90, verifiedCount: 5, badge: 'ACID Audited' },
      { name: 'Distributed Systems & Redis', level: 'Advanced', score: 88, verifiedCount: 4, badge: 'Concurrency Pro' },
    ],
    stats: {
      verifiedProjects: 5,
      challengesSolved: 12,
      codeReviewsPassed: 28,
      employerSaves: 19,
      profileViews: 412
    }
  };

  const isPublic = user.visibility !== 'Private';

  // Calculate profile completion percentage based on data completeness
  const calculateCompletion = () => {
    let score = 40; // base (name, role)
    if (user.bio) score += 10;
    if (user.location) score += 10;
    if (user.github) score += 10;
    if (user.linkedIn?.profileUrl) score += 10;
    if (user.collegeVerification?.isEmailVerified) score += 10;
    if (projects.length >= 3) score += 10;
    return Math.min(score, 100);
  };

  const completionPercentage = calculateCompletion();

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin);
    showToast('Public profile link copied to clipboard!');
  };

  // Recent activity feed mock (Indian recruiters)
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Automated Benchmark Passed',
      desc: 'Project "Kestrel: Event Broker" passed 34/34 headless benchmark stress tests.',
      time: '2 hours ago',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'act-2',
      title: 'Profile Shortlisted by Employer',
      desc: 'Pooja Kulkarni (Nexora Technologies - Bengaluru) shortlisted your profile for SDE Intern.',
      time: 'Yesterday',
      icon: Award,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
    },
    {
      id: 'act-3',
      title: 'Skill Challenge Enrolled',
      desc: 'Enrolled in "Java DSA Challenge: Order Matching Engine".',
      time: '3 days ago',
      icon: Trophy,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'act-4',
      title: 'Cryptographic Audit Signed',
      desc: 'Hardware signature verification generated for PoW verified score 940.',
      time: '5 days ago',
      icon: ShieldCheck,
      color: 'text-brand-400 bg-brand-500/10 border-brand-500/20'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* 1. Welcome Section & Candidate Overview */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Identity & Welcome */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <Avatar
                src={user.avatar}
                name={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-brand-500 shadow-glow-sm text-2xl"
              />
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-brand-600 rounded-xl text-white shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome back, {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {user.rank || 'Top 2%'} Verified
                </span>
              </div>
              <p className="text-sm font-medium text-slate-300">{user.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span>{user.location || 'Mumbai, India'}</span>
                <span>•</span>
                <span className="text-brand-300 font-medium">IIT Bombay CSE '26</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  {user.availability || 'Available for SDE Intern'}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Functional Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5 text-brand-400" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => navigateTo('submit-project')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2 transition-all"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>

            <button
              onClick={() => navigateTo('challenges')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Challenges</span>
            </button>

            <button
              onClick={() => navigateTo('profile', user.id || 'cand-001')}
              className="px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-slate-850 text-slate-200 text-xs font-medium border border-slate-800 transition-all flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-violet-400" />
              <span>View Public Profile</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-navy-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="Share Profile Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 2 & 3 & 8. Metric Cards: Skill Score Progress, Profile Completion, & Visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          
          {/* 3. Overall Skill Score with visual progress indicator */}
          <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                Overall PoW Score
              </span>
              <span className="text-brand-400 font-mono font-bold">{user.powScore || 940} / 1000</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${(user.powScore || 940) / 10}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-emerald-400 font-medium">Top 2% Globally</span>
              <span>Audited Level 4</span>
            </div>
          </div>

          {/* 2. Profile Completion Percentage */}
          <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                Profile Completion
              </span>
              <span className="text-emerald-400 font-mono font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">
              {completionPercentage === 100
                ? 'All fields verified & complete'
                : 'Add bio, GitHub & website to reach 100%'}
            </div>
          </div>

          {/* Verified Artifacts count */}
          <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800/90 flex flex-col justify-between">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
              Verified Proofs
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {projects.length} <span className="text-xs font-normal text-slate-400">Repositories</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>100% deterministic test passes</span>
            </div>
          </div>

          {/* 8. Profile Visibility Status */}
          <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800/90 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                Profile Visibility
              </span>
              <button
                onClick={toggleVisibility}
                className="text-[11px] text-brand-400 hover:text-brand-300 underline font-medium"
              >
                Change
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {isPublic ? (
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Public to Employers</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-300 font-bold text-base">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Private (Link Only)</span>
                </div>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              {isPublic ? 'Discoverable in Talent Search' : 'Hidden from public directory'}
            </div>
          </div>

        </div>

      </div>

      {/* 4. Verified Skills Section with Badges */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              Verified Skills & Mastery Badges
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Audited from passing test suites, commit histories, and automated load benchmarks.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto">
            ● 5/5 Skills Independently Audited
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.verifiedSkills?.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800/90 space-y-3 glass-panel-hover"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">{skill.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                  {skill.badge || 'Verified'}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{skill.level}</span>
                  <span className="font-mono text-brand-300 font-bold">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Verified in {skill.verifiedCount} projects</span>
                <span className="text-emerald-400 font-medium">Passed AST Check</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: 5. My Projects (Left) vs 6. Challenges & 7. Recent Activity (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 5. My Projects Section (2 Columns) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-400" />
                My Verified Projects ({projects.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Demonstrated applications with live demos, code repos, and verified benchmarks.
              </p>
            </div>
            <button
              onClick={() => navigateTo('submit-project')}
              className="px-3.5 py-1.5 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 text-brand-200 border border-brand-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>+ Add Project</span>
            </button>
          </div>

          {/* Project Cards */}
          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover space-y-4"
              >
                {/* Header: Name, Verification Status, Score */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-bold text-white text-base tracking-tight">{proj.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        proj.verificationStatus.includes('Verified')
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      }`}>
                        {proj.verificationStatus}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{proj.tagline}</p>
                  </div>

                  {/* Evaluated Score */}
                  {proj.verificationScore && (
                    <div className="text-left sm:text-right shrink-0 bg-navy-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Evaluation Score</div>
                      <div className="text-sm font-mono font-bold text-brand-400">{proj.verificationScore} / 100</div>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                {proj.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-navy-950 p-3 rounded-2xl border border-slate-800/80 font-mono text-xs">
                    {Object.entries(proj.metrics).map(([k, v]) => (
                      <div key={k} className="p-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{k}</span>
                        <span className="text-slate-200 font-medium truncate block">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies used & Links */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-4 text-xs font-medium">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-brand-400 hover:text-brand-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 6. Available Skill Challenges & 7. Recent Activity */}
        <div className="space-y-6">
          
          {/* 6. Available Skill Challenges */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Skill Challenges
                </h3>
                <p className="text-[11px] text-slate-400">Solve benchmarks to increase your PoW score</p>
              </div>
              <button
                onClick={() => navigateTo('challenges')}
                className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {challenges.slice(0, 3).map((ch) => (
                <div
                  key={ch.id}
                  className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-2.5 glass-panel-hover"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                      {ch.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                      ch.difficulty === 'Hard' || ch.difficulty === 'Advanced'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {ch.difficulty}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1">{ch.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{ch.description}</p>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Est. {ch.timeEst}</span>
                    <button
                      onClick={() => participateChallenge(ch.id)}
                      className="px-2.5 py-1 rounded-lg bg-brand-600/30 hover:bg-brand-600/50 text-brand-200 text-[11px] font-semibold border border-brand-500/30 transition-colors"
                    >
                      Solve Challenge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Recent Activity Section */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-brand-400" />
              Recent Activity
            </h3>

            <div className="space-y-4 text-xs">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${act.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-semibold text-xs">{act.title}</span>
                        <span className="text-[10px] text-slate-500">{act.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 8. LinkedIn & Institutional Trust Integration Module */}
      <LinkedInIntegrationCard
        candidate={user}
        isOwner={true}
        onUpdateLinkedIn={(updatedLinkedIn) => {
          updateProfile({ linkedIn: updatedLinkedIn });
        }}
        onUpdateCollegeVerification={(updatedCollege) => {
          updateProfile({ collegeVerification: updatedCollege });
        }}
        showToast={showToast}
      />

      {/* Edit Profile Modal Dialog */}
      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateProfile}
      />

    </div>
  );
}
