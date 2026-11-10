import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Lock, ArrowRight, UserCheck, Briefcase, Sparkles, CheckCircle2, Linkedin, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { loginAs, loginWithCredentials, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState('candidate'); // 'candidate' | 'employer'
  const [email, setEmail] = useState('candidate@proofwork.demo');
  const [password, setPassword] = useState('demo123');
  const [name, setName] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    if (role === 'candidate') {
      setEmail('candidate@proofwork.demo');
      setPassword('demo123');
    } else {
      setEmail('employer@proofwork.demo');
      setPassword('demo123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'signup' && !name.trim()) {
      showToast('Please enter your full name', 'info');
      return;
    }
    if (!email.trim() || !password.trim()) {
      showToast('Please provide email and password', 'info');
      return;
    }

    loginWithCredentials(email, password);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-violet-500 items-center justify-center shadow-glow-sm mb-4">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {activeTab === 'login' ? 'Sign into Proof of Work' : 'Create your verified account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Demonstrate real skills or hire verified engineering talent.
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          
          {/* Quick Demo Pre-fills */}
          <div className="mb-6 p-3.5 rounded-2xl bg-navy-900 border border-brand-500/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-brand-300 font-mono text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Live Pitch Demo Credentials:
              </span>
              <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-mono">
                Click to Pre-fill
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <button
                type="button"
                onClick={() => handleRoleSelection('candidate')}
                className={`p-2.5 rounded-xl border text-xs transition-all ${
                  selectedRole === 'candidate'
                    ? 'bg-brand-600/25 border-brand-500 text-white shadow-glow-sm'
                    : 'bg-navy-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-brand-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Candidate</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">candidate@proofwork.demo</div>
                <div className="text-[10px] text-slate-500 font-mono">pw: demo123</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelection('employer')}
                className={`p-2.5 rounded-xl border text-xs transition-all ${
                  selectedRole === 'employer'
                    ? 'bg-violet-600/25 border-violet-500 text-white shadow-glow-sm'
                    : 'bg-navy-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-violet-300 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Employer</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">employer@proofwork.demo</div>
                <div className="text-[10px] text-slate-500 font-mono">pw: demo123</div>
              </button>
            </div>
          </div>

          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="flex rounded-lg bg-navy-950 p-1 mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'login'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'signup'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">I am joining as a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelection('candidate')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    selectedRole === 'candidate'
                      ? 'border-brand-500 bg-brand-500/10 text-white'
                      : 'border-slate-800 bg-navy-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <UserCheck className={`w-4 h-4 mt-0.5 ${selectedRole === 'candidate' ? 'text-brand-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-xs font-bold">Candidate</div>
                    <div className="text-[10px] text-slate-400">Prove skills & showcase code</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelection('employer')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    selectedRole === 'employer'
                      ? 'border-violet-500 bg-violet-500/10 text-white'
                      : 'border-slate-800 bg-navy-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 mt-0.5 ${selectedRole === 'employer' ? 'text-violet-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-xs font-bold">Employer</div>
                    <div className="text-[10px] text-slate-400">Hire verified engineers</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Name field for signup */}
            {activeTab === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Hayes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Work / Developer Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="developer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-navy-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to demo email', 'info')}
                    className="text-[11px] text-brand-400 hover:text-brand-300"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-navy-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <span>{activeTab === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* LinkedIn Single Sign-On / Connection Option */}
            <div className="pt-3 border-t border-slate-850 space-y-2">
              <button
                type="button"
                onClick={() => {
                  showToast('LinkedIn OAuth 2.0 (OpenID Connect) integration coming soon. Official backend token broker is being provisioned.', 'info');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-navy-950 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800 hover:border-[#0A66C2]/60 transition-all group"
              >
                <div className="w-5 h-5 rounded bg-[#0A66C2] flex items-center justify-center text-white shrink-0">
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Continue with LinkedIn</span>
                <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">
                  Coming Soon
                </span>
              </button>
              <div className="text-[10px] text-slate-500 text-center leading-normal">
                Strict OIDC identity authentication. We never scrape LinkedIn profiles or access passwords.
              </div>
            </div>

          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400">
              By continuing you agree to the{' '}
              <span className="text-slate-300 underline cursor-pointer">Verification Standards</span> &{' '}
              <span className="text-slate-300 underline cursor-pointer">Honor Code</span>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

