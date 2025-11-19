
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ScriptGenerator from './pages/ScriptGenerator';
import GrowthEngine from './pages/GrowthEngine';
import VideoEditor from './pages/VideoEditor';
import AIVideoGen from './pages/AIVideoGen';
import ThumbnailMaker from './pages/ThumbnailMaker';
import LiveAssistant from './pages/LiveAssistant';
import StrategyAgent from './pages/StrategyAgent';
import TemplateMarketplace from './pages/TemplateMarketplace';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import AutoPilot from './pages/AutoPilot';
import { ViewState } from './types';
import { LanguageProvider } from './translations';
import { UserProvider } from './UserContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView(ViewState.DASHBOARD);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.SCRIPT_GENERATOR:
        return <ScriptGenerator />;
      case ViewState.GROWTH_ENGINE:
        return <GrowthEngine />;
      case ViewState.EDITOR:
        return <VideoEditor />;
      case ViewState.AI_VIDEO_GEN:
        return <AIVideoGen />;
      case ViewState.THUMBNAIL_MAKER:
        return <ThumbnailMaker />;
      case ViewState.LIVE_ASSISTANT:
        return <LiveAssistant />;
      case ViewState.STRATEGY_AGENT:
        return <StrategyAgent />;
      case ViewState.AUTO_PILOT:
        return <AutoPilot />;
      case ViewState.TEMPLATE_MARKETPLACE:
        return <TemplateMarketplace />;
      case ViewState.PROFILE:
        return <Profile />;
      case ViewState.ADMIN:
        return <AdminPanel />;
      default:
        return <div className="p-8 text-center text-slate-500">Feature coming soon...</div>;
    }
  };

  // Landing Page View (Public)
  if (currentView === ViewState.LANDING) {
    return <LandingPage onGetStarted={handleLogin} />;
  }

  // Editor View (Fullscreen mode)
  if (currentView === ViewState.EDITOR) {
    return (
      <div className="bg-darker min-h-screen text-slate-200 font-sans flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 ml-64">
           <div className="h-16 bg-darker border-b border-white/5 flex items-center justify-between px-6">
              <h1 className="font-bold text-white">Untitled Project</h1>
              <div className="flex gap-3">
                <button onClick={() => setCurrentView(ViewState.DASHBOARD)} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white">Discard</button>
                <button onClick={() => setCurrentView(ViewState.DASHBOARD)} className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-lg text-white">Save & Exit</button>
              </div>
           </div>
           <VideoEditor />
        </main>
      </div>
    );
  }

  // Main App Layout
  return (
    <div className="bg-darker min-h-screen text-slate-200 font-sans flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative z-0">
        <Header />
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-darker to-dark custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </UserProvider>
  );
};

export default App;
