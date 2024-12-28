import { FlashcardDeck } from '../types/flashcard';

const STORAGE_KEY = 'quizzwhiz_decks';

export const StorageService = {
  getDecks: (): FlashcardDeck[] => {
    const decks = localStorage.getItem(STORAGE_KEY);
    return decks ? JSON.parse(decks) : [];
  },

  saveDeck: (deck: FlashcardDeck): void => {
    const decks = StorageService.getDecks();
    const existingIndex = decks.findIndex(d => d.id === deck.id);
    
    if (existingIndex >= 0) {
      decks[existingIndex] = deck;
    } else {
      decks.push(deck);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  },

  deleteDeck: (deckId: string): void => {
    const decks = StorageService.getDecks().filter(d => d.id !== deckId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  },

  getCurrentDeck: (): FlashcardDeck | null => {
    const current = localStorage.getItem('quizzwhiz_current_deck');
    return current ? JSON.parse(current) : null;
  },

  setCurrentDeck: (deck: FlashcardDeck | null): void => {
    if (deck) {
      localStorage.setItem('quizzwhiz_current_deck', JSON.stringify(deck));
    } else {
      localStorage.removeItem('quizzwhiz_current_deck');
    }
  }
};