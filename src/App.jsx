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

function AppContent() {
  const { currentView, interviewCandidate, setInterviewCandidate } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'candidate-dashboard':
        return <CandidateDashboard />;
      case 'employer-dashboard':
        return <EmployerDashboard />;
      case 'profile':
        return <CandidateProfile />;
      case 'challenges':
        return <ChallengesPage />;
      case 'submit-project':
        return <ProjectSubmissionPage />;
      case 'talent':
        return <TalentDiscoveryPage />;
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

