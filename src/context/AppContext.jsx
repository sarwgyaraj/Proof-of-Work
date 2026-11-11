import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_EMPLOYER,
  INITIAL_ADMIN,
  INITIAL_EMPLOYERS_LIST,
  INITIAL_AUDIT_LOGS,
  SAMPLE_CHALLENGES,
  SAMPLE_CANDIDATES,
  SAMPLE_PROJECTS
} from '../data/mockData';
import { SAMPLE_HACKATHONS } from '../data/mockHackathons';
import { canAccessRoute, ROLES } from '../utils/rbac';

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
      if (parsed.id === INITIAL_ADMIN.id) {
        return { ...parsed, avatar: INITIAL_ADMIN.avatar };
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
    if (!saved) return SAMPLE_CHALLENGES;
    try {
      const parsed = JSON.parse(saved);
      // Sync canonical categories/data from SAMPLE_CHALLENGES
      if (!Array.isArray(parsed) || parsed.length === 0) return SAMPLE_CHALLENGES;
      return parsed.map((ch) => {
        const canonical = SAMPLE_CHALLENGES.find((item) => item.id === ch.id);
        return canonical ? { ...ch, category: canonical.category } : ch;
      });
    } catch {
      return SAMPLE_CHALLENGES;
    }
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

  // Hackathons (persisted in LocalStorage)
  const [hackathons, setHackathons] = useState(() => {
    const saved = localStorage.getItem('pow_hackathons');
    if (!saved) return SAMPLE_HACKATHONS;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_HACKATHONS;
    } catch {
      return SAMPLE_HACKATHONS;
    }
  });

  // Bookmarked / Saved hackathon IDs by candidate
  const [savedHackathonIds, setSavedHackathonIds] = useState(() => {
    const saved = localStorage.getItem('pow_saved_hackathons');
    return saved ? JSON.parse(saved) : ['hack-sih-2026', 'hack-flipkart-grid'];
  });

  // Selected hackathon for detailed modal view
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // Employers list for administration
  const [employersList, setEmployersList] = useState(() => {
    const saved = localStorage.getItem('pow_employers_list');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYERS_LIST;
  });

  // Admin audit activity logs
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('pow_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Helper to record an authorized administrative action
  const logAuditAction = (action, target, details, actor = currentUser?.email || 'admin@proofwork.demo') => {
    const newEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor,
      action,
      target,
      details,
      status: 'Success'
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const toggleSaveHackathon = (hackathonId) => {
    setSavedHackathonIds((prev) => {
      const exists = prev.includes(hackathonId);
      const next = exists ? prev.filter((id) => id !== hackathonId) : [...prev, hackathonId];
      showToast(exists ? 'Hackathon removed from saved bookmarks' : 'Hackathon bookmarked to your list!');
      return next;
    });
  };

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

  useEffect(() => {
    localStorage.setItem('pow_hackathons', JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem('pow_saved_hackathons', JSON.stringify(savedHackathonIds));
  }, [savedHackathonIds]);

  useEffect(() => {
    localStorage.setItem('pow_employers_list', JSON.stringify(employersList));
  }, [employersList]);

  useEffect(() => {
    localStorage.setItem('pow_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Actions
  const navigateTo = (view, profileId = null) => {
    if (profileId) {
      setViewedProfileId(profileId);
    }

    // Role-Based Route Access Enforcement Guard
    if (!canAccessRoute(currentUser, view)) {
      showToast('Access Denied: You do not have permission to view that section.', 'error');
      // Redirect to permitted default view based on active role
      if (currentUser?.role === ROLES.EMPLOYER) {
        setCurrentView('employer-dashboard');
      } else if (currentUser?.role === ROLES.ADMIN) {
        setCurrentView('admin-dashboard');
      } else if (currentUser?.role === ROLES.CANDIDATE) {
        setCurrentView('candidate-dashboard');
      } else {
        setCurrentView('landing');
      }
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginWithCredentials = (inputEmail, inputPassword, signupRole = null) => {
    const cleanEmail = inputEmail.trim().toLowerCase();
    
    if (cleanEmail === 'admin@proofwork.demo' || cleanEmail.includes('admin')) {
      setCurrentUser(INITIAL_ADMIN);
      setActiveRole('admin');
      navigateTo('admin-dashboard');
      showToast('Signed in as Vikramaditya Verma (Platform Administrator)');
      return true;
    } else if (cleanEmail === 'employer@proofwork.demo' || (signupRole === 'employer' && !cleanEmail.includes('candidate'))) {
      setCurrentUser(INITIAL_EMPLOYER);
      setActiveRole('employer');
      navigateTo('employer-dashboard');
      showToast('Signed in as Pooja Kulkarni (Nexora Technologies)');
      return true;
    } else {
      // Default to candidate
      setCurrentUser(INITIAL_USER);
      setActiveRole('candidate');
      navigateTo('candidate-dashboard');
      showToast('Signed in as Rohan Sharma (Candidate)');
      return true;
    }
  };

  const loginAs = (role) => {
    if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
      setActiveRole('admin');
      navigateTo('admin-dashboard');
      showToast('Signed in as Platform Administrator');
    } else if (role === 'employer') {
      setCurrentUser(INITIAL_EMPLOYER);
      setActiveRole('employer');
      navigateTo('employer-dashboard');
      showToast('Signed in as Pooja Kulkarni (Nexora Technologies - Bengaluru)');
    } else {
      setCurrentUser(INITIAL_USER);
      setActiveRole('candidate');
      navigateTo('candidate-dashboard');
      showToast('Signed in as Rohan Sharma (IIT Bombay - Candidate Demo)');
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

  // Administrative Actions (Authorized for Admin Role only)
  const toggleCandidateStatus = (candidateId) => {
    if (currentUser?.role !== ROLES.ADMIN) {
      showToast('Unauthorized: Only administrators can modify candidate accounts.', 'error');
      return;
    }

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candidateId) {
          const nextStatus = c.accountStatus === 'Suspended' ? 'Active' : 'Suspended';
          logAuditAction(
            nextStatus === 'Suspended' ? 'SUSPENDED_CANDIDATE' : 'REACTIVATED_CANDIDATE',
            `${c.name} (${c.id})`,
            `Account status updated to ${nextStatus}.`
          );
          showToast(`Candidate ${c.name} status updated to ${nextStatus}`);
          return { ...c, accountStatus: nextStatus };
        }
        return c;
      })
    );
  };

  const verifyEmployerOrg = (employerId) => {
    if (currentUser?.role !== ROLES.ADMIN) {
      showToast('Unauthorized: Only administrators can verify employers.', 'error');
      return;
    }

    setEmployersList((prev) =>
      prev.map((emp) => {
        if (emp.id === employerId) {
          const nextStatus = emp.verificationStatus === 'Verified Enterprise' ? 'Pending Verification' : 'Verified Enterprise';
          logAuditAction(
            'UPDATED_EMPLOYER_VERIFICATION',
            `${emp.company} (${emp.id})`,
            `Organization trust tier updated to ${nextStatus}.`
          );
          showToast(`${emp.company} verification updated to ${nextStatus}`);
          return { ...emp, verificationStatus: nextStatus };
        }
        return emp;
      })
    );
  };

  const updateUserRole = (userId, targetNewRole) => {
    if (currentUser?.role !== ROLES.ADMIN) {
      showToast('Unauthorized: Only administrators can assign or alter user roles.', 'error');
      return false;
    }

    // Role changes are permanently recorded in administrative audit logs
    logAuditAction(
      'ASSIGNED_USER_ROLE',
      `User ${userId}`,
      `Authorized role transition to ${targetNewRole.toUpperCase()}.`
    );
    showToast(`User ${userId} role updated to ${targetNewRole}`);
    return true;
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
        setInterviewCandidate,
        hackathons,
        setHackathons,
        savedHackathonIds,
        toggleSaveHackathon,
        selectedHackathon,
        setSelectedHackathon,
        employersList,
        auditLogs,
        logAuditAction,
        toggleCandidateStatus,
        verifyEmployerOrg,
        updateUserRole
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

