import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import {
  Building,
  Globe,
  MapPin,
  Mail,
  ShieldCheck,
  Briefcase,
  Users,
  Edit3,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function EmployerProfile() {
  const { currentUser, navigateTo, updateProfile, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const employer = currentUser || {};
  const [companyName, setCompanyName] = useState(employer.company || 'Nexora Technologies');
  const [recruiterName, setRecruiterName] = useState(employer.name || 'Pooja Kulkarni');
  const [title, setTitle] = useState(employer.title || 'Engineering Director & Campus Hiring Lead');
  const [location, setLocation] = useState(employer.location || 'Bengaluru, Karnataka');
  const [industry, setIndustry] = useState(employer.industry || 'FinTech & Cloud Infrastructure (India)');
  const [website, setWebsite] = useState(employer.website || 'https://nexora.mock');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      company: companyName,
      name: recruiterName,
      title,
      location,
      industry,
      website
    });
    setIsEditing(false);
    showToast('Company profile updated successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Header Banner & Identity */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-violet-950 via-navy-950 to-slate-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.15),transparent_70%)]" />
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="relative shrink-0">
              <Avatar
                src={employer.avatar}
                name={employer.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-4 border-navy-950 shadow-2xl text-2xl"
              />
              <div
                className="absolute -bottom-1 -right-1 p-1.5 bg-violet-600 rounded-xl text-white shadow-md"
                title="Verified Hiring Enterprise"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {employer.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  Employer
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified Organization</span>
                </span>
              </div>

              <div className="text-sm font-semibold text-violet-300 flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                <span>{employer.company}</span>
              </div>

              <p className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
                <span>{employer.title}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {employer.location}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl border border-slate-700 bg-navy-950 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Company Info'}</span>
            </button>

            <button
              onClick={() => navigateTo('employer-dashboard')}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-glow transition-all flex items-center gap-1.5"
            >
              <span>Back to Talent Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Edit Form Drawer (when active) */}
      {isEditing && (
        <form onSubmit={handleSave} className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4 animate-fadeIn">
          <h3 className="text-base font-bold text-white">Update Company & Recruiter Profile</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Recruiter / Lead Name</label>
              <input
                type="text"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Designation / Role Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Company Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-navy-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* 3. Company Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: Organization Overview */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-violet-400" />
            Company Information
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Primary Domain</span>
              <span className="font-semibold text-white">{employer.industry || 'FinTech & Cloud Infrastructure'}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Headquarters & Hiring Hub</span>
              <span className="font-semibold text-white">{employer.location || 'Bengaluru, Karnataka'}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Official Portal</span>
              <a
                href={employer.website || 'https://nexora.mock'}
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:underline flex items-center gap-1 font-mono mt-0.5"
              >
                <span>{employer.website || 'https://nexora.mock'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Campus Hiring Partner Tier</span>
              <span className="text-emerald-400 font-mono font-medium">Tier-1 Institutional Partner</span>
            </div>
          </div>
        </div>

        {/* Right: Active Open Engineering Roles (2 Columns) */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-violet-400" />
                Active Campus & Early-Career Listings ({employer.openRoles?.length || 3})
              </h3>
              <p className="text-xs text-slate-400">Open tech roles posted by your organization</p>
            </div>

            <button
              onClick={() => navigateTo('talent')}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              <span>Discover Matching Candidates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {(employer.openRoles || [
              { id: 'role-1', title: 'Software Development Engineer Intern (SDE Intern)', salary: '₹60,000 / month stipend', location: 'Bengaluru / Hybrid', applicantsCount: 48, tags: ['Java', 'Spring Boot', 'SQL'] },
              { id: 'role-2', title: 'Graduate Engineer Trainee (GET - 2026 Batch)', salary: '₹14 - 18 LPA', location: 'Bengaluru / Pune', applicantsCount: 36, tags: ['React', 'TypeScript', 'Node.js'] },
              { id: 'role-3', title: 'Associate Software Engineer (Backend)', salary: '₹16 - 22 LPA', location: 'Hyderabad, Telangana', applicantsCount: 22, tags: ['Python', 'PostgreSQL', 'Docker'] }
            ]).map((role) => (
              <div
                key={role.id}
                className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">{role.title}</h4>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="font-mono text-emerald-400">{role.salary}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.tags?.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="font-mono text-white font-bold">{role.applicantsCount} Applicants</div>
                  <button
                    onClick={() => navigateTo('employer-dashboard')}
                    className="mt-1 text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 sm:justify-end"
                  >
                    <span>View in Pipeline</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

