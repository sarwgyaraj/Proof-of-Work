import React from 'react';
import {
  X,
  ExternalLink,
  Calendar,
  MapPin,
  Trophy,
  Users,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  AlertCircle,
  Bookmark,
  Share2,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { evaluateHackathonEligibility } from '../utils/hackathonEligibility';

export default function HackathonDetailModal({ hackathon, isOpen, onClose }) {
  const { currentUser, savedHackathonIds, toggleSaveHackathon, showToast } = useApp();

  if (!isOpen || !hackathon) return null;

  const isSaved = savedHackathonIds.includes(hackathon.id);
  const eligibility = evaluateHackathonEligibility(currentUser, hackathon);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Hackathon link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-navy-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={hackathon.banner}
            alt={hackathon.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-navy-950/80 hover:bg-navy-900 text-slate-300 hover:text-white border border-slate-700/60 transition-colors z-10"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Organizer Logo & Title Header */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={hackathon.logo}
                alt={hackathon.organizer}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-slate-700 object-cover bg-navy-900 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/30 font-semibold">
                    {hackathon.organizerType}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{hackathon.listingType}</span>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                  {hackathon.name}
                </h2>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{hackathon.organizer}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Eligibility Callout Box */}
          <div className={`p-4 rounded-2xl border ${
            eligibility.status === 'Eligible'
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : eligibility.status === 'Potential Match'
              ? 'bg-amber-950/20 border-amber-500/30'
              : 'bg-rose-950/20 border-rose-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {eligibility.status === 'Eligible' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Your Eligibility Status:
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${eligibility.badgeClass}`}>
                    ● {eligibility.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {eligibility.reason}
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Evaluated against your active profile ({currentUser?.name} • {currentUser?.education?.institution || 'IIT Bombay'} • Graduating {currentUser?.education?.graduationYear || '2026'}).
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Key Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-navy-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Prize Pool</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono truncate" title={hackathon.prizePool}>
                {hackathon.prizePool}
              </div>
            </div>

            <div className="bg-navy-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>Deadline</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono">
                {hackathon.registrationDeadline}
              </div>
            </div>

            <div className="bg-navy-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Format & City</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate" title={`${hackathon.format} (${hackathon.city})`}>
                {hackathon.format} • {hackathon.city}
              </div>
            </div>

            <div className="bg-navy-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Participation</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate" title={hackathon.teamSize}>
                {hackathon.teamSize}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-400" />
              Event Overview
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {hackathon.description}
            </p>
          </div>

          {/* Problem Statements & Themes */}
          {hackathon.problemStatements && hackathon.problemStatements.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                Official Problem Statements & Themes
              </h3>
              <div className="space-y-2">
                {hackathon.problemStatements.map((ps, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-navy-900/60 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-md bg-brand-500/10 text-brand-300 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{ps}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prizes & Benefits */}
          {hackathon.prizesAndBenefits && hackathon.prizesAndBenefits.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Prizes & Career Opportunities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hackathon.prizesAndBenefits.map((prize, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-navy-900/60 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{prize}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack & Categories */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technology Categories & Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {hackathon.categories?.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 font-medium"
                >
                  {cat}
                </span>
              ))}
              {hackathon.techStack?.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-lg bg-navy-900 text-slate-300 border border-slate-700 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Audit Stamp */}
          <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900">
            <span>Last audited & verified: {hackathon.lastVerifiedDate}</span>
            <a
              href={hackathon.officialSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-brand-400 hover:text-brand-300 underline flex items-center gap-1"
            >
              <span>Official Organizer Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-navy-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveHackathon(hackathon.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-navy-950 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Bookmarked' : 'Save Hackathon'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-navy-950 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Share hackathon"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>

            <a
              href={hackathon.officialRegistrationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 transition-transform hover:scale-[1.02]"
            >
              <span>Register on Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

