import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  Filter,
  Bookmark,
  Calendar,
  MapPin,
  Trophy,
  SlidersHorizontal,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import HackathonCard from '../components/HackathonCard';
import HackathonDetailModal from '../components/HackathonDetailModal';
import { evaluateHackathonEligibility } from '../utils/hackathonEligibility';

export default function HackathonsPage() {
  const {
    hackathons,
    currentUser,
    savedHackathonIds,
    selectedHackathon,
    setSelectedHackathon,
    navigateTo
  } = useApp();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [eligibilityFilter, setEligibilityFilter] = useState('All'); // 'All' | 'Eligible' | 'Potential Match' | 'Not Eligible'
  const [formatFilter, setFormatFilter] = useState('All'); // 'All' | 'Online' | 'Offline' | 'Hybrid'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [participationFilter, setParticipationFilter] = useState('All');
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Available unique categories and states for filter dropdowns
  const allCategories = useMemo(() => {
    const set = new Set();
    hackathons.forEach(h => h.categories?.forEach(c => set.add(c)));
    return ['All', ...Array.from(set)];
  }, [hackathons]);

  const allStates = useMemo(() => {
    const set = new Set();
    hackathons.forEach(h => {
      if (h.state) set.add(h.state);
    });
    return ['All', ...Array.from(set)];
  }, [hackathons]);

  // Filtered hackathons
  const filteredHackathons = useMemo(() => {
    return hackathons.filter(h => {
      const eligibility = evaluateHackathonEligibility(currentUser, h);

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = h.name.toLowerCase().includes(q);
        const matchesOrg = h.organizer.toLowerCase().includes(q);
        const matchesCity = (h.city || '').toLowerCase().includes(q);
        const matchesCats = h.categories?.some(c => c.toLowerCase().includes(q));
        const matchesTech = h.techStack?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesOrg && !matchesCity && !matchesCats && !matchesTech) {
          return false;
        }
      }

      // Eligibility filter
      if (eligibilityFilter !== 'All' && eligibility.status !== eligibilityFilter) {
        return false;
      }

      // Format filter
      if (formatFilter !== 'All' && h.format !== formatFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'All' && !h.categories?.includes(categoryFilter)) {
        return false;
      }

      // State filter
      if (stateFilter !== 'All' && h.state !== stateFilter) {
        return false;
      }

      // Participation filter
      if (participationFilter !== 'All' && h.participationType !== participationFilter) {
        return false;
      }

      // Beginner friendly
      if (beginnerOnly && !h.isBeginnerFriendly) {
        return false;
      }

      // Saved bookmarks only
      if (showSavedOnly && !savedHackathonIds.includes(h.id)) {
        return false;
      }

      return true;
    });
  }, [
    hackathons,
    currentUser,
    searchQuery,
    eligibilityFilter,
    formatFilter,
    categoryFilter,
    stateFilter,
    participationFilter,
    beginnerOnly,
    showSavedOnly,
    savedHackathonIds
  ]);

  // Statistics for top bar
  const eligibleCount = useMemo(() => {
    return hackathons.filter(h => evaluateHackathonEligibility(currentUser, h).status === 'Eligible').length;
  }, [hackathons, currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Page Header & Candidate Match Highlights */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-400" />
              <span>India Hackathon Discovery Network</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ● {eligibleCount} Hackathons Match Your Profile
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2.5">
            Hackathons for You in India
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1.5 leading-relaxed">
            Curated opportunities from national government initiatives (SIH, AICTE), major tech enterprises, startups, and university engineering circles evaluated directly against your degree, batch, and skills.
          </p>
        </div>

        {/* Saved Bookmarks Tab Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
              showSavedOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-glow-sm'
                : 'bg-navy-950 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'fill-current text-amber-400' : ''}`} />
            <span>Saved Opportunities ({savedHackathonIds.length})</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Search & Filters Bar */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hackathons by name, organizer, technology (e.g. SIH, Python, Bengaluru, AI)..."
            className="w-full bg-navy-950/80 border border-slate-750 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Selectors Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Eligibility Filter */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Eligibility Status
            </label>
            <select
              value={eligibilityFilter}
              onChange={(e) => setEligibilityFilter(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-brand-500 font-mono"
            >
              <option value="All">All Statuses</option>
              <option value="Eligible">Eligible Only</option>
              <option value="Potential Match">Potential Matches</option>
              <option value="Not Eligible">Not Eligible</option>
            </select>
          </div>

          {/* Format Filter */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Event Format
            </label>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Formats</option>
              <option value="Online">Online / Remote</option>
              <option value="Offline">In-Person Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Technology Category */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-brand-500"
            >
              {allCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* State / Region */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              State / Region
            </label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-brand-500"
            >
              {allStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Participation Type */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Participation
            </label>
            <select
              value={participationFilter}
              onChange={(e) => setParticipationFilter(e.target.value)}
              className="w-full bg-navy-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Formats</option>
              <option value="Individual or Team">Individual or Team</option>
              <option value="Team Only">Team Only</option>
              <option value="Individual Only">Individual Only</option>
            </select>
          </div>

          {/* Beginner Friendly Toggle Checkbox */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 bg-navy-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={beginnerOnly}
                onChange={(e) => setBeginnerOnly(e.target.checked)}
                className="rounded border-slate-700 text-brand-500 focus:ring-0"
              />
              <span className="truncate">Beginner Friendly</span>
            </label>
          </div>

        </div>

      </div>

      {/* 3. Results Count and Reset */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <span className="font-bold text-white">{filteredHackathons.length}</span> opportunities
          {showSavedOnly && ' (from your saved bookmarks)'}
        </div>
        {(searchQuery || eligibilityFilter !== 'All' || formatFilter !== 'All' || categoryFilter !== 'All' || stateFilter !== 'All' || participationFilter !== 'All' || beginnerOnly || showSavedOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setEligibilityFilter('All');
              setFormatFilter('All');
              setCategoryFilter('All');
              setStateFilter('All');
              setParticipationFilter('All');
              setBeginnerOnly(false);
              setShowSavedOnly(false);
            }}
            className="text-brand-400 hover:text-brand-300 font-medium underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* 4. Hackathon Cards Grid */}
      {filteredHackathons.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl border border-slate-800 space-y-3">
          <Compass className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No hackathons match your active filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or reset eligibility and format criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setEligibilityFilter('All');
              setFormatFilter('All');
              setCategoryFilter('All');
              setStateFilter('All');
              setBeginnerOnly(false);
              setShowSavedOnly(false);
            }}
            className="mt-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((h) => (
            <HackathonCard
              key={h.id}
              hackathon={h}
              onSelect={setSelectedHackathon}
            />
          ))}
        </div>
      )}

      {/* Detailed Modal Dialog */}
      <HackathonDetailModal
        hackathon={selectedHackathon}
        isOpen={Boolean(selectedHackathon)}
        onClose={() => setSelectedHackathon(null)}
      />

    </div>
  );
}

