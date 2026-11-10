import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Github, Twitter, Linkedin, Terminal, Sparkles, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { navigateTo, loginAs } = useApp();

  return (
    <footer className="w-full border-t border-slate-850 bg-navy-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Call to Action Banner inside footer */}
        <div className="relative rounded-2xl bg-gradient-to-r from-navy-900 via-brand-950/40 to-navy-900 border border-brand-500/20 p-8 mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-3 border border-brand-500/30">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Proof of Work Protocol
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Ready to hire based on verifiable proof?
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Skip 5 rounds of generic trivia interviews. Browse candidates with verified production code, load benchmarks, and automated reviews.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => navigateTo('talent')}
                className="px-5 py-2.5 rounded-xl bg-white text-navy-950 font-semibold text-sm hover:bg-slate-100 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Browse Candidates
                <ArrowRight className="w-4 h-4 text-navy-900" />
              </button>
              <button
                onClick={() => loginAs('candidate')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-sm border border-slate-700/80 transition-all flex items-center justify-center"
              >
                Demo as Candidate
              </button>
            </div>
          </div>
        </div>

        {/* 4-column footer layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-violet-500 flex items-center justify-center shadow-glow-sm">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Proof of Work</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The modern meritocratic hiring network. We help high-impact software engineers, systems architects, and technical contributors get discovered through reproducible builds and verified benchmarks.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => navigateTo('challenges')} 
                title="Code Repository & Challenges" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigateTo('talent')} 
                title="Talent Network" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-brand-300 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigateTo('talent')} 
                title="Verified Professional Community" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-brand-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigateTo('profile', 'cand-001')} 
                title="Audited Test Harness" 
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('challenges')} className="hover:text-white transition-colors">
                  Engineering Challenges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('talent')} className="hover:text-white transition-colors">
                  Talent Discovery Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('submit-project')} className="hover:text-white transition-colors">
                  Proof Verification Engine
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile', 'cand-001')} className="hover:text-white transition-colors">
                  Verified Candidate Profile
                </button>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  CLI & Git Integration <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-brand-300">Active</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">For Teams</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => loginAs('employer')} className="hover:text-white transition-colors text-left">
                  Employer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('employer-dashboard')} className="hover:text-white transition-colors text-left">
                  Shortlist & Saved Profiles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile', 'cand-001')} className="hover:text-white transition-colors text-left">
                  Automated Code Rubric
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('submit-project')} className="hover:text-white transition-colors text-left">
                  Runtime Sandboxing & AI Audit
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('challenges')} className="hover:text-white transition-colors text-left">
                  Custom Technical Challenges
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Philosophy</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-slate-300">No Resume Keywords</span>
              </li>
              <li>
                <span className="text-slate-300">Zero LeetCode Inversion</span>
              </li>
              <li>
                <span className="text-slate-300">Reproducible Artifacts</span>
              </li>
              <li>
                <span className="text-slate-300">Public Verifiable Proof</span>
              </li>
              <li className="pt-2">
                <span className="inline-block text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ● All Systems Operational
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Proof of Work Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('profile', 'cand-001')} className="hover:text-slate-300 transition-colors">
              Security Protocol
            </button>
            <button onClick={() => navigateTo('challenges')} className="hover:text-slate-300 transition-colors">
              Verification Manifesto
            </button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-300 transition-colors">
              Privacy & Terms
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

