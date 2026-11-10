import React, { useState } from 'react';
import { X, Save, User, Briefcase, MapPin, Globe, Github, Sparkles, Linkedin, GraduationCap, Lock, AlertCircle } from 'lucide-react';
import { validateLinkedInUrl, initiateLinkedInOAuth, buildDisconnectedLinkedInState } from '../services/linkedInService';

export default function EditProfileModal({ user, isOpen, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'linkedin' | 'college'

  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    location: user?.location || '',
    bio: user?.bio || '',
    website: user?.website || '',
    github: user?.github || '',
    availability: user?.availability || 'Available Immediately',
    linkedIn: user?.linkedIn || {
      status: 'Not Connected',
      profileUrl: user?.linkedIn?.profileUrl || '',
      memberId: null,
      fullName: null,
      profilePicture: null,
      email: null,
      scopeGranted: [],
      consentGiven: false,
      integrationNotice: 'OAuth integration coming soon. Official LinkedIn OpenID Connect credentials will be securely validated via backend server.'
    },
    collegeVerification: user?.collegeVerification || {
      status: 'Unverified',
      collegeEmail: user?.email || '',
      isEmailVerified: false,
      vedamStudentId: '',
      cohortTrack: 'Vedam Engineering Fellowship'
    }
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Edit Candidate Profile & Settings</h3>
              <p className="text-xs text-slate-400">Configure profile details, LinkedIn integration, and college verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'general'
                ? 'border-brand-500 text-brand-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            General Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('linkedin')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'linkedin'
                ? 'border-[#0A66C2] text-[#0A66C2]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 fill-current" />
            <span>LinkedIn Sync</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('college')}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'college'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Vedam / College</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {activeTab === 'general' && (
            <>
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Professional Title *
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-sm"
                  >
                    <option value="Available Immediately">Available Immediately</option>
                    <option value="Open to Offers">Open to Offers</option>
                    <option value="Available in 2 Weeks">Available in 2 Weeks</option>
                    <option value="Not Looking Currently">Not Looking Currently</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Bio / Engineering Focus
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 leading-relaxed text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    GitHub Username / Link
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Personal Website
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'linkedin' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-start gap-3">
                <Linkedin className="w-5 h-5 text-[#0A66C2] shrink-0 mt-0.5 fill-current" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>LinkedIn Identity Binding</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A66C2]/20 text-[#0A66C2]">
                      {formData.linkedIn?.status || 'Not Connected'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Official OpenID Connect authentication will securely bind your verified identity. Web scraping and password requests are strictly prohibited.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Manual LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Linkedin className="w-4 h-4 text-slate-500 absolute left-3 top-3 fill-current" />
                  <input
                    type="url"
                    placeholder="https://www.linkedin.com/in/username"
                    value={formData.linkedIn?.profileUrl || ''}
                    onChange={(e) => {
                      const url = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        linkedIn: {
                          ...prev.linkedIn,
                          profileUrl: url
                        }
                      }));
                    }}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2] text-sm"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Candidates can manually enter their verified profile URL. Format: https://www.linkedin.com/in/...
                </p>
              </div>

              {/* OAuth Action Preview */}
              <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Single Sign-On (OpenID Connect)</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    Coming Soon
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Client ID, secrets, and auth callbacks will be kept securely on backend servers in compliance with LinkedIn Developer policies.
                </p>
                <button
                  type="button"
                  onClick={() => alert('LinkedIn OAuth 2.0 OpenID Connect integration is in progress. Official backend token broker is currently being provisioned.')}
                  className="w-full py-2 px-3 rounded-lg bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 text-[#0A66C2] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#0A66C2]/40"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>Test OAuth Endpoint Trigger (Simulation)</span>
                </button>
              </div>

              {formData.linkedIn?.status === 'Connected' && (
                <button
                  type="button"
                  onClick={() => {
                    const reset = buildDisconnectedLinkedInState();
                    setFormData(prev => ({ ...prev, linkedIn: reset }));
                  }}
                  className="text-xs text-red-400 hover:text-red-300 underline"
                >
                  Disconnect LinkedIn and request deletion of imported metadata
                </button>
              )}
            </div>
          )}

          {activeTab === 'college' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>Vedam Engineering Cohort & Institutional Trust</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      {formData.collegeVerification?.status || 'Unverified'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Verify enrollment in premier engineering programs or the exclusive Vedam Software Fellowships to stand out to campus recruiters.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Institutional / College Email (.ac.in / .edu)
                </label>
                <input
                  type="email"
                  value={formData.collegeVerification?.collegeEmail || ''}
                  onChange={(e) => {
                    const emailVal = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      collegeVerification: {
                        ...prev.collegeVerification,
                        collegeEmail: emailVal
                      }
                    }));
                  }}
                  placeholder="student@institution.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Vedam Student ID / Roll Number
                </label>
                <input
                  type="text"
                  value={formData.collegeVerification?.vedamStudentId || ''}
                  onChange={(e) => {
                    const idVal = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      collegeVerification: {
                        ...prev.collegeVerification,
                        vedamStudentId: idVal
                      }
                    }));
                  }}
                  placeholder="VDM-2026-CS-..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-slate-300 font-semibold">Separate Institutional Email Verification:</div>
                <p>
                  College email tokens are processed independently of general credentials. Verifying your institutional email activates the verified student trust badge on public profiles.
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-xs shadow-glow flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

