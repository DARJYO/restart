import React from 'react';
import type { MarketingStrategy } from '../types';
import { BudgetIcon, ChannelsIcon, ContentIcon, KpiIcon } from './icons';

interface MarketingPlanProps {
  plan: MarketingStrategy['detailedPlan'];
}

const PlanSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode;}> = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-sky-100 text-sky-600">
        {icon}
      </div>
      <h4 className="ml-4 text-xl font-bold text-slate-800">{title}</h4>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const MarketingPlan: React.FC<MarketingPlanProps> = ({ plan }) => {
  return (
    <div className="mt-16 mb-12">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-slate-800">Your Detailed 90-Day Marketing Plan</h3>
        <p className="mt-2 text-md text-slate-500">A step-by-step guide to get you started.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Channels */}
        <PlanSection icon={<ChannelsIcon />} title="Recommended Channels">
          <ul className="space-y-4">
            {plan.channelRecommendations.map((ch, i) => (
              <li key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h5 className="font-bold text-slate-800">{ch.channelName}</h5>
                <p className="text-sm text-slate-600 mt-1"><strong className="text-slate-700">Strategy:</strong> {ch.strategy}</p>
                <p className="text-sm text-slate-600 mt-1"><strong className="text-slate-700">SA Context:</strong> {ch.saContext}</p>
              </li>
            ))}
          </ul>
        </PlanSection>

        {/* Budget */}
        <PlanSection icon={<BudgetIcon />} title="Budget Allocation">
            <div className="space-y-2">
            {plan.budgetAllocation.map((alloc, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                        <h5 className="font-bold text-slate-800">{alloc.area}</h5>
                        <span className="font-bold text-sky-600 text-lg">{alloc.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${alloc.percentage}%` }}></div>
                    </div>
                     <p className="text-sm text-slate-600 mt-2">{alloc.rationale}</p>
                </div>
            ))}
            </div>
        </PlanSection>

        {/* Content */}
        <PlanSection icon={<ContentIcon />} title="Content Strategy">
          {plan.contentStrategy.pillars.map((pillar, i) => (
            <div key={i}>
              <h5 className="font-bold text-slate-800">{pillar.pillar}</h5>
              <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
                {pillar.ideas.map((idea, j) => (
                  <li key={j} className="text-slate-600">{idea}</li>
                ))}
              </ul>
            </div>
          ))}
           <div className="pt-2 mt-2 border-t border-slate-200">
             <h5 className="font-bold text-slate-800">SA-Specific Tips</h5>
             <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
                {plan.contentStrategy.saSpecificTips.map((tip, i) => (
                  <li key={i} className="text-slate-600">{tip}</li>
                ))}
              </ul>
           </div>
        </PlanSection>
        
        {/* KPIs */}
        <PlanSection icon={<KpiIcon />} title="KPIs to Track">
           <ul className="space-y-3">
            {plan.kpisToTrack.map((kpi, i) => (
              <li key={i} className="flex items-start">
                 <svg className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                   <h5 className="font-semibold text-slate-800">{kpi.metric}</h5>
                   <p className="text-sm text-slate-500">Goal: {kpi.goal}</p>
                </div>
              </li>
            ))}
          </ul>
        </PlanSection>
      </div>
    </div>
  );
};

export default MarketingPlan;