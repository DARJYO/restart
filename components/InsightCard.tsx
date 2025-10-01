
import React from 'react';

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: string[];
  color: 'amber' | 'emerald' | 'sky';
}

const colorClasses = {
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    borderColor: 'border-amber-200',
    bullet: 'text-amber-500'
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    bullet: 'text-emerald-500'
  },
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-600',
    borderColor: 'border-sky-200',
    bullet: 'text-sky-500'
  }
};

const InsightCard: React.FC<InsightCardProps> = ({ icon, title, description, steps, color }) => {
  const colors = colorClasses[color];
  return (
    <div className={`p-6 rounded-xl shadow-md border ${colors.borderColor} ${colors.bg} flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300`}>
      <div className="flex items-center mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colors.iconBg} ${colors.iconText}`}>
          {icon}
        </div>
        <h4 className={`ml-4 text-xl font-bold ${colors.text}`}>{title}</h4>
      </div>
      <p className="text-slate-600 mb-4 flex-grow">{description}</p>
      <div>
        <h5 className="font-semibold text-slate-700 mb-2">Actionable Steps:</h5>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <svg className={`flex-shrink-0 w-5 h-5 mr-2 mt-0.5 ${colors.bullet}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightCard;
