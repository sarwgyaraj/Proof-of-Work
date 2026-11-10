import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import {
  Search,
  Filter,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  MapPin,
  CheckCircle2,
  Mail,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

export default function TalentDiscoveryPage() {
  const { candidates, savedCandidateIds, toggleSaveCandidate, navigateTo, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [minScore, setMinScore] = useState(880);

  const skillsList = ['All', 'TypeScript', 'React', 'Go', 'Python', 'Distributed Systems', 'Kubernetes'];

  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill = selectedSkillFilter === 'All' || cand.skills.some(s => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
    const matchesScore = cand.powScore >= minScore;

    return matchesSearch && matchesSkill && matchesScore;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold mb-3 border border-violet-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            Verified Technical Talent Directory
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Discover Verified High-Craft Engineers
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Filter candidates by demonstrated proof, verified code benchmarks, and reproducible production artifacts. Zero buzzwords.
          </p>
        </div>
      </div>

      {/* Search and Filters toolbar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Main search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, role, tech stack (e.g. Next.js, Go, Distributed)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Min score slider filter */}
          <div className="flex items-center gap-3 w-full md:w-auto bg-navy-950 px-4 py-2 rounded-xl border border-slate-800 shrink-0 text-xs">
            <span className="text-slate-400">Min PoW Score:</span>
            <input
              type="range"
              min="850"
              max="950"
              step="10"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-24 accent-brand-500 cursor-pointer"
            />
            <span className="font-mono font-bold text-brand-300 w-8">{minScore}</span>
          </div>

        </div>

        {/* Skill filter buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-850">
          <span className="text-xs text-slate-400 font-semibold mr-1">Filter by verified skill:</span>
          {skillsList.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkillFilter(skill)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedSkillFilter === skill
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : 'bg-navy-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing {filteredCandidates.length} verified candidate profiles</span>
          <span>Sorted by highest Proof of Work score</span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {filteredCandidates.map((cand) => {
            const isSaved = savedCandidateIds.includes(cand.id);
            return (
              <div
                key={cand.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                
                {/* Left side: Avatar & Info */}
                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    <Avatar
                      src={cand.avatar}
                      name={cand.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-700 shadow-md text-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-brand-600 rounded-lg text-white" title="Verified Proof of Work">
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
                      <span className="text-xs text-emerald-400 font-medium">
                        ● {cand.availability}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-300">
                      {cand.title} • <span className="text-slate-400 font-normal">{cand.location}</span>
                    </p>

                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      {cand.summary}
                    </p>

                    {/* Top verified artifact showcase */}
                    {cand.topProject && (
                      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded">
                          Featured Proof:
                        </span>
                        <span className="font-semibold text-slate-200">{cand.topProject.title}</span>
                        <span className="text-brand-300 text-[11px] font-mono">({cand.topProject.badge})</span>
                      </div>
                    )}

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {cand.skills.map(s => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                          {s}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
                  <button
                    onClick={() => toggleSaveCandidate(cand.id)}
                    className={`p-3 rounded-xl border text-xs transition-colors ${
                      isSaved
                        ? 'bg-violet-600/20 text-violet-300 border-violet-500/40'
                        : 'bg-navy-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                    }`}
                    title={isSaved ? 'Remove from shortlist' : 'Shortlist candidate'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-violet-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => navigateTo('profile', cand.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <span>Audit Full Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
                  </button>

                  <button
                    onClick={() => showToast(`Direct interview proposal sent to ${cand.name}!`)}
                    className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-sm transition-all flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Ping Candidate</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

