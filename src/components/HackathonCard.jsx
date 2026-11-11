import React from 'react';
import {
  Calendar,
  MapPin,
  Trophy,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Building,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { evaluateHackathonEligibility } from '../utils/hackathonEligibility';

export default function HackathonCard({ hackathon, onSelect, compact = false }) {
  const { currentUser, savedHackathonIds, toggleSaveHackathon } = useApp();

  const isSaved = savedHackathonIds.includes(hackathon.id);
  const eligibility = evaluateHackathonEligibility(currentUser, hackathon);

  return (
    <div
      onClick={() => onSelect(hackathon)}
      className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col justify-between cursor-pointer space-y-4 group transition-all"
    >
      <div className="space-y-3.5">
        
        {/* Top bar: Format badge, Eligibility badge, Save Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Format badge */}
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {hackathon.format}
            </span>

            {/* Eligibility classification badge */}
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${eligibility.badgeClass}`}
              title={eligibility.reason}
            >
              {eligibility.status === 'Eligible' ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <AlertCircle className="w-3 h-3" />
              )}
              <span>{eligibility.status}</span>
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveHackathon(hackathon.id);
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSaved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-navy-950/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
            title={isSaved ? 'Remove Bookmark' : 'Bookmark Hackathon'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Organizer and Hackathon Name */}
        <div className="flex items-start gap-3">
          <img
            src={hackathon.logo}
            alt={hackathon.organizer}
            className="w-11 h-11 rounded-xl border border-slate-700 object-cover bg-navy-900 shrink-0"
          />
          <div className="space-y-0.5 flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-brand-300 transition-colors line-clamp-1">
              {hackathon.name}
            </h3>
            <p className="text-xs text-slate-400 truncate flex items-center gap-1">
              <Building className="w-3 h-3 text-slate-500" />
              <span>{hackathon.organizer}</span>
            </p>
          </div>
        </div>

        {/* Eligibility Explanation */}
        <div className="p-2.5 rounded-xl bg-navy-950/90 border border-slate-850 text-[11px] text-slate-300 flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
          <p className="line-clamp-2 leading-relaxed">
            {eligibility.reason}
          </p>
        </div>

        {/* Location & Dates */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{hackathon.city}, {hackathon.state}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate justify-end">
            <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-slate-300 font-mono">Reg: {hackathon.registrationDeadline}</span>
          </div>
        </div>

        {/* Categories / Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {hackathon.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20 font-medium"
            >
              {cat}
            </span>
          ))}
          {hackathon.categories.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              +{hackathon.categories.length - 3}
            </span>
          )}
        </div>

      </div>

      {/* Footer: Prize Pool & Action button */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-white truncate max-w-[150px] sm:max-w-[180px]" title={hackathon.prizePool}>
            {hackathon.prizePool}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hackathon);
          }}
          className="text-xs font-semibold text-brand-400 group-hover:text-brand-300 flex items-center gap-1 transition-colors"
        >
          <span>View Details</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

