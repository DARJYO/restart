export interface StrategySection {
  title: string;
  description: string;
  steps: string[];
}

export interface ChannelRecommendation {
  channelName: string;
  strategy: string;
  saContext: string;
}

export interface BudgetAllocation {
  area: string;
  percentage: number;
  rationale: string;
}

export interface ContentPillar {
    pillar: string;
    ideas: string[];
}

export interface KeyMetric {
    metric: string;
    goal: string;
}

export interface CampaignPlaybook {
  name: string;
  channel: string;
  objective: string;
  steps: string[];
  saTip: string;
}

export interface MarketingStrategy {
  nicheStrategy: StrategySection;
  scalabilityPlan: StrategySection;
  validationTactics: StrategySection;
  detailedPlan: {
    channelRecommendations: ChannelRecommendation[];
    budgetAllocation: BudgetAllocation[];
    contentStrategy: {
        pillars: ContentPillar[];
        saSpecificTips: string[];
    };
    kpisToTrack: KeyMetric[];
  };
  campaignPlaybooks: CampaignPlaybook[];
}

export interface MarketingFormData {
  businessName: string;
  industry: string;
  targetAudience: string;
  budget: string;
}