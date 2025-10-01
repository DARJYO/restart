import React, { useState } from 'react';
import Header from './components/Header';
import StrategyGenerator from './components/StrategyGenerator';
import Dashboard from './components/Dashboard';
import type { MarketingFormData, MarketingStrategy } from './types';

const App: React.FC = () => {
  const [strategy, setStrategy] = useState<MarketingStrategy | null>(null);
  const [businessProfile, setBusinessProfile] = useState<MarketingFormData | null>(null);

  const handleStrategyGenerated = (
    profile: MarketingFormData,
    generatedStrategy: MarketingStrategy
  ) => {
    setBusinessProfile(profile);
    setStrategy(generatedStrategy);
  };

  const handleReset = () => {
    setStrategy(null);
    setBusinessProfile(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!strategy || !businessProfile ? (
          <StrategyGenerator onGenerate={handleStrategyGenerated} />
        ) : (
          <Dashboard
            strategy={strategy}
            businessProfile={businessProfile}
            onReset={handleReset}
          />
        )}
      </main>
      <footer className="text-center py-6 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} reStart Hub. All rights reserved.</p>
        <p className="mt-1">Empowering South African Entrepreneurs.</p>
      </footer>
    </div>
  );
};

export default App;