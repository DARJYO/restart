import React from 'react';
import type { MarketingFormData, MarketingStrategy } from '../types';
import InsightCard from './InsightCard';
import MarketingPlan from './MarketingPlan';
import CampaignPlaybookCard from './CampaignPlaybookCard';
import { GrowthIcon, LightbulbIcon, TargetIcon, PlaybookIcon } from './icons';

interface DashboardProps {
  strategy: MarketingStrategy;
  businessProfile: MarketingFormData;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ strategy, businessProfile, onReset }) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Marketing Dashboard
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Actionable insights for <span className="font-bold text-sky-600">{businessProfile.businessName}</span>
          </p>
        </div>
        <button
          onClick={onReset}
          className="mt-4 md:mt-0 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-300 ease-in-out"
        >
          Reset & Start Over
        </button>
      </div>

      {/* Core Strategy Sections */}
      <div className="mb-12">
         <h3 className="text-2xl font-bold text-slate-800 mb-6">Core Strategy Pillars</h3>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <InsightCard 
              icon={<TargetIcon />} 
              title={strategy.nicheStrategy.title}
              description={strategy.nicheStrategy.description}
              steps={strategy.nicheStrategy.steps}
              color="amber"
            />
             <InsightCard 
              icon={<LightbulbIcon />}
              title={strategy.validationTactics.title}
              description={strategy.validationTactics.description}
              steps={strategy.validationTactics.steps}
              color="emerald"
            />
            <InsightCard 
              icon={<GrowthIcon />}
              title={strategy.scalabilityPlan.title}
              description={strategy.scalabilityPlan.description}
              steps={strategy.scalabilityPlan.steps}
              color="sky"
            />
          </div>
      </div>
      
      {/* Campaign Playbooks */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-600 mr-4">
                <PlaybookIcon />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Your Campaign Playbooks</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {strategy.campaignPlaybooks.map((playbook, index) => (
                <CampaignPlaybookCard key={index} playbook={playbook} />
            ))}
        </div>
      </div>


      {/* Detailed 90-Day Plan */}
      <MarketingPlan plan={strategy.detailedPlan} />

    </div>
  );
};

export default Dashboard;