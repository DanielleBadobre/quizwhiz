export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  lastReviewed?: Date;
}

export type FlashcardDeck = {
  id: string;
  title: string;
  cards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
};