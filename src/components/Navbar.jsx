import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from './Avatar';
import {
  ShieldCheck,
  Compass,
  Trophy,
  UploadCloud,
  Users,
  LayoutDashboard,
  UserCheck,
  LogOut,
  LogIn,
  ChevronDown,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { currentView, navigateTo, currentUser, logout, loginAs } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const userRole = currentUser?.role || 'guest';

  // Role-specific navigation links
  let navLinks = [];
  if (userRole === 'admin') {
    navLinks = [
      { id: 'admin-dashboard', label: 'Admin Hub', icon: LayoutDashboard },
      { id: 'talent', label: 'Candidates', icon: Users },
      { id: 'hackathons', label: 'Hackathons', icon: Compass },
      { id: 'challenges', label: 'Challenges', icon: Trophy }
    ];
  } else if (userRole === 'employer') {
    navLinks = [
      { id: 'employer-dashboard', label: 'Talent Pipeline', icon: Users },
      { id: 'talent', label: 'Talent Directory', icon: Users },
      { id: 'challenges', label: 'Skill Bounties', icon: Trophy },
      { id: 'hackathons', label: 'Hackathons', icon: Compass }
    ];
  } else {
    navLinks = [
      { id: 'hackathons', label: 'Hackathons', icon: Compass },
      { id: 'challenges', label: 'Skill Challenges', icon: Trophy },
      { id: 'submit-project', label: 'Submit Proof', icon: UploadCloud }
    ];
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  Proof of Work
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block -mt-0.5">Verified ability over resumes</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => navigateTo('landing')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'landing'
                  ? 'text-white bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Overview
            </button>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User actions / Role selector */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => navigateTo('admin-dashboard')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      currentView === 'admin-dashboard'
                        ? 'bg-amber-600 text-white shadow-glow-sm'
                        : 'bg-navy-850 hover:bg-navy-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Admin Hub
                  </button>
                ) : currentUser.role === 'candidate' ? (
                  <button
                    onClick={() => navigateTo('candidate-dashboard')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      currentView === 'candidate-dashboard'
                        ? 'bg-brand-600 text-white shadow-glow-sm'
                        : 'bg-navy-850 hover:bg-navy-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    My Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('employer-dashboard')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      currentView === 'employer-dashboard'
                        ? 'bg-violet-600 text-white shadow-glow-sm'
                        : 'bg-navy-850 hover:bg-navy-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Hiring Hub
                  </button>
                )}

                <button
                  onClick={() => navigateTo('profile', currentUser.role === 'candidate' ? currentUser.id : 'cand-001')}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  <Avatar
                    src={currentUser.avatar}
                    name={currentUser.name}
                    className="w-6 h-6 rounded-full border border-brand-500/40 text-[10px]"
                  />
                  <span className="max-w-[120px] truncate">{currentUser.name}</span>
                </button>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Instant Quick Demo Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Quick Demo Login</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {roleDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 rounded-xl bg-navy-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setRoleDropdownOpen(false)}
                    >
                      <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                        Explore Live Personas
                      </div>
                      <button
                        onClick={() => loginAs('candidate')}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-800 flex items-center justify-between text-slate-200 hover:text-white group"
                      >
                        <div>
                          <div className="font-semibold text-brand-300">Rohan Sharma (IIT Bombay)</div>
                          <div className="text-[11px] text-slate-400">View PoW score, verified code, badges</div>
                        </div>
                        <UserCheck className="w-4 h-4 text-brand-400 opacity-60 group-hover:opacity-100" />
                      </button>
                      <button
                        onClick={() => loginAs('employer')}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-800 flex items-center justify-between text-slate-200 hover:text-white group mt-1"
                      >
                        <div>
                          <div className="font-semibold text-violet-300">Nexora Technologies (Bengaluru)</div>
                          <div className="text-[11px] text-slate-400">Pooja Kulkarni, Director • SDE Hiring</div>
                        </div>
                        <Users className="w-4 h-4 text-violet-400 opacity-60 group-hover:opacity-100" />
                      </button>
                      <button
                        onClick={() => loginAs('admin')}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-800 flex items-center justify-between text-slate-200 hover:text-white group mt-1 border-t border-slate-800/80 pt-2"
                      >
                        <div>
                          <div className="font-semibold text-amber-300">Platform Administrator</div>
                          <div className="text-[11px] text-slate-400">Vikramaditya Verma • Governance Hub</div>
                        </div>
                        <ShieldCheck className="w-4 h-4 text-amber-400 opacity-60 group-hover:opacity-100" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigateTo('login')}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 rounded-lg shadow-glow-sm transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In / Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { navigateTo('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            Overview
          </button>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => { navigateTo(item.id); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    navigateTo(currentUser.role === 'candidate' ? 'candidate-dashboard' : 'employer-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-brand-300 bg-brand-500/10 rounded-lg"
                >
                  Go to Dashboard ({currentUser.name})
                </button>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { loginAs('candidate'); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 text-brand-300 text-center"
                >
                  Quick Demo: Candidate
                </button>
                <button
                  onClick={() => { loginAs('employer'); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 text-violet-300 text-center"
                >
                  Quick Demo: Employer
                </button>
                <button
                  onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-brand-600 rounded-lg"
                >
                  Sign In / Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

