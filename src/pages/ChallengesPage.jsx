import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Clock,
  Calendar,
  CheckCircle,
  ArrowRight,
  Search,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Github,
  Globe,
  UploadCloud,
  CheckCircle2,
  X,
  FileCode,
  Tag,
  AlertCircle,
  HelpCircle,
  Send,
  Award
} from 'lucide-react';

export default function ChallengesPage() {
  const {
    challenges,
    challengeSubmissions,
    submitChallengeSolution,
    navigateTo,
    showToast
  } = useApp();

  // Categories requested:
  // - Java Programming
  // - Web Development
  // - Data Structures and Algorithms
  // - UI/UX Design
  // - Data Analysis
  const categories = [
    'All Categories',
    'Java Programming',
    'Web Development',
    'Data Structures and Algorithms',
    'UI/UX Design',
    'Data Analysis'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Active modal challenge for detailed view & submission
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [lastSubmissionResult, setLastSubmissionResult] = useState(null);

  // Submission Form State:
  // - Project title
  // - Project description
  // - GitHub URL
  // - Live demo URL
  // - Technologies used
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    technologies: ''
  });

  const handleOpenChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setSubmissionCompleted(false);
    setIsSubmitting(false);
    // Pre-populate sensible defaults
    setFormData({
      title: `${challenge.title} - Solution`,
      description: `Implementation for ${challenge.title} adhering to verification criteria.`,
      githubUrl: 'https://github.com/alexrivera-mock/pow-solution',
      liveUrl: 'https://demo-pow.mock',
      technologies: challenge.requiredSkills ? challenge.requiredSkills.join(', ') : 'TypeScript, React'
    });
  };

  const handleCloseModal = () => {
    setActiveChallenge(null);
    setSubmissionCompleted(false);
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.githubUrl.trim()) {
      showToast('Please provide a project title and GitHub URL', 'info');
      return;
    }

    setIsSubmitting(true);

    // Simulate verification runner
    setTimeout(() => {
      const result = submitChallengeSolution(activeChallenge.id, formData);
      setLastSubmissionResult(result);
      setIsSubmitting(false);
      setSubmissionCompleted(true);
    }, 1800);
  };

  const filteredChallenges = challenges.filter(c => {
    const matchesCategory =
      selectedCategory === 'All Categories' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.requiredSkills && c.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <Trophy className="w-3.5 h-3.5 text-brand-400" />
            Skill Challenges Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practical Skill Challenges
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Demonstrate real engineering ability through domain challenges. Solve practical tasks in Java, Web Development, Algorithms, UI/UX, and Data Analysis.
          </p>

          {/* Transparency note regarding simulated assessments */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>
              <strong>Note:</strong> Evaluations in this sandbox demo are simulated mock benchmarks designed to demonstrate the Proof of Work workflow.
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search challenges by title, keyword, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="text-xs text-slate-400 self-end sm:self-center">
            Showing <span className="text-white font-semibold">{filteredChallenges.length}</span> challenges
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : 'bg-navy-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const isSubmitted = challengeSubmissions.some(s => s.challengeId === challenge.id);

          return (
            <div
              key={challenge.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                {/* Header: Category & Difficulty */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 truncate max-w-[170px]">
                    {challenge.category}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                    challenge.difficulty === 'Hard' || challenge.difficulty === 'Advanced'
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Challenge Title */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">
                    {challenge.title}
                  </h3>
                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Required Skills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400 block">
                    Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(challenge.requiredSkills || challenge.tags)?.slice(0, 4).map((sk) => (
                      <span
                        key={sk}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-navy-950 text-slate-300 border border-slate-800 font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submission Deadline & Time estimate */}
                <div className="grid grid-cols-2 gap-2 bg-navy-950/80 p-3 rounded-xl border border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Estimated Time:</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-brand-400" />
                      {challenge.timeEst}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Deadline:</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {challenge.deadline || 'Rolling'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Start Challenge Button / Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {isSubmitted ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed (Simulated)</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    {challenge.participants || 100}+ submissions
                  </span>
                )}

                <button
                  onClick={() => handleOpenChallenge(challenge)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                    isSubmitted
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-glow-sm'
                  }`}
                >
                  <span>{isSubmitted ? 'View Details' : 'Start Challenge'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detailed Challenge Modal & Submission Workflow */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95 duration-200">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-brand-300 bg-brand-500/10 px-2.5 py-0.5 rounded-md border border-brand-500/20">
                    {activeChallenge.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    {activeChallenge.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-2">
                  {activeChallenge.title}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If submission is finished: Confirmation Screen */}
            {submissionCompleted ? (
              <div className="space-y-6 py-4 animate-in fade-in zoom-in-95 duration-200 text-center">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Challenge Submission Received!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your solution for <strong>"{activeChallenge.title}"</strong> has been recorded and evaluated by our mock testing harness.
                  </p>
                </div>

                {/* Simulated Results Card */}
                <div className="bg-navy-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                      Assessment Evaluation
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Simulated Demo Assessment
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Evaluation Score:</span>
                      <div className="text-lg font-mono font-bold text-brand-400">
                        {lastSubmissionResult?.simulatedScore || 95} / 100
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Badge Awarded:</span>
                      <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{lastSubmissionResult?.simulatedBadge || 'Verified Badge'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 pt-1">
                    Your candidate dashboard has been updated with the new project card and +15 PoW skill score increment.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      navigateTo('candidate-dashboard');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-white font-semibold text-xs shadow-glow"
                  >
                    View in Candidate Dashboard
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Instructions and Submission Form */
              <div className="space-y-6">
                
                {/* Detailed Instructions & Requirements */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Challenge Instructions & Objectives:
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-navy-950 p-4 rounded-xl border border-slate-800">
                    {activeChallenge.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Specific Requirements & Criteria:
                    </span>
                    <div className="space-y-1.5">
                      {activeChallenge.requirements?.map((req, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submission Form Section */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-brand-400" />
                      Submit Your Solution
                    </h4>
                    <span className="text-[10px] text-amber-400 font-mono">
                      (Demo Simulated Evaluation)
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    
                    {/* Project Title */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Reactive High-Throughput Matching Engine"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                        Project Description / Architectural Notes
                      </label>
                      <textarea
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain your approach, concurrency guarantees, and how you satisfied the requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed resize-none"
                      />
                    </div>

                    {/* URLs: GitHub & Live Demo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-slate-400" />
                          GitHub Repository URL *
                        </label>
                        <input
                          type="url"
                          name="githubUrl"
                          value={formData.githubUrl}
                          onChange={handleChange}
                          required
                          placeholder="https://github.com/username/project"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          Live Demo URL (Optional)
                        </label>
                        <input
                          type="url"
                          name="liveUrl"
                          value={formData.liveUrl}
                          onChange={handleChange}
                          placeholder="https://my-demo-url.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        Technologies Used (comma separated)
                      </label>
                      <input
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        placeholder="e.g. Java 21, Spring Boot, Disruptor, Docker"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Simulated Assessment Disclaimer Notice */}
                    <div className="p-3 bg-navy-950 border border-slate-800 rounded-xl text-slate-400 text-[11px] flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                      <span>
                        Simulated Evaluation notice: Clicking Submit will run a demo evaluation test harness and persist the completed project in your LocalStorage dashboard.
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Evaluating Solution...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Challenge Solution</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
