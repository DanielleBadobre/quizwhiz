import { Router } from 'express';
import { DeckController } from '../controllers/deck.controller';
import { validateRequest } from '../middleware/validate';
import { upload } from '../middleware/upload';

const router = Router();

router.post(
  '/text',
  validateRequest(DeckController.createDeckSchema),
  DeckController.createFromText
);

router.post(
  '/topic',
  validateRequest(DeckController.createFromTopicSchema),
  DeckController.createFromTopic
);

router.post(
  '/file',
  upload.single('file'),
  DeckController.createFromFile
);

router.get('/:id', DeckController.getDeck);
router.put('/:id', DeckController.updateDeck);
router.delete('/:id', DeckController.deleteDeck);

export const deckRoutes = router;