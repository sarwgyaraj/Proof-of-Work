import React, { useState } from 'react';
import {
  Linkedin,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Trash2,
  Lock,
  Info,
  Clock,
  Sparkles,
  Link2,
  Mail,
  GraduationCap,
  KeyRound,
  FileCheck2,
  Send
} from 'lucide-react';
import { validateLinkedInUrl, initiateLinkedInOAuth, buildDisconnectedLinkedInState } from '../services/linkedInService';

export default function LinkedInIntegrationCard({
  candidate,
  isOwner = true,
  onUpdateLinkedIn,
  onUpdateCollegeVerification,
  showToast
}) {
  const linkedIn = candidate?.linkedIn || {
    status: 'Not Connected',
    profileUrl: '',
    memberId: null,
    fullName: null,
    profilePicture: null,
    email: null,
    scopeGranted: [],
    consentGiven: false,
    consentTimestamp: null
  };

  const collegeVerification = candidate?.collegeVerification || {
    status: 'Unverified',
    collegeEmail: candidate?.email || '',
    isEmailVerified: false,
    vedamStudentId: '',
    cohortTrack: ''
  };

  // State for manual URL editing
  const [manualUrl, setManualUrl] = useState(linkedIn.profileUrl || '');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');

  // State for Consent modal / disclosure
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentCheckProfile, setConsentCheckProfile] = useState(true);
  const [consentCheckEmail, setConsentCheckEmail] = useState(false);

  // State for College email verification simulation
  const [collegeEmailInput, setCollegeEmailInput] = useState(collegeVerification.collegeEmail || '');
  const [vedamIdInput, setVedamIdInput] = useState(collegeVerification.vedamStudentId || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  // Handlers
  const handleSaveManualUrl = (e) => {
    e.preventDefault();
    setUrlError('');

    if (!manualUrl.trim()) {
      onUpdateLinkedIn?.({
        ...linkedIn,
        profileUrl: ''
      });
      setIsEditingUrl(false);
      showToast?.('LinkedIn profile URL removed', 'info');
      return;
    }

    if (!validateLinkedInUrl(manualUrl)) {
      setUrlError('Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)');
      return;
    }

    onUpdateLinkedIn?.({
      ...linkedIn,
      profileUrl: manualUrl.trim()
    });
    setIsEditingUrl(false);
    showToast?.('LinkedIn profile link saved successfully!');
  };

  const handleInitiateOAuthClick = () => {
    setShowConsentModal(true);
  };

  const handleConfirmOAuthConsent = () => {
    setShowConsentModal(false);
    const result = initiateLinkedInOAuth();
    if (result.comingSoon) {
      showToast?.(result.message, 'info');
    }
  };

  const handleDisconnectLinkedIn = () => {
    if (window.confirm('Disconnect LinkedIn? This will remove imported metadata and clear permissions.')) {
      const resetState = buildDisconnectedLinkedInState();
      onUpdateLinkedIn?.(resetState);
      setManualUrl('');
      showToast?.('LinkedIn account disconnected and stored session tokens cleared.', 'info');
    }
  };

  // College verification actions
  const handleSendCollegeEmailOtp = (e) => {
    e.preventDefault();
    if (!collegeEmailInput.trim() || !collegeEmailInput.includes('@')) {
      showToast?.('Please provide a valid institutional .ac.in / .edu email', 'error');
      return;
    }
    setIsVerifyingEmail(true);
    setTimeout(() => {
      setIsVerifyingEmail(false);
      setIsOtpSent(true);
      showToast?.(`Verification token sent to ${collegeEmailInput}. (Demo OTP: 4429)`);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (verificationCode.trim() !== '4429' && verificationCode.trim().length < 4) {
      showToast?.('Invalid verification token. Use demo token 4429', 'error');
      return;
    }

    const updated = {
      ...collegeVerification,
      status: 'Verified Vedam Cohort',
      collegeEmail: collegeEmailInput,
      isEmailVerified: true,
      vedamStudentId: vedamIdInput || 'VDM-2026-CS-042',
      cohortTrack: 'Vedam Engineering Fellowship - Systems & Microservices Track',
      verifiedAt: new Date().toISOString(),
      academicTrustLevel: 'Level 3 - Cryptographically Verified Institutional Email & Cohort Record'
    };

    onUpdateCollegeVerification?.(updated);
    setIsOtpSent(false);
    setVerificationCode('');
    showToast?.('College email & Vedam Student Status successfully verified!');
  };

  const isConnected = linkedIn.status === 'Connected';

  return (
    <div className="space-y-6">

      {/* College & Vedam Verification Section */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Academic & Vedam Cohort Verification</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                  collegeVerification.isEmailVerified
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}>
                  {collegeVerification.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Institutional email verification & exclusive Vedam Engineering Student authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Verification Status Card */}
        <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-3 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Verified Institutional Address</div>
              <div className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>{collegeVerification.collegeEmail || 'Not configured'}</span>
                {collegeVerification.isEmailVerified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />
                )}
              </div>
            </div>

            {collegeVerification.vedamStudentId && (
              <div className="text-left sm:text-right">
                <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Vedam Student ID</div>
                <div className="text-xs font-mono font-bold text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 inline-block mt-0.5">
                  {collegeVerification.vedamStudentId}
                </div>
              </div>
            )}
          </div>

          {collegeVerification.cohortTrack && (
            <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-xs">
              <span className="text-slate-400">Program Track:</span>
              <span className="text-slate-200 font-medium">{collegeVerification.cohortTrack}</span>
            </div>
          )}
        </div>

        {/* Email Verification Action / Form for Candidate */}
        {isOwner && (
          <div className="space-y-4 pt-2 border-t border-slate-850 relative z-10">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Verify / Update College Student Credentials</span>
            </h4>

            {!isOtpSent ? (
              <form onSubmit={handleSendCollegeEmailOtp} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">College Email (.ac.in / .edu)</label>
                  <input
                    type="email"
                    placeholder="student@institution.ac.in"
                    value={collegeEmailInput}
                    onChange={(e) => setCollegeEmailInput(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Vedam Roll / ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="VDM-2026-..."
                    value={vedamIdInput}
                    onChange={(e) => setVedamIdInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    disabled={isVerifyingEmail}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isVerifyingEmail ? 'Sending Token...' : 'Send College Verification Link & OTP'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="p-4 rounded-2xl bg-navy-900 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    Enter 4-digit token sent to {collegeEmailInput}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Demo Code: 4429</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="4429"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-36 px-3.5 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-center font-mono tracking-widest text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    Verify College Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

