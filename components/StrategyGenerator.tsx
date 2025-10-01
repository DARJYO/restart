import React, { useState, useCallback } from 'react';
import type { MarketingFormData, MarketingStrategy } from '../types';
import { generateMarketingStrategy } from '../services/geminiService';
import Loader from './Loader';

interface StrategyGeneratorProps {
  onGenerate: (formData: MarketingFormData, strategy: MarketingStrategy) => void;
}

const StrategyGenerator: React.FC<StrategyGeneratorProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<MarketingFormData>({
    businessName: '',
    industry: '',
    targetAudience: '',
    budget: 'low',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateMarketingStrategy(formData);
      onGenerate(formData, result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the strategy. Please check your API key and try again.');
      setIsLoading(false);
    } 
    // No finally block to set loading false, as the component will unmount on success
  }, [formData, onGenerate]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Unlock Your Business's Marketing Potential
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Fill in your business details to generate a tailored marketing strategy focused on growth, validation, and finding your niche in the South African market.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
            <input
              type="text"
              name="businessName"
              id="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g., Biltong Bros"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-1">Industry / Sector</label>
            <input
              type="text"
              name="industry"
              id="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g., Artisanal Food Production"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-700 mb-1">Describe Your Target Audience</label>
            <textarea
              name="targetAudience"
              id="targetAudience"
              rows={3}
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="e.g., Health-conscious young professionals in Gauteng, rugby fans."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
              required
            ></textarea>
          </div>
          <div className="col-span-1">
            <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">Monthly Marketing Budget (ZAR)</label>
            <select
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
            >
              <option value="low">Low (&lt; R5,000)</option>
              <option value="medium">Medium (R5,000 - R20,000)</option>
              <option value="high">High (&gt; R20,000)</option>
            </select>
          </div>
          <div className="col-span-1 flex items-end">
             <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-300 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Strategy'}
            </button>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="mt-12 flex justify-center">
          <Loader />
        </div>
      )}
      
      {error && (
        <div className="mt-12 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default StrategyGenerator;