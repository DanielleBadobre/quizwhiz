import { Router } from 'express';
import { DeckController } from '../controllers/deck.controller';
import { validateRequest } from '../middleware/validate';
import { upload } from '../middleware/upload';

const router = Router();

// Create deck from text input
router.post(
  '/text',
  validateRequest(DeckController.createDeckSchema),
  DeckController.createFromText
);

// Create deck from topic
router.post(
  '/topic',
  validateRequest(DeckController.createFromTopicSchema),
  DeckController.createFromTopic
);

// Create deck from uploaded file
router.post(
  '/file',
  upload.single('file'),
  DeckController.createFromFile
);

// Retrieve a deck by ID
router.get('/:id', DeckController.getDeck);
// Update a deck by ID
router.put('/:id', DeckController.updateDeck);
// Delete a deck by ID
router.delete('/:id', DeckController.deleteDeck);

export const deckRoutes = router;