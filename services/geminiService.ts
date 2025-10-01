import { GoogleGenAI, Type } from "@google/genai";
import type { MarketingFormData, MarketingStrategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    nicheStrategy: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["title", "description", "steps"],
    },
    scalabilityPlan: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["title", "description", "steps"],
    },
    validationTactics: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["title", "description", "steps"],
    },
    detailedPlan: {
      type: Type.OBJECT,
      properties: {
        channelRecommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              channelName: { type: Type.STRING },
              strategy: { type: Type.STRING },
              saContext: { type: Type.STRING },
            },
            required: ["channelName", "strategy", "saContext"],
          },
        },
        budgetAllocation: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              area: { type: Type.STRING },
              percentage: { type: Type.NUMBER },
              rationale: { type: Type.STRING },
            },
            required: ["area", "percentage", "rationale"],
          },
        },
        contentStrategy: {
          type: Type.OBJECT,
          properties: {
            pillars: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  pillar: { type: Type.STRING },
                  ideas: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["pillar", "ideas"],
              },
            },
            saSpecificTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["pillars", "saSpecificTips"],
        },
        kpisToTrack: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              metric: { type: Type.STRING },
              goal: { type: Type.STRING },
            },
            required: ["metric", "goal"],
          },
        },
      },
      required: [
        "channelRecommendations",
        "budgetAllocation",
        "contentStrategy",
        "kpisToTrack",
      ],
    },
    campaignPlaybooks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          channel: { type: Type.STRING },
          objective: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          saTip: { type: Type.STRING },
        },
        required: ["name", "channel", "objective", "steps", "saTip"],
      },
    },
  },
  required: ["nicheStrategy", "scalabilityPlan", "validationTactics", "detailedPlan", "campaignPlaybooks"],
};


export const generateMarketingStrategy = async (
  formData: MarketingFormData
): Promise<MarketingStrategy> => {
  const { businessName, industry, targetAudience, budget } = formData;

  const budgetMap = {
    low: "Low (less than R5,000 per month)",
    medium: "Medium (between R5,000 and R20,000 per month)",
    high: "High (more than R20,000 per month)",
  };

  const prompt = `
    Analyze the following details for a new South African business and generate a concise, actionable marketing strategy.

    Business Name: ${businessName}
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Monthly Marketing Budget: ${budgetMap[budget as keyof typeof budgetMap]}

    Your response must be a JSON object that strictly follows the provided schema. The strategy must be tailored specifically for the South African market context.

    1.  **Overview Sections (nicheStrategy, scalabilityPlan, validationTactics)**: Provide a compelling title, a brief description (2-3 sentences), and 3-4 concrete, actionable steps for each.

    2.  **detailedPlan**: Provide a comprehensive 90-day plan covering:
        *   **channelRecommendations**: Suggest 3-4 top channels with strategy and SA-specific context (e.g., WhatsApp, Instagram, Facebook Marketplace).
        *   **budgetAllocation**: Break down the budget into 2-4 key areas with percentages and rationale. Total must be 100.
        *   **contentStrategy**: Define 2-3 content pillars with ideas and provide 2-3 SA-specific content tips.
        *   **kpisToTrack**: List 3-4 essential KPIs with a simple goal for the first 90 days.

    3.  **campaignPlaybooks**: Generate 2-3 practical, step-by-step campaign playbooks. For each playbook:
        *   'name': A clear, descriptive name (e.g., "WhatsApp First Customer Offer").
        *   'channel': The primary channel for the campaign (e.g., "WhatsApp Business", "Instagram Reels").
        *   'objective': The main goal of the campaign (e.g., "Drive initial sales and gather testimonials").
        *   'steps': A list of 3-5 clear, sequential steps to execute the campaign.
        *   'saTip': A crucial tip for making the campaign resonate specifically with a South African audience.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    const parsedData = JSON.parse(jsonText);
    
    // Deeper validation for the new structure
    if (
      parsedData.nicheStrategy &&
      parsedData.scalabilityPlan &&
      parsedData.validationTactics &&
      parsedData.detailedPlan &&
      parsedData.campaignPlaybooks
    ) {
      return parsedData as MarketingStrategy;
    } else {
      throw new Error("Received malformed data from API.");
    }
  } catch (error) {
    console.error("Error generating marketing strategy:", error);
    throw new Error("Failed to generate strategy from Gemini API.");
  }
};