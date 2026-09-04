import { GoogleGenerativeAI, Part } from '@google/generative-ai';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiService = {
  /**
   * Generates text from a standard text prompt
   */
  async generateText(prompt: string, requireJson = false): Promise<string> {
    if (!apiKey) {
      throw new Error('EXPO_PUBLIC_GEMINI_API_KEY is missing');
    }

    try {
      // Use Gemini 1.5 Flash as default for fast text tasks
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: requireJson ? { responseMimeType: 'application/json' } : undefined,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini generateText error:', error);
      throw new Error(error.message || 'Failed to generate content from Gemini API');
    }
  },

  /**
   * Generates text from a combination of prompt and multimedia parts (audio/image)
   */
  async generateContentWithMedia(prompt: string, mediaParts: Part[], requireJson = false): Promise<string> {
    if (!apiKey) {
      throw new Error('EXPO_PUBLIC_GEMINI_API_KEY is missing');
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: requireJson ? { responseMimeType: 'application/json' } : undefined,
      });

      const result = await model.generateContent([prompt, ...mediaParts]);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini generateContentWithMedia error:', error);
      throw new Error(error.message || 'Failed to process media with Gemini API');
    }
  }
};
