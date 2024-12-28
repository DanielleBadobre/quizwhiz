import { Document } from 'mongoose';

export const transformDeck = (deck: Document) => {
  return {
    id: deck._id.toString(),
    title: deck.title,
    cards: deck.cards.map((card: any) => ({
      id: card._id.toString(),
      question: card.question,
      answer: card.answer
    })),
    createdAt: deck.createdAt,
    updatedAt: deck.updatedAt
  };
}