import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from '../config/index.js';

const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Define types for flashcard structure
interface Flashcard {
  question: string;
  answer: string;
}

export class AIService {
  private static validateFlashcards(cards: any[]): cards is Flashcard[] {
    return cards.every(card => 
      typeof card === 'object' &&
      typeof card.question === 'string' &&
      typeof card.answer === 'string'
    );
  }

  private static async parseAIResponse(text: string): Promise<Flashcard[]> {
    try {
      // Strip markdown code blocks if present
      let cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      // Log the cleaned text for debugging
      console.log('Cleaned text before parsing:', cleanText);
      
      const parsed = JSON.parse(cleanText);
      if (Array.isArray(parsed) && this.validateFlashcards(parsed)) {
        return parsed;
      }
      throw new Error('Invalid flashcard format from AI');
    } catch (error) {
      console.error('Error parsing AI response. Raw text:', text);
      console.error('Parse error:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  static async generateFlashcards(content: string, count: number = 10): Promise<Flashcard[]> {
    if (!CONFIG.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const prompt = `Create exactly ${count} flashcards from the following content. 
    Return ONLY a JSON array of objects, each with 'question' and 'answer' fields.
    Do not include any additional text or explanations.
    
    Content: ${content}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return await this.parseAIResponse(text);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to generate flashcards');
    }
  }

  static async generateFromTopic(
    topic: string, 
    complexity: 'beginner' | 'intermediate' | 'advanced', 
    count: number = 10
  ): Promise<Flashcard[]> {
    if (!CONFIG.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const prompt = `Create exactly ${count} ${complexity}-level flashcards about ${topic}.
    Return the response as a JSON array of objects, each with 'question' and 'answer' fields.
    The response should be a valid JSON array without any markdown formatting or additional text.
    Example format: [{"question": "Example Q", "answer": "Example A"}]`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return await this.parseAIResponse(text);
    } catch (error) {
      console.error('Error generating topic flashcards:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to generate flashcards from topic');
    }
  }
}