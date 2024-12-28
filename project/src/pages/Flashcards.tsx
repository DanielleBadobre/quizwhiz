import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlashcardGrid from '../components/flashcards/FlashcardGrid';
import FlashcardEditor from '../components/flashcards/FlashcardEditor';
import { useFlashcards } from '../context/FlashcardContext';
import '../index.css';

export default function Flashcards() {
  const [showEditor, setShowEditor] = useState(false);
  const { state } = useFlashcards();
  const { currentDeck } = state;

  if (!currentDeck) {
    return (
      <div className="min-h-screen bg-[#FDF0F2] pt-20 pb-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-[#C094E4] mb-4">No flashcard deck selected</p>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 bg-[#FBADD1] text-white rounded-lg hover:bg-[#FCAAB6] pixel-corners"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Create
          </Link>
        </div>
      </div>
    );
  }

  const cardCount = currentDeck.cards ? currentDeck.cards.length : 0;

  return (
    <div className="min-h-screen bg-[#FDF0F2] pt-20 pb-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#C094E4]">{currentDeck.title}</h1>
            <p className="text-[#FBADD1]">
              {cardCount} cards • Last updated{' '}
              {new Date(currentDeck.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/create"
              className="text-[#C094E4] hover:text-[#FBADD1]"
            >
              Back to Create
            </Link>
            <button
              onClick={() => setShowEditor(true)}
              className="inline-flex items-center px-4 py-2 bg-[#FBADD1] text-white rounded-lg hover:bg-[#FCAAB6] pixel-corners"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Card
            </button>
          </div>
        </div>

        <FlashcardGrid />

        {showEditor && (
          <FlashcardEditor onClose={() => setShowEditor(false)} />
        )}
      </div>
    </div>
  );
}
