import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import {
  Users,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  Mail,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Award,
  Sparkles,
  Trophy,
  Filter,
  CheckCircle2,
  Building,
  Briefcase,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import SkillCategoriesGrid from '../components/SkillCategoriesGrid';

export default function EmployerDashboard() {
  const {
    candidates,
    challenges,
    savedCandidateIds,
    toggleSaveCandidate,
    navigateTo,
    setInterviewCandidate,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('discovery'); // 'discovery' | 'shortlisted'
  const [expandedSkillsCandidateId, setExpandedSkillsCandidateId] = useState(null);

  // Search & Filter state specifically for CS and Software Engineering:
  // - Programming language
  // - Technical skills
  // - LeetCode problems solved
  // - Codeforces rating
  // - GitHub activity
  // - Project experience / level
  // - Education and graduation year
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [minLeetCode, setMinLeetCode] = useState(0); // 0, 400, 600
  const [minCodeforces, setMinCodeforces] = useState(0); // 0, 1600, 1800
  const [gradYearFilter, setGradYearFilter] = useState('All'); // 'All', '2026', '2025', '2024'
  const [minScore, setMinScore] = useState(880);

  const availableLanguages = ['All', 'TypeScript', 'Java', 'Python', 'C++', 'Go', 'Rust'];
  const availableSkills = ['All', 'Concurrency & Multithreading', 'PostgreSQL / Prisma', 'Redis Caching', 'React', 'Kubernetes', 'WebSockets'];
  const gradYears = ['All', '2026', '2025', '2024', '2023', '2022', '2021'];

  // Filter candidates strictly on CS recruitment parameters
  const filteredCandidates = candidates.filter((cand) => {
    // Search text query
    const matchesSearch =
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cand.programmingLanguages && cand.programmingLanguages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())));

    // Language filter
    const matchesLanguage =
      languageFilter === 'All' ||
      (cand.programmingLanguages && cand.programmingLanguages.some((l) => l.toLowerCase() === languageFilter.toLowerCase()));

    // Technical Skill filter
    const matchesSkill =
      skillFilter === 'All' ||
      cand.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()));

    // LeetCode problems solved
    const lcSolved = cand.codingStats?.leetcodeSolved || 0;
    const matchesLeetCode = lcSolved >= minLeetCode;

    // Codeforces rating
    const cfRating = cand.codingStats?.codeforcesRating || 0;
    const matchesCodeforces = cfRating >= minCodeforces;

    // Graduation year
    const candGradYear = String(cand.graduationYear || '');
    const matchesGradYear = gradYearFilter === 'All' || candGradYear === gradYearFilter;

    // Minimum skill score
    const matchesScore = cand.powScore >= minScore;

    return matchesSearch && matchesLanguage && matchesSkill && matchesLeetCode && matchesCodeforces && matchesGradYear && matchesScore;
  });

  // Shortlisted candidates list
  const shortlistedCandidates = candidates.filter((c) =>
    savedCandidateIds.includes(c.id)
  );

  // Overview statistics calculation
  const totalAvailableCandidates = candidates.length;
  const verifiedCandidatesCount = candidates.filter(
    (c) => c.verificationStatus === 'Verified Candidate' || c.verificationStatus?.includes('Verified')
  ).length;
  const shortlistedCount = savedCandidateIds.length;
  const activeChallengesCount = challenges.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Professional Employer Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&q=80&w=140"
                alt="Nexora Technologies"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 p-1 bg-violet-600 rounded-lg text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Nexora Technologies
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Verified Employer Organization
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Pooja Kulkarni • Engineering Director & Campus Hiring Lead • Bengaluru, Karnataka
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  FinTech & Distributed Cloud Infrastructure (India)
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">3 Active Engineering Headcounts</span>
              </div>
            </div>
          </div>

          {/* Quick Employer Actions */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('discovery')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'discovery'
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'bg-navy-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Talent Discovery</span>
            </button>

            <button
              onClick={() => setActiveTab('shortlisted')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'shortlisted'
                  ? 'bg-violet-600 text-white shadow-glow'
                  : 'bg-navy-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-violet-400" />
              <span>Shortlisted ({shortlistedCount})</span>
            </button>
          </div>
        </div>

        {/* 1. Overview Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          
          <div className="p-4 bg-navy-950/80 rounded-2xl border border-slate-800/90 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Total Available Candidates
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {totalAvailableCandidates}
            </div>
            <div className="text-[11px] text-slate-400">Pre-screened engineering talent</div>
          </div>

          <div className="p-4 bg-navy-950/80 rounded-2xl border border-slate-800/90 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Verified Candidates
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {verifiedCandidatesCount}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>100% evaluated test suites</span>
            </div>
          </div>

          <div className="p-4 bg-navy-950/80 rounded-2xl border border-slate-800/90 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Shortlisted Candidates
            </span>
            <div className="text-2xl font-bold font-mono text-violet-400 mt-1">
              {shortlistedCount}
            </div>
            <div className="text-[11px] text-violet-300">Ready for fast-track interview</div>
          </div>

          <div className="p-4 bg-navy-950/80 rounded-2xl border border-slate-800/90 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Active Challenges
            </span>
            <div className="text-2xl font-bold font-mono text-brand-400 mt-1">
              {activeChallengesCount}
            </div>
            <div className="text-[11px] text-brand-300">Curated skill benchmarks</div>
          </div>

        </div>

      </div>

      {/* 2 & 3. Talent Discovery Section with Search and Filters */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-brand-400" />
                Talent Discovery
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluate candidates directly based on proven code benchmarks, P99 request latencies, and verified artifacts.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Showing <span className="text-white font-bold">{filteredCandidates.length}</span> matching engineers
            </div>
          </div>

          {/* 3. Search and Filters Toolbar */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            
            {/* Top row: Search input & Min Score slider */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Bar */}
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by candidate name, role, tech stack, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              {/* Minimum Skill Score Filter */}
              <div className="md:col-span-4 flex items-center justify-between gap-3 bg-navy-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">
                    Min Skill Score
                  </span>
                  <span className="font-mono font-bold text-brand-400 text-sm">
                    {minScore} / 1000
                  </span>
                </div>
                <input
                  type="range"
                  min="850"
                  max="950"
                  step="10"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-32 accent-brand-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Bottom Row Filters: Language, Technical Skill, LeetCode, Codeforces, Grad Year */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              
              {/* Programming Language Dropdown */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px] font-mono">
                  Language
                </label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                >
                  {availableLanguages.map((l) => (
                    <option key={l} value={l}>
                      {l === 'All' ? 'All Languages' : l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Technical Skill Filter */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px] font-mono">
                  Technical Skill
                </label>
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                >
                  {availableSkills.map((s) => (
                    <option key={s} value={s}>
                      {s === 'All' ? 'All Skills' : s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min LeetCode Solved */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px] font-mono">
                  Min LeetCode
                </label>
                <select
                  value={minLeetCode}
                  onChange={(e) => setMinLeetCode(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                >
                  <option value={0}>Any Problems</option>
                  <option value={400}>400+ Solved</option>
                  <option value={600}>600+ Solved</option>
                  <option value={800}>800+ Solved</option>
                </select>
              </div>

              {/* Min Codeforces Rating */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px] font-mono">
                  Min Codeforces
                </label>
                <select
                  value={minCodeforces}
                  onChange={(e) => setMinCodeforces(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                >
                  <option value={0}>Any Rating</option>
                  <option value={1600}>1600+ (Expert)</option>
                  <option value={1800}>1800+ (Cand. Master)</option>
                  <option value={2000}>2000+ (Master)</option>
                </select>
              </div>

              {/* Graduation Year */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px] font-mono">
                  Graduation Year
                </label>
                <select
                  value={gradYearFilter}
                  onChange={(e) => setGradYearFilter(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                >
                  {gradYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr === 'All' ? 'All Classes' : `Class of ${yr}`}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* 4. Candidate Cards List */}
          <div className="space-y-4">
            {filteredCandidates.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
                <Users className="w-8 h-8 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No candidates match your filters</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try lowering the minimum score or clearing your skill filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSkillFilter('All');
                    setExperienceFilter('All');
                    setMinScore(850);
                    setStatusFilter('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCandidates.map((cand) => {
                const isShortlisted = savedCandidateIds.includes(cand.id);

                return (
                  <div
                    key={cand.id}
                    className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    {/* Left: Avatar, Name, Title, Intro, Skills */}
                    <div className="flex items-start gap-5">
                      <div className="relative shrink-0">
                        <Avatar
                          src={cand.avatar}
                          name={cand.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-700 shadow-md text-xl"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 p-1 bg-brand-600 rounded-lg text-white"
                          title="Verified Candidate"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3
                            onClick={() => navigateTo('profile', cand.id)}
                            className="text-lg font-bold text-white hover:text-brand-300 transition-colors cursor-pointer"
                          >
                            {cand.name}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/10 text-brand-300 border border-brand-500/30">
                            PoW: {cand.powScore} ({cand.rank})
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                            {cand.experienceLevel || 'Senior'}
                          </span>
                          <span className="text-xs text-emerald-400 font-medium">
                            ● {cand.availability}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-slate-300">
                          {cand.title} • <span className="text-slate-400 font-normal">{cand.location}</span>
                        </p>

                        {/* Short introduction */}
                        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                          {cand.summary}
                        </p>

                        {/* Top verified artifact showcase */}
                        {cand.topProject && (
                          <div className="pt-1.5 flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded">
                              Featured Proof:
                            </span>
                            <span className="font-semibold text-slate-200">{cand.topProject.title}</span>
                            <span className="text-brand-300 text-[11px] font-mono">
                              ({cand.topProject.badge})
                            </span>
                          </div>
                        )}

                        {/* Skills pills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                          {cand.skills.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                            >
                              {s}
                            </span>
                          ))}

                          {/* Toggle Skill Categories Breakdown */}
                          <button
                            onClick={() =>
                              setExpandedSkillsCandidateId(
                                expandedSkillsCandidateId === cand.id ? null : cand.id
                              )
                            }
                            className="text-[11px] px-2.5 py-0.5 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium flex items-center gap-1 transition-colors"
                          >
                            <span>{expandedSkillsCandidateId === cand.id ? 'Hide Skill Matrix' : 'View Skill Matrix'}</span>
                            {expandedSkillsCandidateId === cand.id ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Right: Score, Project Count, Shortlist button, View Profile */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-4 w-full lg:w-auto shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
                      
                      {/* Metric pills */}
                      <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
                        <div className="bg-navy-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Score</span>
                          <span className="font-mono font-bold text-brand-400">{cand.powScore}</span>
                        </div>
                        <div className="bg-navy-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Projects</span>
                          <span className="font-mono font-bold text-white">{cand.verifiedProjectsCount} Verified</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {/* Shortlist button */}
                        <button
                          onClick={() => toggleSaveCandidate(cand.id)}
                          className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                            isShortlisted
                              ? 'bg-violet-600/20 text-violet-300 border-violet-500/40 shadow-sm'
                              : 'bg-navy-950 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                          }`}
                          title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              isShortlisted ? 'fill-current text-violet-400' : ''
                            }`}
                          />
                          <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                        </button>

                        {/* View Profile button */}
                        <button
                          onClick={() => navigateTo('profile', cand.id)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                        >
                          <span>View Profile</span>
                          <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
                        </button>

                        {/* Direct interview proposal */}
                        <button
                          onClick={() => setInterviewCandidate(cand)}
                          className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-sm transition-all flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Interview</span>
                        </button>
                      </div>

                    </div>

                    {/* Expandable Multi-Domain Skill Categories Matrix */}
                    {expandedSkillsCandidateId === cand.id && (
                      <div className="pt-4 border-t border-slate-850">
                        <SkillCategoriesGrid
                          categories={cand.skillCategories}
                          title={`${cand.name}'s Verified Skills Breakdown`}
                          subtitle="Multi-category evaluation across Programming, AI & ML, Design, Backend, and Tools"
                        />
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* 5. Shortlisted Candidates Section */}
      {activeTab === 'shortlisted' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-violet-400" />
                Shortlisted Candidates ({shortlistedCandidates.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Engineers saved in LocalStorage for interview invitation and team review.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('discovery')}
              className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1.5"
            >
              <span>Back to Talent Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {shortlistedCandidates.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No candidates shortlisted yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore our talent directory to bookmark engineers based on their verified test scores.
              </p>
              <button
                onClick={() => setActiveTab('discovery')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-glow"
              >
                Discover Candidates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {shortlistedCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 glass-panel-hover flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <Avatar
                          src={cand.avatar}
                          name={cand.name}
                          className="w-14 h-14 rounded-2xl border border-slate-700 text-lg"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              onClick={() => navigateTo('profile', cand.id)}
                              className="font-bold text-white text-base hover:text-brand-300 cursor-pointer"
                            >
                              {cand.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">
                              {cand.rank}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300 font-medium">{cand.title}</div>
                          <div className="text-[11px] text-slate-400">{cand.location}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveCandidate(cand.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {cand.summary}
                    </p>

                    <div className="bg-navy-950 p-3 rounded-2xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Skill Score</span>
                        <span className="font-bold text-brand-300">{cand.powScore} / 1000</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Verified Work</span>
                        <span className="font-bold text-white">{cand.verifiedProjectsCount} Projects</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => navigateTo('profile', cand.id)}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium text-center transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => setInterviewCandidate(cand)}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-white text-xs font-semibold text-center shadow-glow-sm transition-all"
                    >
                      Invite to Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
