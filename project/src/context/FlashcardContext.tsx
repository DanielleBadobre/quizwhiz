import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Flashcard, FlashcardDeck } from '../types/flashcard';
import { StorageService } from '../services/storage';

type FlashcardState = {
  decks: FlashcardDeck[];
  currentDeck: FlashcardDeck | null;
  selectedCards: string[];
};

type FlashcardAction =
  | { type: 'LOAD_DECKS'; payload: FlashcardDeck[] }
  | { type: 'SET_CURRENT_DECK'; payload: FlashcardDeck }
  | { type: 'ADD_CARDS'; payload: Flashcard[] }
  | { type: 'UPDATE_CARD'; payload: Flashcard }
  | { type: 'DELETE_CARDS'; payload: string[] }
  | { type: 'TOGGLE_SELECT_CARD'; payload: string }
  | { type: 'SELECT_ALL_CARDS'; payload: string[] }
  | { type: 'CLEAR_SELECTED' }
  | { type: 'DELETE_DECK'; payload: string };

const initialState: FlashcardState = {
  decks: [],
  currentDeck: null,
  selectedCards: [],
};

const flashcardReducer = (state: FlashcardState, action: FlashcardAction): FlashcardState => {
  switch (action.type) {
    case 'LOAD_DECKS':
      return { ...state, decks: action.payload };
      
    case 'SET_CURRENT_DECK': {
      StorageService.setCurrentDeck(action.payload);
      StorageService.saveDeck(action.payload);
      return { ...state, currentDeck: action.payload };
    }

    case 'ADD_CARDS': {
      if (!state.currentDeck) return state;
      const updatedDeck = {
        ...state.currentDeck,
        cards: [...state.currentDeck.cards, ...action.payload],
        updatedAt: new Date(),
      };
      StorageService.saveDeck(updatedDeck);
      return { ...state, currentDeck: updatedDeck };
    }

    case 'UPDATE_CARD': {
      if (!state.currentDeck) return state;
      const updatedDeck = {
        ...state.currentDeck,
        cards: state.currentDeck.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
        updatedAt: new Date(),
      };
      StorageService.saveDeck(updatedDeck);
      return { ...state, currentDeck: updatedDeck };
    }

    case 'DELETE_CARDS': {
      if (!state.currentDeck) return state;
      const updatedDeck = {
        ...state.currentDeck,
        cards: state.currentDeck.cards.filter(
          (card) => !action.payload.includes(card.id)
        ),
        updatedAt: new Date(),
      };
      StorageService.saveDeck(updatedDeck);
      return {
        ...state,
        currentDeck: updatedDeck,
        selectedCards: state.selectedCards.filter(
          (id) => !action.payload.includes(id)
        ),
      };
    }

    case 'DELETE_DECK': {
      StorageService.deleteDeck(action.payload);
      const updatedDecks = state.decks.filter(deck => deck.id !== action.payload);
      if (state.currentDeck?.id === action.payload) {
        StorageService.setCurrentDeck(null);
        return { ...state, decks: updatedDecks, currentDeck: null };
      }
      return { ...state, decks: updatedDecks };
    }

    case 'TOGGLE_SELECT_CARD':
      return {
        ...state,
        selectedCards: state.selectedCards.includes(action.payload)
          ? state.selectedCards.filter((id) => id !== action.payload)
          : [...state.selectedCards, action.payload],
      };

      case 'SELECT_ALL_CARDS':
        return {
          ...state,
          selectedCards: action.payload
        };

    case 'CLEAR_SELECTED':
      return { ...state, selectedCards: [] };

    default:
      return state;
  }
};

const FlashcardContext = createContext<{
  state: FlashcardState;
  dispatch: React.Dispatch<FlashcardAction>;
} | null>(null);

export const FlashcardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(flashcardReducer, initialState);

  // Load decks from storage on mount
  useEffect(() => {
    const loadedDecks = StorageService.getDecks();
    const currentDeck = StorageService.getCurrentDeck();
    
    dispatch({ type: 'LOAD_DECKS', payload: loadedDecks });
    if (currentDeck) {
      dispatch({ type: 'SET_CURRENT_DECK', payload: currentDeck });
    }
  }, []);

  return (
    <FlashcardContext.Provider value={{ state, dispatch }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcards must be used within a FlashcardProvider');
  }
  return context;
};