import { geminiService } from './geminiService';
import { PriceSuggestion, ServiceResponse } from '../types';

export const pricingService = {
  /**
   * Suggests a price range using AI, or falls back to a deterministic model if API fails.
   */
  async getSuggestedPrice(
    category: string, 
    material: string, 
    craftType: string
  ): Promise<ServiceResponse<PriceSuggestion>> {
    try {
      // Attempt AI pricing first
      const prompt = `
You are an expert market analyst for traditional Indian handicrafts.
Suggest a realistic retail price range in Indian Rupees (INR) for a handmade product with the following details:
Category: ${category}
Material: ${material}
Craft Type: ${craftType}

Respond ONLY with a valid JSON object matching exactly this schema:
{
  "suggestedPrice": 2500,
  "minPrice": 2000,
  "maxPrice": 3500,
  "confidence": "High" | "Medium" | "Low",
  "reasoning": "A short 1-sentence explanation of why this price is suggested."
}
`;

      const responseText = await geminiService.generateText(prompt, true);
      const data = JSON.parse(responseText) as PriceSuggestion;
      
      if (!data.suggestedPrice) throw new Error("Invalid AI Pricing Response");

      return { success: true, data };
    } catch (error: any) {
      console.warn('AI Pricing failed, using fallback deterministic model:', error.message);
      
      // Fallback deterministic pricing logic (Demo mode)
      const fallbackPrice = this.calculateFallbackPrice(category);
      
      return {
        success: true,
        data: {
          suggestedPrice: fallbackPrice,
          minPrice: Math.floor(fallbackPrice * 0.8),
          maxPrice: Math.floor(fallbackPrice * 1.3),
          confidence: 'Low',
          reasoning: 'Fallback pricing applied due to AI service unavailability (Demo Mode).'
        }
      };
    }
  },

  /**
   * Simple deterministic pricing for fallback/demo purposes
   */
  calculateFallbackPrice(category: string): number {
    switch (category.toLowerCase()) {
      case 'textiles': return 4500;
      case 'art & paintings': return 3000;
      case 'home decor': return 1200;
      case 'jewelry': return 2500;
      default: return 1500;
    }
  }
};
