import { DeckModel } from '../models/Deck.js';
import { FlashcardModel } from '../models/Flashcard.js';
import { AIService } from './ai.service.js';
import { FileService } from './file.service';
import { transformDeck } from '../utils/transformers';
import { CreateDeckOptions } from '../types/deck';

export class DeckService {
  static async getAllDecks() {
    try {
      const decks = await DeckModel.find(); // Fetch all decks from the database
      return decks;
    } catch (error) {
      throw new Error('Error fetching decks');
    }
  }
  
  static async createDeck(title: string, cards: Array<{ question: string; answer: string }>) {
    const flashcards = await FlashcardModel.insertMany(cards);
    const deck = await DeckModel.create({
      title,
      cards: flashcards.map((card) => card._id)
    });
    return deck.populate('cards');
  }

  static async getDeck(id: string) {
    return DeckModel.findById(id).populate('cards');
  }

  static async updateDeck(id: string, title: string) {
    return DeckModel.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    ).populate('cards');
  }

  static async deleteDeck(id: string) {
    const deck = await DeckModel.findById(id);
    if (!deck) throw new Error('Deck not found');
    
    await FlashcardModel.deleteMany({ _id: { $in: deck.cards } });
    await deck.deleteOne();
  }

  static async generateFromText(title: string, content: string) {
    const flashcards = await AIService.generateFlashcards(content);
    return this.createDeck(title, flashcards);
  }

  static async generateFromFile(file: Express.Multer.File) {
    try {
      const content = await FileService.extractText(file);
      const title = file.originalname.split('.')[0];
      return this.generateFromText(title, content);
    } catch (error) {
      console.error('Error generating deck from file:', error);
      throw new Error('Failed to generate deck from file');
    }
  }

  static async generateFromTopic(
    title: string, 
    topic: string, 
    complexity: "beginner" | "intermediate" | "advanced"
  ) {
    try {
        // Get flashcards from AI
        const flashcards = await AIService.generateFromTopic(topic, complexity);
        
        // Create flashcard documents with IDs
        const flashcardDocs = await FlashcardModel.insertMany(
            flashcards.map(card => ({
                question: card.question,
                answer: card.answer
            }))
        );

        // Create the deck with references to flashcards
        const deck = await DeckModel.create({
            title,
            cards: flashcardDocs.map(card => card._id)
        });

        // Return populated deck
        const populatedDeck = await deck.populate<{ 
            _id: string; 
            title: string; 
            cards: Array<{ _id: string; question: string; answer: string }>; 
            createdAt: Date; 
            updatedAt: Date; 
        }>('cards');
        
        // Transform the response to match the expected structure
        return {
            id: populatedDeck._id.toString(),
            title: populatedDeck.title,
            cards: populatedDeck.cards.map(card => ({
                id: (card as any)._id.toString(),
                question: (card as any).question,
                answer: (card as any).answer
            })),
            createdAt: populatedDeck.createdAt,
            updatedAt: populatedDeck.updatedAt
        };
    } catch (error) {
        console.error('Error in generateFromTopic:', error);
        throw error;
    }
  }
}