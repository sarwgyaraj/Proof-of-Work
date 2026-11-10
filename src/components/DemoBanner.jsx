import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Info,
  X,
  UserCheck,
  Briefcase
} from 'lucide-react';

export default function DemoBanner() {
  const { currentView, navigateTo, loginAs, currentUser } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const resetDemoState = () => {
    localStorage.removeItem('pow_challenge_submissions');
    localStorage.removeItem('pow_projects');
    localStorage.removeItem('pow_saved_candidates');
    localStorage.removeItem('pow_current_user');
    window.location.reload();
  };

  return (
    <aside aria-label="Demo Mode Controls" className="sticky top-0 z-[60] w-full bg-gradient-to-r from-brand-950 via-navy-950 to-violet-950 border-b border-brand-500/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Demo Indicator & Transparency Disclaimer */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
              DEMO MODE
            </span>
            <span className="text-slate-300 text-[11px] hidden sm:inline">
              Simulated demonstration evaluation • Not real-world accredited employment verification
            </span>
          </div>

          {/* Right: Quick Pitch Script Shortcuts */}
          <div className="flex items-center gap-2">
            
            {/* Step 1: Candidate Flow Shortcut */}
            <button
              onClick={() => loginAs('candidate')}
              className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors flex items-center gap-1 ${
                currentUser?.role === 'candidate'
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
              title="Step 1 & 2: Log in as Candidate"
            >
              <UserCheck className="w-3 h-3 text-brand-400" />
              <span>1. Candidate (Rohan - IITB)</span>
            </button>

            {/* Step 2: Challenge Submission Shortcut */}
            <button
              onClick={() => navigateTo('challenges')}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 font-medium text-[11px] transition-colors flex items-center gap-1"
              title="Step 3: Solve Challenge"
            >
              <span>2. Challenges</span>
            </button>

            {/* Step 3: Employer Flow Shortcut */}
            <button
              onClick={() => loginAs('employer')}
              className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors flex items-center gap-1 ${
                currentUser?.role === 'employer'
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
              title="Step 4 & 5: Log in as Employer"
            >
              <Briefcase className="w-3 h-3 text-violet-400" />
              <span>3. Employer (Nexora - BLR)</span>
            </button>

            {/* Reset Demo Data button */}
            <button
              onClick={resetDemoState}
              className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-medium transition-colors flex items-center gap-1"
              title="Reset all demo state in LocalStorage"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

          </div>

        </div>
      </div>
    </aside>
  );
}

