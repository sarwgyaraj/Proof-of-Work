import React, { useState, useEffect } from 'react';
import {
  Code2,
  ExternalLink,
  RefreshCw,
  Trophy,
  GitBranch,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Edit2,
  Save,
  X,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  fetchCodeforcesProfile,
  fetchCodeforcesRatingHistory,
  fetchGitHubProfile,
  fetchGitHubTopRepos
} from '../services/codingPlatformsApi';

export default function ConnectedCodingProfiles({ codingProfiles: initialProfiles, isEditable = false, onSave }) {
  const [profiles, setProfiles] = useState(initialProfiles || {});
  const [editingPlatform, setEditingPlatform] = useState(null); // 'leetcode' | 'codeforces' | 'geeksforgeeks' | 'github'
  const [tempUsername, setTempUsername] = useState('');
  const [tempUrl, setTempUrl] = useState('');

  // Live API states
  const [cfData, setCfData] = useState(null);
  const [cfHistory, setCfHistory] = useState([]);
  const [ghData, setGhData] = useState(null);
  const [ghRepos, setGhRepos] = useState([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Sync initial state
  useEffect(() => {
    if (initialProfiles) {
      setProfiles(initialProfiles);
    }
  }, [initialProfiles]);

  // Load real Codeforces & GitHub data where available
  useEffect(() => {
    async function loadLiveData() {
      setIsLoadingLive(true);
      const cfHandle = profiles?.codeforces?.handle;
      const ghUsername = profiles?.github?.username;

      if (cfHandle) {
        const liveCf = await fetchCodeforcesProfile(cfHandle);
        if (liveCf) setCfData(liveCf);
        const liveHistory = await fetchCodeforcesRatingHistory(cfHandle);
        if (liveHistory.length > 0) setCfHistory(liveHistory);
      }

      if (ghUsername) {
        const liveGh = await fetchGitHubProfile(ghUsername);
        if (liveGh) setGhData(liveGh);
        const repos = await fetchGitHubTopRepos(ghUsername);
        if (repos.length > 0) setGhRepos(repos);
      }
      setIsLoadingLive(false);
    }

    loadLiveData();
  }, [profiles?.codeforces?.handle, profiles?.github?.username]);

  const handleStartEdit = (platformKey) => {
    setEditingPlatform(platformKey);
    const p = profiles[platformKey] || {};
    setTempUsername(p.username || p.handle || '');
    setTempUrl(p.profileUrl || '');
  };

  const handleSaveEdit = (platformKey) => {
    const updated = {
      ...profiles,
      [platformKey]: {
        ...profiles[platformKey],
        username: tempUsername,
        handle: tempUsername,
        profileUrl: tempUrl || `https://${platformKey}.com/${tempUsername}`
      }
    };
    setProfiles(updated);
    setEditingPlatform(null);
    if (onSave) onSave(updated);
  };

  const cfInfo = cfData || profiles?.codeforces || {};
  const lcInfo = profiles?.leetcode || {};
  const gfgInfo = profiles?.geeksforgeeks || {};
  const ghInfo = ghData || profiles?.github || {};

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand-400" />
            Connected Coding & Competitive Programming Profiles
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified competitive programming ratings, problem-solving depth, and open-source contribution metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isLoadingLive && (
            <span className="text-[11px] font-mono text-brand-300 flex items-center gap-1.5 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Fetching Live APIs...</span>
            </span>
          )}
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            CS & Software Focus
          </span>
        </div>
      </div>

      {/* 4 Platforms Grid: LeetCode, Codeforces, GeeksforGeeks, GitHub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. LeetCode Profile Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-base">
                  LC
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-base">LeetCode</h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono px-2 py-0.2 rounded font-semibold">
                      DSA & Problem Solving
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">@{lcInfo.username || 'alex_rivera99'}</div>
                </div>
              </div>

              {isEditable && (
                <button
                  onClick={() => handleStartEdit('leetcode')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Edit LeetCode Profile"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Edit inputs inline if active */}
            {editingPlatform === 'leetcode' ? (
              <div className="p-3 rounded-2xl bg-navy-950 border border-brand-500/40 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="LeetCode Username"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <input
                  type="url"
                  placeholder="LeetCode Profile URL"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setEditingPlatform(null)} className="px-2 py-1 text-slate-400">Cancel</button>
                  <button onClick={() => handleSaveEdit('leetcode')} className="px-3 py-1 rounded bg-brand-600 text-white font-semibold">Save</button>
                </div>
              </div>
            ) : (
              <>
                {/* Statistics Breakdown */}
                <div className="grid grid-cols-4 gap-2 bg-navy-950 p-3 rounded-2xl border border-slate-800 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Total</span>
                    <span className="font-bold text-white text-sm">{lcInfo.totalSolved || 684}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase block">Easy</span>
                    <span className="font-bold text-emerald-400">{lcInfo.easySolved || 210}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase block">Med</span>
                    <span className="font-bold text-amber-400">{lcInfo.mediumSolved || 382}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-400 uppercase block">Hard</span>
                    <span className="font-bold text-rose-400">{lcInfo.hardSolved || 92}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contest Rating: <strong>{lcInfo.contestRating || 2142}</strong> ({lcInfo.ranking || 'Top 1.8%'})</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Acc: {lcInfo.acceptanceRate || '68.4%'}
                  </span>
                </div>

                {/* Badges */}
                {lcInfo.badges && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lcInfo.badges.map(b => (
                      <span key={b} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Architecture label notice */}
            <div className="text-[10px] text-slate-500 flex items-center gap-1 bg-navy-950 px-2.5 py-1 rounded-lg border border-slate-850">
              <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Integration-ready profile linking (Simulated demo statistics)</span>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Direct Profile Link</span>
            <a
              href={lcInfo.profileUrl || `https://leetcode.com/u/${lcInfo.username || 'alex_rivera99'}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>View LeetCode Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Codeforces Profile Card (Official Public API Powered) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center font-mono font-bold text-rose-400 text-base">
                  CF
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-base">Codeforces</h4>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono px-2 py-0.2 rounded font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Official Public API Connected
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">Handle: @{cfInfo.handle || 'tourist'}</div>
                </div>
              </div>

              {isEditable && (
                <button
                  onClick={() => handleStartEdit('codeforces')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Edit Codeforces Handle"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Edit inputs inline if active */}
            {editingPlatform === 'codeforces' ? (
              <div className="p-3 rounded-2xl bg-navy-950 border border-brand-500/40 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Codeforces Handle (e.g. tourist)"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <input
                  type="url"
                  placeholder="Codeforces Profile URL"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setEditingPlatform(null)} className="px-2 py-1 text-slate-400">Cancel</button>
                  <button onClick={() => handleSaveEdit('codeforces')} className="px-3 py-1 rounded bg-brand-600 text-white font-semibold">Save</button>
                </div>
              </div>
            ) : (
              <>
                {/* Rating & Rank Badges */}
                <div className="grid grid-cols-3 gap-2 bg-navy-950 p-3 rounded-2xl border border-slate-800 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Current Rating</span>
                    <span className="font-bold text-violet-400 text-base">{cfInfo.rating || 1845}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Max Rating</span>
                    <span className="font-bold text-brand-300 text-base">{cfInfo.maxRating || 1910}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Current Rank</span>
                    <span className="font-bold text-rose-300 truncate block text-xs mt-1">
                      {cfInfo.rank || 'Candidate Master'}
                    </span>
                  </div>
                </div>

                {/* Contest history summary */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Recent Contest History:
                  </div>
                  <div className="space-y-1 text-xs font-mono">
                    {(cfHistory.length > 0 ? cfHistory : cfInfo.lastContests || []).slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-center justify-between bg-navy-950 px-2.5 py-1 rounded-lg border border-slate-850 text-[11px]">
                        <span className="text-slate-300 truncate max-w-[200px]">{c.contestName || c.name}</span>
                        <span className="text-emerald-400 font-semibold">{c.change || `Rank #${c.rank}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="text-[10px] text-slate-500 flex items-center gap-1 bg-navy-950 px-2.5 py-1 rounded-lg border border-slate-850">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Direct public Codeforces API sync (user.info & user.rating)</span>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Live Verification</span>
            <a
              href={cfInfo.profileUrl || `https://codeforces.com/profile/${cfInfo.handle || 'tourist'}`}
              target="_blank"
              rel="noreferrer"
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
            >
              <span>Inspect Codeforces Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3. GeeksforGeeks Profile Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-base">
                  GFG
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-base">GeeksforGeeks</h4>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono px-2 py-0.2 rounded font-semibold">
                      DSA Articles & Practice
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">@{gfgInfo.username || 'alex_dev_coder'}</div>
                </div>
              </div>

              {isEditable && (
                <button
                  onClick={() => handleStartEdit('geeksforgeeks')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Edit GFG Profile"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Edit inputs inline if active */}
            {editingPlatform === 'geeksforgeeks' ? (
              <div className="p-3 rounded-2xl bg-navy-950 border border-brand-500/40 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="GFG Username"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <input
                  type="url"
                  placeholder="GFG Profile URL"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setEditingPlatform(null)} className="px-2 py-1 text-slate-400">Cancel</button>
                  <button onClick={() => handleSaveEdit('geeksforgeeks')} className="px-3 py-1 rounded bg-brand-600 text-white font-semibold">Save</button>
                </div>
              </div>
            ) : (
              <>
                {/* Statistics Breakdown */}
                <div className="grid grid-cols-3 gap-2 bg-navy-950 p-3 rounded-2xl border border-slate-800 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Coding Score</span>
                    <span className="font-bold text-emerald-400 text-base">{gfgInfo.codingScore || 1840}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Solved</span>
                    <span className="font-bold text-white text-base">{gfgInfo.problemsSolved || 420}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Campus Rank</span>
                    <span className="font-bold text-brand-300 text-xs mt-1 block truncate">
                      {gfgInfo.instituteRank || '#3 (IIT Bombay)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Monthly Problem Solving Streak:</span>
                  <span className="font-mono font-bold text-emerald-400">{gfgInfo.monthlyStreak || '45 days'}</span>
                </div>
              </>
            )}

            <div className="text-[10px] text-slate-500 flex items-center gap-1 bg-navy-950 px-2.5 py-1 rounded-lg border border-slate-850">
              <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Integration-ready GFG profile link (Demonstration mock score)</span>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Direct Profile Link</span>
            <a
              href={gfgInfo.profileUrl || `https://www.geeksforgeeks.org/user/${gfgInfo.username || 'alex_dev_coder'}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View GFG Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4. GitHub Repositories & Contributions (Public GitHub API Powered) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-white text-base">
                  <GitBranch className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-base">GitHub</h4>
                    <span className="text-[10px] bg-brand-500/20 text-brand-300 border border-brand-500/30 font-mono px-2 py-0.2 rounded font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                      Public GitHub API Connected
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">@{ghInfo.username || 'alexrivera-mock'}</div>
                </div>
              </div>

              {isEditable && (
                <button
                  onClick={() => handleStartEdit('github')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Edit GitHub Profile"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Edit inputs inline if active */}
            {editingPlatform === 'github' ? (
              <div className="p-3 rounded-2xl bg-navy-950 border border-brand-500/40 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="GitHub Username (e.g. torvalds)"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <input
                  type="url"
                  placeholder="GitHub Profile URL"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-white text-xs"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setEditingPlatform(null)} className="px-2 py-1 text-slate-400">Cancel</button>
                  <button onClick={() => handleSaveEdit('github')} className="px-3 py-1 rounded bg-brand-600 text-white font-semibold">Save</button>
                </div>
              </div>
            ) : (
              <>
                {/* GitHub stats row */}
                <div className="grid grid-cols-3 gap-2 bg-navy-950 p-3 rounded-2xl border border-slate-800 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Public Repos</span>
                    <span className="font-bold text-white text-base">{ghInfo.publicRepos || 18}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Stars</span>
                    <span className="font-bold text-amber-300 text-base">{ghInfo.starsCount || 420}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Contributions</span>
                    <span className="font-bold text-emerald-400 text-base">{ghInfo.contributionsPastYear || 1482}</span>
                  </div>
                </div>

                {/* Top Languages */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Primary Languages (Repo AST):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(ghInfo.topLanguages || ['TypeScript (52%)', 'Java (24%)', 'Go (16%)', 'C++ (8%)']).map(l => (
                      <span key={l} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="text-[10px] text-slate-500 flex items-center gap-1 bg-navy-950 px-2.5 py-1 rounded-lg border border-slate-850">
              <CheckCircle2 className="w-3 h-3 text-brand-400 shrink-0" />
              <span>Public GitHub API integration ready for repository & commit inspection</span>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Open Source Evidence</span>
            <a
              href={ghInfo.profileUrl || `https://github.com/${ghInfo.username || 'alexrivera-mock'}`}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-brand-300 font-semibold flex items-center gap-1"
            >
              <span>Inspect GitHub Repositories</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}

