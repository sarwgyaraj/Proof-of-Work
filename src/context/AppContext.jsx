import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, INITIAL_EMPLOYER, SAMPLE_CHALLENGES, SAMPLE_CANDIDATES, SAMPLE_PROJECTS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation active view
  // 'landing' | 'login' | 'candidate-dashboard' | 'employer-dashboard' | 'profile' | 'challenges' | 'submit-project' | 'talent'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('pow_current_view') || 'landing';
  });

  // User state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pow_current_user');
    if (!saved) return INITIAL_USER;
    try {
      const parsed = JSON.parse(saved);
      // If candidate is Rohan or initial user, ensure avatar is canonical
      if (parsed.id === INITIAL_USER.id) {
        return { ...parsed, avatar: INITIAL_USER.avatar };
      }
      if (parsed.id === INITIAL_EMPLOYER.id) {
        return { ...parsed, avatar: INITIAL_EMPLOYER.avatar };
      }
      return parsed;
    } catch {
      return INITIAL_USER;
    }
  });

  // User role active context: 'candidate' | 'employer'
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('pow_active_role') || 'candidate';
  });

  // Projects list (can add new via Project Submission)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('pow_projects');
    return saved ? JSON.parse(saved) : SAMPLE_PROJECTS;
  });

  // Challenges
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('pow_challenges');
    return saved ? JSON.parse(saved) : SAMPLE_CHALLENGES;
  });

  // User's challenge submissions (persisted in LocalStorage)
  const [challengeSubmissions, setChallengeSubmissions] = useState(() => {
    const saved = localStorage.getItem('pow_challenge_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Candidates for talent discovery
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('pow_candidates');
    if (!saved) return SAMPLE_CANDIDATES;
    try {
      const parsed = JSON.parse(saved);
      // Sync canonical avatars & data from SAMPLE_CANDIDATES if existing stored list has stale or broken avatars
      return parsed.map((c) => {
        const canonical = SAMPLE_CANDIDATES.find((item) => item.id === c.id);
        return canonical ? { ...c, avatar: canonical.avatar } : c;
      });
    } catch {
      return SAMPLE_CANDIDATES;
    }
  });

  // Bookmarked / Saved candidates for employers
  const [savedCandidateIds, setSavedCandidateIds] = useState(() => {
    const saved = localStorage.getItem('pow_saved_candidates');
    return saved ? JSON.parse(saved) : ['cand-001', 'cand-002'];
  });

  // Currently viewed public profile candidate ID
  const [viewedProfileId, setViewedProfileId] = useState(() => {
    return localStorage.getItem('pow_viewed_profile_id') || 'cand-001';
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pow_current_view', currentView);
  }, [currentView]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('pow_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('pow_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('pow_active_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('pow_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pow_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('pow_challenge_submissions', JSON.stringify(challengeSubmissions));
  }, [challengeSubmissions]);

  useEffect(() => {
    localStorage.setItem('pow_saved_candidates', JSON.stringify(savedCandidateIds));
  }, [savedCandidateIds]);

  useEffect(() => {
    localStorage.setItem('pow_viewed_profile_id', viewedProfileId);
  }, [viewedProfileId]);

  // Actions
  const navigateTo = (view, profileId = null) => {
    if (profileId) {
      setViewedProfileId(profileId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginWithCredentials = (inputEmail, inputPassword) => {
    const cleanEmail = inputEmail.trim().toLowerCase();
    
    if (cleanEmail === 'candidate@proofwork.demo' || cleanEmail.includes('candidate')) {
      setCurrentUser(INITIAL_USER);
      setActiveRole('candidate');
      navigateTo('candidate-dashboard');
      showToast('Signed in as Rohan Sharma (Candidate Demo)');
      return true;
    } else if (cleanEmail === 'employer@proofwork.demo' || cleanEmail.includes('employer')) {
      setCurrentUser(INITIAL_EMPLOYER);
      setActiveRole('employer');
      navigateTo('employer-dashboard');
      showToast('Signed in as Pooja Kulkarni (Nexora Technologies)');
      return true;
    } else {
      // Default to candidate if random credentials used during demo
      setCurrentUser(INITIAL_USER);
      setActiveRole('candidate');
      navigateTo('candidate-dashboard');
      showToast('Signed in with demo access');
      return true;
    }
  };

  const loginAs = (role) => {
    if (role === 'candidate') {
      setCurrentUser(INITIAL_USER);
      setActiveRole('candidate');
      navigateTo('candidate-dashboard');
      showToast('Signed in as Rohan Sharma (IIT Bombay - Candidate Demo)');
    } else {
      setCurrentUser(INITIAL_EMPLOYER);
      setActiveRole('employer');
      navigateTo('employer-dashboard');
      showToast('Signed in as Pooja Kulkarni (Nexora Technologies - Bengaluru)');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('landing');
    showToast('Signed out successfully', 'info');
  };

  const toggleSaveCandidate = (candId) => {
    setSavedCandidateIds(prev => {
      const exists = prev.includes(candId);
      const next = exists ? prev.filter(id => id !== candId) : [...prev, candId];
      showToast(exists ? 'Candidate removed from shortlist' : 'Candidate shortlisted!', exists ? 'info' : 'success');
      return next;
    });
  };

  const addProject = (newProjectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      candidateId: currentUser?.id || 'cand-001',
      date: 'Just now',
      verificationStatus: 'Verification in Progress (Queue #14)',
      verificationScore: 94,
      metrics: {
        throughput: 'Automated test suite passing (34/34)',
        latencyP99: '1.2ms local latency',
        testCoverage: '92% unit/integration'
      },
      ...newProjectData
    };
    setProjects(prev => [newProj, ...prev]);
    showToast('Project submitted! Automated verification pipeline started.');
    navigateTo('candidate-dashboard');
  };

  const submitChallengeSolution = (challengeId, submissionData) => {
    const chal = challenges.find(c => c.id === challengeId);
    
    // Create new challenge submission record with clear simulated verification labeling
    const newSubmission = {
      id: `sub-${Date.now()}`,
      challengeId,
      challengeTitle: chal?.title || 'Skill Challenge',
      category: chal?.category || 'General',
      date: 'Just now',
      title: submissionData.title,
      description: submissionData.description,
      githubUrl: submissionData.githubUrl,
      liveUrl: submissionData.liveUrl,
      technologies: submissionData.technologies,
      // Simulated evaluation label
      status: 'Verified (Simulated Demo Evaluation)',
      simulatedScore: 95,
      simulatedBadge: chal?.reward || 'Demonstrated Skill Badge',
      auditNote: 'Simulated automated test harness: 100% test assertions satisfied.'
    };

    setChallengeSubmissions(prev => [newSubmission, ...prev]);

    // Also update candidate projects list so it appears in Candidate Dashboard
    const newProjectCard = {
      id: `proj-chal-${Date.now()}`,
      candidateId: currentUser?.id || 'cand-001',
      title: submissionData.title,
      tagline: submissionData.description,
      category: chal?.category || 'Skill Challenge',
      liveUrl: submissionData.liveUrl,
      githubUrl: submissionData.githubUrl,
      tags: submissionData.technologies?.split(',').map(t => t.trim()).filter(Boolean) || [chal?.category || 'Coding'],
      verificationStatus: 'Verified (Simulated Demo)',
      verificationScore: 95,
      date: 'Just now',
      metrics: {
        assessmentType: 'Simulated Demo Evaluation',
        testPassRate: '100% (Simulated)',
        codeQualityGrade: 'Grade A (Demo)'
      },
      highlights: [
        `Completed challenge: "${chal?.title}"`,
        'Meets specified architectural criteria and submission requirements (Simulated Demo)',
        'Sample AST and complexity review evaluated (Simulated Demo)'
      ]
    };

    setProjects(prev => [newProjectCard, ...prev]);

    // Update candidate stats
    setCurrentUser(prev => {
      if (!prev) return prev;
      const currentStats = prev.stats || {};
      return {
        ...prev,
        powScore: Math.min(1000, (prev.powScore || 940) + 15),
        stats: {
          ...currentStats,
          challengesSolved: (currentStats.challengesSolved || 0) + 1,
          verifiedProjects: (currentStats.verifiedProjects || 0) + 1
        }
      };
    });

    showToast(`Challenge "${chal?.title}" submitted! Simulated evaluation completed.`);
    return newSubmission;
  };

  const participateChallenge = (challengeId) => {
    const chal = challenges.find(c => c.id === challengeId);
    showToast(`Opening challenge: ${chal?.title || 'Challenge'}`);
    navigateTo('challenges');
  };

  const updateProfile = (updatedData) => {
    setCurrentUser(prev => {
      const next = { ...prev, ...updatedData };
      return next;
    });
    showToast('Profile updated and saved to LocalStorage!');
  };

  const toggleVisibility = () => {
    setCurrentUser(prev => {
      const nextStatus = prev?.visibility === 'Private' ? 'Public' : 'Private';
      const updated = { ...prev, visibility: nextStatus };
      showToast(`Profile visibility switched to ${nextStatus}`, 'info');
      return updated;
    });
  };

  // Modal state for direct pinging/interviews
  const [interviewCandidate, setInterviewCandidate] = useState(null);

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        currentUser,
        setCurrentUser,
        updateProfile,
        toggleVisibility,
        activeRole,
        setActiveRole,
        loginAs,
        loginWithCredentials,
        logout,
        projects,
        addProject,
        challenges,
        candidates,
        savedCandidateIds,
        toggleSaveCandidate,
        viewedProfileId,
        setViewedProfileId,
        toast,
        showToast,
        participateChallenge,
        challengeSubmissions,
        submitChallengeSolution,
        interviewCandidate,
        setInterviewCandidate
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

