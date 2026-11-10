import React, { useState } from 'react';
import Avatar from './Avatar';
import { useApp } from '../context/AppContext';
import { X, Send, Sparkles, Building, Calendar, DollarSign, MapPin, CheckCircle2 } from 'lucide-react';

export default function InterviewModal({ candidate, isOpen, onClose }) {
  const { showToast } = useApp();
  const [roleTitle, setRoleTitle] = useState('Software Development Engineer Intern (SDE Intern)');
  const [compensation, setCompensation] = useState('₹60,000 / month stipend + PPO (₹16 - 20 LPA)');
  const [message, setMessage] = useState(
    `Hi ${candidate?.name || 'there'},\n\nWe were impressed by your verified Proof of Work projects, strong coding profile (LeetCode & Codeforces), and academic foundation at ${candidate?.education || 'your college'}. We'd love to invite you directly to a 30-minute technical architectural chat with our engineering team—skipping resume gatekeeping.`
  );
  const [preferredDate, setPreferredDate] = useState('Tomorrow, 3:30 PM IST');

  if (!isOpen || !candidate) return null;

  const handleSendInvite = (e) => {
    e.preventDefault();
    showToast(`Interview invitation sent directly to ${candidate.name}! They will receive an email and in-app ping.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={candidate.avatar}
              name={candidate.name}
              className="w-11 h-11 rounded-2xl border border-brand-500/50 text-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-base">Direct Interview Proposal</h3>
                <span className="text-[10px] bg-brand-500/20 text-brand-300 font-mono px-2 py-0.5 rounded">
                  PoW: {candidate.powScore}
                </span>
              </div>
              <p className="text-xs text-slate-400">Proposing fast-track chat to {candidate.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
              Position / Role Title
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                Offered Range
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={compensation}
                  onChange={(e) => setCompensation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                Proposed Slot
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
              Personalized Architectural Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 leading-relaxed font-sans text-xs resize-none"
            />
          </div>

          <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-300 text-[11px] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <span>
              Proof of Work Guarantee: No recruiter intermediary fees. Direct candidate communication backed by reproducible benchmarks.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold shadow-glow flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Fast-Track Proposal</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

