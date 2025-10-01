import React from 'react';
import type { CampaignPlaybook } from '../types';

interface CampaignPlaybookCardProps {
  playbook: CampaignPlaybook;
}

const CampaignPlaybookCard: React.FC<CampaignPlaybookCardProps> = ({ playbook }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <div>
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
          {playbook.channel}
        </span>
      </div>
      <h4 className="text-xl font-bold text-slate-800 mt-3">{playbook.name}</h4>
      <p className="text-slate-600 mt-1 mb-4 flex-grow"><span className="font-semibold">Objective:</span> {playbook.objective}</p>
      
      <div>
        <h5 className="font-semibold text-slate-700 mb-2">Execution Steps:</h5>
        <ul className="space-y-2 mb-4">
          {playbook.steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600 text-sm">{step}</span>
            </li>
          ))}
        </ul>
      </div>

       <div className="mt-auto pt-4 border-t border-slate-200 bg-slate-50 -m-6 px-6 pb-6 rounded-b-xl">
        <p className="text-sm text-slate-700 font-semibold">
          <span className="font-bold text-indigo-600">💡 SA Tip:</span> {playbook.saTip}
        </p>
      </div>
    </div>
  );
};

export default CampaignPlaybookCard;