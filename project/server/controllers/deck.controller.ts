import { Request, Response } from 'express';
import { DeckService } from '../services/deck.service.js';
import { z } from 'zod';
import { FileService } from '../services/file.service';

export class DeckController {
  // Validation schemas
  static createDeckSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    content: z.string().min(1, "Content is required"),
  });

  static createFromTopicSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    topic: z.string().min(1, "Topic is required"),
    complexity: z.enum(['beginner', 'intermediate', 'advanced']),
  });

  static updateDeckSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  });

  // Controller methods
  static async getAllDecks(req: Request, res: Response) {
    try {
      const decks = await DeckService.getAllDecks();
      res.json({ success: true, data: decks });
    } catch (error) {
      console.error('Error in getAllDecks:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch decks',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async createFromText(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const deck = await DeckService.generateFromText(title, content);
      res.status(201).json({ success: true, data: deck });
    } catch (error) {
      console.error('Error in createFromText:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to create deck',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async createFromTopic(req: Request, res: Response) {
    try {
      const { title, topic, complexity } = req.body;
      const deck = await DeckService.generateFromTopic(title, topic, complexity);
      res.status(201).json({ success: true, data: deck });
    } catch (error) {
      console.error('Error in createFromTopic:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to create deck from topic',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  
  static async getDeck(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deck = await DeckService.getDeck(id);
      
      if (!deck) {
        return res.status(404).json({ 
          success: false,
          error: 'Deck not found' 
        });
      }
      
      res.json({ success: true, data: deck });
    } catch (error) {
      console.error('Error in getDeck:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to get deck',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async updateDeck(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      
      const deck = await DeckService.updateDeck(id, title);
      
      if (!deck) {
        return res.status(404).json({ 
          success: false,
          error: 'Deck not found' 
        });
      }
      
      res.json({ success: true, data: deck });
    } catch (error) {
      console.error('Error in updateDeck:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to update deck',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async deleteDeck(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await DeckService.deleteDeck(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteDeck:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to delete deck',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async createFromFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const content = await FileService.extractText(req.file);
      const title = req.file.originalname.split('.')[0];
      const deck = await DeckService.generateFromText(title, content);
      res.status(201).json({ success: true, data: deck });
      
      // Validate content length
      if (!content || content.length < 10) {
        return res.status(400).json({ 
          error: 'Invalid content',
          message: 'The extracted content is too short or empty'
        });
      }
    } catch (error) {
      console.error('Error creating deck from file:', error);
      res.status(500).json({ 
        error: 'Failed to create deck from file',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  } 
}