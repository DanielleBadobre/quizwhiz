export interface CreateDeckOptions {
    title: string;
    topic: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
  }
  
  export interface DeckResponse {
    id: string;
    title: string;
    cards: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
  }