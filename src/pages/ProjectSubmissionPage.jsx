import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UploadCloud,
  Github,
  Globe,
  Terminal,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  HelpCircle,
  FileCode
} from 'lucide-react';

export default function ProjectSubmissionPage() {
  const { addProject, showToast, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'Full Stack & APIs',
    githubUrl: '',
    liveUrl: '',
    tagsString: 'TypeScript, React, PostgreSQL',
    benchmarkReport: '',
    highlight1: '',
    highlight2: '',
    highlight3: ''
  });

  const [isSimulatingAudit, setIsSimulatingAudit] = useState(false);
  const [auditStep, setAuditStep] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreFillSample = () => {
    setFormData({
      title: 'AuraDB: Embedded In-Memory Vector Store',
      tagline: 'Lightweight HNSW cosine similarity index with WebAssembly SIMD acceleration.',
      category: 'Systems & Backend',
      githubUrl: 'https://github.com/alexrivera-mock/auradb',
      liveUrl: 'https://auradb-wasm.mock',
      tagsString: 'Rust, WASM, TypeScript, SIMD, Vector Search',
      benchmarkReport: '18,500 queries/sec at 100k vectors, 1.1ms P99 latency.',
      highlight1: 'SIMD-accelerated dot product and Euclidean distance calculation in browser WASM',
      highlight2: 'Deterministic HNSW graph generation with verifiable recall rate of 98.4%',
      highlight3: 'Automated fuzzing and property tests validating index consistency'
    });
    showToast('Sample proof submission pre-filled!', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Please provide a project title', 'info');
      return;
    }

    if (!formData.githubUrl.trim()) {
      showToast('GitHub repository URL is required for code provenance verification', 'info');
      return;
    }

    // Trigger simulation of automated test harness
    setIsSimulatingAudit(true);
    setAuditStep('Cloning repository into isolated runtime sandbox...');

    setTimeout(() => {
      setAuditStep('Parsing Abstract Syntax Tree (AST) & cyclomatic complexity...');
    }, 1000);

    setTimeout(() => {
      setAuditStep('Executing headless test suites & load harness benchmarks...');
    }, 2200);

    setTimeout(() => {
      setAuditStep('Generating cryptographic Proof of Work verification badge...');
    }, 3300);

    setTimeout(() => {
      setIsSimulatingAudit(false);

      const tagsArray = formData.tagsString
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const highlightsArray = [
        formData.highlight1 || 'Production-grade architecture with verified branch coverage',
        formData.highlight2 || 'Deterministic unit tests executed cleanly without regressions',
        formData.highlight3 || 'Automated memory leak analysis confirmed zero persistent leaks'
      ].filter(Boolean);

      addProject({
        title: formData.title,
        tagline: formData.tagline || 'Custom verified software submission',
        category: formData.category,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl || 'https://demo.mock',
        tags: tagsArray.length > 0 ? tagsArray : ['TypeScript', 'Node.js'],
        highlights: highlightsArray,
        metrics: {
          auditResult: 'Passed 42 / 42 Tests',
          performance: formData.benchmarkReport || 'P99 Latency: 1.4ms',
          codeScore: '96 / 100 Grade A'
        }
      });
    }, 4200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-2 border border-brand-500/30">
              <UploadCloud className="w-3.5 h-3.5 text-brand-400" />
              Proof of Work Verification Engine
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Submit Practical Project Proof
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Submit your code for automated sandboxed benchmarking, test verification, and peer audit.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePreFillSample}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-fill Sample Project</span>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Project Name / Library Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Kestrel: Clustered Event Streaming Engine"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                One-Line Technical Tagline
              </label>
              <input
                type="text"
                name="tagline"
                placeholder="e.g. Low-latency distributed event log written in Go with zero GC allocations"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Primary Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
              >
                <option value="Systems & Backend">Systems & Backend</option>
                <option value="Frontend Performance">Frontend Performance</option>
                <option value="Full Stack & APIs">Full Stack & APIs</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="AI / ML Engineering">AI / ML Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Technologies & Tags (comma separated)
              </label>
              <input
                type="text"
                name="tagsString"
                placeholder="TypeScript, Next.js, Redis, WebSockets"
                value={formData.tagsString}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                GitHub Repository URL *
              </label>
              <input
                type="url"
                name="githubUrl"
                placeholder="https://github.com/username/project"
                value={formData.githubUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Live Demo URL (Optional)
              </label>
              <input
                type="url"
                name="liveUrl"
                placeholder="https://my-project-demo.com"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Load / Benchmark Metrics (e.g. Throughput, P99 Latency, Concurrency)
              </label>
              <input
                type="text"
                name="benchmarkReport"
                placeholder="e.g. 120k req/s, P99 1.4ms latency, 94% test branch coverage"
                value={formData.benchmarkReport}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-2 space-y-2.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Key Architectural Highlights & Verified Claims
              </label>
              <input
                type="text"
                name="highlight1"
                placeholder="Highlight 1 (e.g. Zero-allocation memory pooling in ring buffer)"
                value={formData.highlight1}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
              <input
                type="text"
                name="highlight2"
                placeholder="Highlight 2 (e.g. Automated chaos tests verifying leader failovers)"
                value={formData.highlight2}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
              <input
                type="text"
                name="highlight3"
                placeholder="Highlight 3 (e.g. Formal verification completed on cryptographic token parser)"
                value={formData.highlight3}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          {/* Automated sandbox execution simulation overlay */}
          {isSimulatingAudit && (
            <div className="p-4 rounded-2xl bg-navy-950 border border-brand-500/50 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-brand-400 border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-brand-300 font-semibold">
                  SANDBOX CI TEST HARNESS ACTIVE:
                </span>
              </div>
              <div className="text-xs font-mono text-emerald-400 pl-7">
                &gt; {auditStep}
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-500 h-full w-3/4 animate-pulse" />
              </div>
            </div>
          )}

          {/* Submit action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigateTo('candidate-dashboard')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSimulatingAudit}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-sm shadow-glow flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isSimulatingAudit ? 'Auditing Codebase...' : 'Submit for Verification'}</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

