import { GoogleGenAI } from '@google/genai';

export const geminiInstance = new GoogleGenAI({
  // eslint-disable-next-line node/prefer-global/process
  apiKey: process.env.GEMINI_API_KEY
});

export interface GeminiRequestParams {
  prompt: string;
  responseAliases: string[];
  responseJsonSchema: unknown;
}
