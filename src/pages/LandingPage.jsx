import React from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Code2,
  Cpu,
  Trophy,
  Terminal,
  Zap,
  Users,
  Search,
  ExternalLink,
  GitBranch,
  Layers,
  Sparkles,
  BarChart3,
  Flame,
  FileCheck2
} from 'lucide-react';

export default function LandingPage() {
  const { navigateTo, loginAs, currentUser } = useApp();

  const isEmployer = currentUser?.role === 'employer';
  const isCandidate = currentUser?.role === 'candidate';

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] pointer-events-none">
          <div className="absolute top-6 left-1/4 w-[540px] h-[360px] bg-brand-600/15 rounded-full blur-[130px]" />
          <div className="absolute top-20 right-1/4 w-[480px] h-[340px] bg-violet-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/30 text-xs text-brand-300 font-medium shadow-glow-sm hover:border-brand-500/50 transition-colors mx-auto">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              <span>Verified Abilities Over Resumes</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 flex items-center gap-1 hover:text-white cursor-pointer" onClick={() => navigateTo('challenges')}>
                Explore live challenges <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Don't Just Claim Your Skills.{' '}
              <span className="bg-gradient-to-r from-brand-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                Prove Them.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              A better way for companies to discover talent through real projects, practical challenges and verified skills.
            </p>

            {/* Dynamic CTA Buttons based on persona */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* "Explore Talent" only shown if NOT candidate */}
              {!isCandidate && (
                <button
                  onClick={() => navigateTo('talent')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Search className="w-4 h-4 text-brand-200" />
                  <span>Explore Talent</span>
                  <ArrowRight className="w-4 h-4 text-brand-200" />
                </button>
              )}

              {/* "Showcase Your Skills" only shown if NOT employer (Microsoft/corporate) */}
              {!isEmployer && (
                <button
                  onClick={() => loginAs('candidate')}
                  className="px-7 py-3.5 rounded-xl bg-navy-900/90 hover:bg-slate-800 text-slate-100 hover:text-white font-semibold text-sm border border-slate-700/80 shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Code2 className="w-4 h-4 text-brand-400" />
                  <span>Showcase Your Skills</span>
                </button>
              )}
            </div>

            {/* Key Trust Stats Grid */}
            <div className="pt-8 border-t border-slate-800/70 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">99.4%</div>
                <div className="text-xs text-slate-400 mt-0.5">Automated Test Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-400 tracking-tight">0 min</div>
                <div className="text-xs text-slate-400 mt-0.5">LeetCode Inversion Trivia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400 tracking-tight">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Public Code Audits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 tracking-tight">4.8x</div>
                <div className="text-xs text-slate-400 mt-0.5">Faster Technical Hiring</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 border-t border-slate-800/80 bg-navy-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
              The Proof of Work Pipeline
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              How Proof Replaces Paper Credentials
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Four deliberate steps that separate high-craft practitioners from buzzword collectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 glass-panel-hover flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-300 font-mono font-bold text-lg mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-2">Pick or Submit Proof</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Choose from real-world engineering challenges (e.g. distributed rate limiters, canvas renderers) or submit your verified open-source repo.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-brand-400 font-medium">
                <Code2 className="w-3.5 h-3.5" />
                <span>Automated sandbox check</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 glass-panel-hover flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-300 font-mono font-bold text-lg mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-2">Automated Audit & Benchmarks</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our headless test harness runs unit tests, stress benchmarks, concurrency safety checks, and edge-case fuzzing against your actual code.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-violet-400 font-medium">
                <Cpu className="w-3.5 h-3.5" />
                <span>Deterministic metrics & P99 latency</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 glass-panel-hover flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-mono font-bold text-lg mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-2">Immutable PoW Profile</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Receive verified badges, verified skill scores, and an interactive showcase profile you can share with any hiring team worldwide.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-indigo-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verifiable cryptographic fingerprint</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 glass-panel-hover flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-mono font-bold text-lg mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-white mb-2">Direct Employer Inbounds</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hiring managers search directly by verifiable skills. No recruiter spam, no algorithmic ATS rejection, no unverified claims.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                <Users className="w-3.5 h-3.5" />
                <span>Zero resume gatekeeping</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-violet-400">
            Engineered For Craft
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
            Why Modern SaaS Companies Rely on Proof of Work
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Everything you need to showcase real capability or discover engineers with verifiable track records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Objective Skill Percentiles</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No generic self-rated "5/5 stars in React". Skill percentages are calculated from actual challenge test suites, complexity analysis, and load benchmarks.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Benchmark Replays</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Employers can inspect memory usage graphs, P99 request latencies, and concurrency traces recorded directly during code execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Open Source & Git Provenance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify actual commit histories, pull request review feedback, and architected modules rather than surface-level repository clones.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Curated Engineering Bounties</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compete on architectural problems sourced directly from production tech debt at fast-growing fintech and infrastructure startups.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Anti-Cheat & AI Synthesis Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated originality audits analyze keystroke timing rhythms, git commit atomicity, and architectural rationale to guarantee genuine human authorship.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant One-Click Interview Inbounds</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Directly ping shortlisted candidates who meet your exact criteria, bypassing third-party recruiters and opaque job boards.
            </p>
          </div>

        </div>
      </section>

      {/* Employer Spotlight Section */}
      <section className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-navy-950 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-navy-900 border border-slate-700/80 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
                  For Engineering Leaders
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                  Stop reading 400 identical resumes. Start evaluating running software.
                </h2>
                <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                  Every candidate on Proof of Work has their work verified by runtime tests. Save over 30 hours per open headcount and make confident hiring decisions backed by hard technical benchmarks.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Filter candidates by verified throughput, clean code indices, and tests</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Inspect reproducible GitHub repos and live hosted production demos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Post custom enterprise challenges tailored to your company's stack</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => loginAs('employer')}
                    className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow flex items-center gap-2 transition-all"
                  >
                    <span>Launch Employer Dashboard Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('talent')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all"
                  >
                    Browse Available Talent
                  </button>
                </div>
              </div>

              {/* Employer preview card */}
              <div className="bg-navy-950 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&q=80&w=120"
                      alt="Nexora Technologies"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">Nexora Technologies (Bengaluru)</h4>
                      <div className="text-xs text-slate-400">Pooja Kulkarni, Director of Engineering</div>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
                    3 Active Tech Searches
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Matched Indian Candidates</div>
                  <div className="p-3.5 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
                        name="Rohan Sharma"
                        className="w-10 h-10 rounded-full border border-brand-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">Rohan Sharma</div>
                        <div className="text-xs text-brand-300">IIT Bombay • LeetCode Guardian (2,120)</div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigateTo('profile', 'cand-001')}
                      className="px-3 py-1.5 rounded-lg bg-brand-600/30 hover:bg-brand-600/50 text-brand-200 text-xs font-medium border border-brand-500/40 transition-colors"
                    >
                      View Audit
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                        name="Aditya Singh"
                        className="w-10 h-10 rounded-full border border-violet-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">Aditya Singh</div>
                        <div className="text-xs text-violet-300">IIIT Hyderabad • Vector Embeddings & PyTorch</div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigateTo('profile', 'cand-003')}
                      className="px-3 py-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 text-xs font-medium border border-violet-500/40 transition-colors"
                    >
                      View Audit
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

