import { GoogleGenAI } from '@google/genai';

export const geminiInstance = new GoogleGenAI({
  apiKey: 'AIzaSyABUXo0bYJwzlvp4_NwK220RY_R2antVj8'
});

export interface GeminiRequestParams {
  prompt: string;
  responseAliases: string[];
  responseJsonSchema: unknown;
}
