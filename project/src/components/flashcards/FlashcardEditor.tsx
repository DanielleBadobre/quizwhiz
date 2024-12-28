import React, { useState } from 'react';
import { Flashcard } from '../../types/flashcard';
import { useFlashcards } from '../../context/FlashcardContext';
import { X } from 'lucide-react';
import '../../index.css';

interface FlashcardEditorProps {
  card?: Flashcard;
  onClose: () => void;
}

export default function FlashcardEditor({ card, onClose }: FlashcardEditorProps) {
  const { dispatch } = useFlashcards();
  const [question, setQuestion] = useState(card?.question || '');
  const [answer, setAnswer] = useState(card?.answer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCard: Flashcard = {
      id: card?.id || crypto.randomUUID(),
      question,
      answer,
      lastReviewed: card?.lastReviewed,
    };

    if (card) {
      dispatch({ type: 'UPDATE_CARD', payload: updatedCard });
    } else {
      dispatch({ type: 'ADD_CARDS', payload: [updatedCard] });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#FDF0F2]/70 flex items-center justify-center z-50">
      <div className="bg-[#FFC1CC] pixel-corners shadow-xl max-w-lg w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-[#FFDBE9]">
          <h3 className="text-lg font-semibold text-[#C094E4]">
            {card ? 'Edit Flashcard' : 'Create Flashcard'}
          </h3>
          <button
            onClick={onClose}
            className="text-[#FBADD1] hover:text-[#FCAAB6]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-[#C094E4] mb-1"
            >
              Question
            </label>
            <textarea
              id="question"
              rows={3}
              className="w-full border-[#FFDBE9] bg-[#FFDBE9] text-[#C094E4] shadow-sm focus:border-[#FBADD1] focus:ring-[#FBADD1]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-[#C094E4] mb-1"
            >
              Answer
            </label>
            <textarea
              id="answer"
              rows={3}
              className="w-full border-[#FFDBE9] bg-[#FFDBE9] text-[#C094E4] shadow-sm focus:border-[#FBADD1] focus:ring-[#FBADD1]"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#FCAAB6] bg-[#FDF0F2] pixel-corners hover:bg-[#C094E4]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C094E4] text-white pixel-corners hover:bg-[#FBADD1]"
            >
              {card ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}