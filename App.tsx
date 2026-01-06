
import React, { useState } from 'react';
import { View } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DiagnosisView from './components/DiagnosisView';
import DashboardView from './components/DashboardView';
import MyPageView from './components/MyPageView';
import PromptLabView from './components/PromptLabView';
import GenAgentMain from './components/gen-agent/GenAgentMain';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');

  const renderView = () => {
    switch(view) {
      case 'diagnosis': return <DiagnosisView />;
      case 'dashboard': return <DashboardView setView={setView} />;
      case 'mypage': return <MyPageView />;
      case 'promptlab': return <PromptLabView />;
      case 'agent': return <GenAgentMain />;
      default: return <LandingPage setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white flex flex-col">
      <Header currentView={view} setView={setView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
