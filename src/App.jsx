import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import InterviewModal from './components/InterviewModal';
import DemoBanner from './components/DemoBanner';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ChallengesPage from './pages/ChallengesPage';
import ProjectSubmissionPage from './pages/ProjectSubmissionPage';
import TalentDiscoveryPage from './pages/TalentDiscoveryPage';
import HackathonsPage from './pages/HackathonsPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployerProfile from './pages/EmployerProfile';

function AppContent() {
  const { currentView, currentUser, viewedProfileId, interviewCandidate, setInterviewCandidate } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'candidate-dashboard':
        // Guard: If employer or admin somehow hits candidate-dashboard, redirect to employer/admin dashboard
        if (currentUser?.role === 'employer') {
          return <EmployerDashboard />;
        }
        if (currentUser?.role === 'admin') {
          return <AdminDashboard />;
        }
        return <CandidateDashboard />;
      case 'employer-dashboard':
        // Guard: If candidate somehow hits employer-dashboard, redirect to candidate dashboard
        if (currentUser?.role === 'candidate') {
          return <CandidateDashboard />;
        }
        if (currentUser?.role === 'admin') {
          return <AdminDashboard />;
        }
        return <EmployerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'profile':
        // If current user is employer viewing their own profile (and not a candidate's profile), render EmployerProfile
        if (currentUser?.role === 'employer' && (!viewedProfileId || viewedProfileId === currentUser.id)) {
          return <EmployerProfile />;
        }
        return <CandidateProfile />;
      case 'employer-profile':
        return <EmployerProfile />;
      case 'challenges':
        return <ChallengesPage />;
      case 'submit-project':
        return <ProjectSubmissionPage />;
      case 'talent':
        return <TalentDiscoveryPage />;
      case 'hackathons':
        return <HackathonsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-500/30 selection:text-brand-200">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <Toast />
      <InterviewModal
        candidate={interviewCandidate}
        isOpen={Boolean(interviewCandidate)}
        onClose={() => setInterviewCandidate(null)}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

