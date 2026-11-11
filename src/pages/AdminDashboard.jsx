import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Layers,
  Search,
  ExternalLink,
  Lock,
  Compass,
  Trophy,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { ROLES } from '../utils/rbac';

export default function AdminDashboard() {
  const {
    currentUser,
    candidates,
    employersList,
    auditLogs,
    challenges,
    hackathons,
    toggleCandidateStatus,
    verifyEmployerOrg,
    updateUserRole,
    navigateTo,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'candidates' | 'employers' | 'hackathons' | 'audit-logs'
  const [searchQuery, setSearchQuery] = useState('');

  // Protect Admin Dashboard
  if (currentUser?.role !== ROLES.ADMIN) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-white">403 — Unauthorized Access</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          The administrative governance dashboard is restricted to authorized platform administrators only.
        </p>
        <button
          onClick={() => navigateTo('landing')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
        >
          Return to Safe Overview
        </button>
      </div>
    );
  }

  // Filter candidates for table
  const filteredCandidates = candidates.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.education?.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={currentUser.avatar}
              name={currentUser.name}
              className="w-16 h-16 rounded-2xl border-2 border-brand-500 text-xl shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Platform Admin
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  ● {currentUser.accessLevel}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                {currentUser.name}
              </h1>
              <p className="text-xs text-slate-400">
                {currentUser.title} • {currentUser.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="px-3.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs font-mono text-slate-400">
              Audit Session Active
            </div>
          </div>
        </div>
      </div>

      {/* 2. Platform Key Governance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Registered Candidates</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{candidates.length}</div>
          <div className="text-[11px] text-emerald-400">100% Simulated Indian Tech Cohort</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Verified Enterprises</span>
            <Building className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{employersList.length}</div>
          <div className="text-[11px] text-slate-400">All hiring partners audited</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Hackathons</span>
            <Compass className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{hackathons.length}</div>
          <div className="text-[11px] text-emerald-400">National & College verified</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Security Audit Logs</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{auditLogs.length}</div>
          <div className="text-[11px] text-slate-400">Actions cryptographically stamped</div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'overview'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Platform Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'candidates'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Moderation ({candidates.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('employers')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'employers'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Employer Governance ({employersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit-logs')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'audit-logs'
              ? 'bg-brand-600 text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Administrative Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* 4. Tab: Candidates Management */}
      {activeTab === 'candidates' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">Candidate Account Governance</h3>
              <p className="text-xs text-slate-400">Suspend, reactivate or inspect candidate accounts</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-400 uppercase font-mono border-b border-slate-800 bg-navy-950/60">
                <tr>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Institution</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Account Status</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <Avatar src={cand.avatar} name={cand.name} className="w-8 h-8 rounded-lg" />
                      <div>
                        <div className="font-bold text-white">{cand.name}</div>
                        <div className="text-[11px] text-slate-400">{cand.id}</div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-300">
                      {typeof cand.education === 'string' ? cand.education : cand.education?.institution || 'IIT Bombay'}
                    </td>
                    <td className="p-3 font-mono font-bold text-brand-300">{cand.powScore}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                        cand.accountStatus === 'Suspended'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      }`}>
                        {cand.accountStatus || 'Active'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-300">CANDIDATE</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleCandidateStatus(cand.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          cand.accountStatus === 'Suspended'
                            ? 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30'
                            : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/30'
                        }`}
                      >
                        {cand.accountStatus === 'Suspended' ? 'Reactivate' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Tab: Employer Governance */}
      {activeTab === 'employers' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Employer Organization Verification</h3>
            <p className="text-xs text-slate-400">Authenticate hiring companies and manage platform recruitment access</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-400 uppercase font-mono border-b border-slate-800 bg-navy-950/60">
                <tr>
                  <th className="p-3">Company</th>
                  <th className="p-3">Hiring Lead</th>
                  <th className="p-3">Industry</th>
                  <th className="p-3">Trust Tier</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {employersList.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white">{emp.company}</div>
                      <div className="text-[11px] text-slate-400">{emp.location}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-200">{emp.name}</div>
                      <div className="text-[11px] text-slate-400">{emp.email}</div>
                    </td>
                    <td className="p-3 text-slate-300">{emp.industry}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                        emp.verificationStatus === 'Verified Enterprise'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {emp.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => verifyEmployerOrg(emp.id)}
                        className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-brand-600/20 text-brand-300 hover:bg-brand-600/30 border border-brand-500/30 transition-colors"
                      >
                        {emp.verificationStatus === 'Verified Enterprise' ? 'Revoke Verification' : 'Verify Organization'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Tab: Audit Trail */}
      {(activeTab === 'audit-logs' || activeTab === 'overview') && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Administrative Governance & RBAC Audit Trail
              </h3>
              <p className="text-xs text-slate-400">
                Immutable system audit logs recording privileged operations, verification actions, and role transitions
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-navy-950/80 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                      {log.action}
                    </span>
                    <span className="font-semibold text-white">{log.target}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{log.details}</p>
                </div>

                <div className="text-left sm:text-right shrink-0 text-[11px] text-slate-500 font-mono">
                  <div>{log.timestamp}</div>
                  <div className="text-slate-400">{log.actor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

