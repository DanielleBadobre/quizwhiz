import React, { useState } from 'react';
import { Flashcard } from '../../types/flashcard';
import { useFlashcards } from '../../context/FlashcardContext';
import { Edit3, Trash2, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import FlashcardEditor from './FlashcardEditor';
import '../../index.css';

interface FlashcardItemProps {
  card: Flashcard;
  isSelected: boolean;
  onSelect: () => void;
}

export default function FlashcardItem({ card, isSelected, onSelect }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { dispatch } = useFlashcards();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_CARDS', payload: [card.id] });
    setShowMenu(false);
  };

  const handleEdit = () => {
    setShowEditor(true);
    setShowMenu(false);
  };

  return (
    <>
      <div
        className={clsx(
          'group relative bg-[#FFDBE9] pixel-corners shadow-sm transition-all duration-300 transform perspective-1000',
          isSelected ? 'bg-[#FFC1CC]' : 'border-[#FBADD1] hover:border-[#FCAAB6]'
        )}
        style={{ height: '200px' }}
      >
        <div
          className={clsx(
            'absolute inset-0 w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer',
            isFlipped && 'rotate-y-180'
          )}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden p-4">
            <div className="h-full flex flex-col">
              <div className="mt-4 flex-1">
                <p className="text-[#C094E4]">{card.question}</p>
              </div>
              <div className="text-sm text-[#FCAAB6]">Click to reveal answer</div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-4 bg-[#FDF0F2] pixel-corners">
            <div className="h-full flex flex-col">
              <div className="flex-1 mt-4">
                <p className="text-[#C094E4]">{card.answer}</p>
              </div>
              <div className="text-sm text-[#FCAAB6]">Click to show question</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="w-5 h-5 rounded border border-[#FBADD1] flex items-center justify-center"
          >
            {isSelected && (
              <div className="w-3 h-3 bg-[#C094E4] rounded-sm"></div>
            )}
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 text-[#FCAAB6] hover:text-[#C094E4] rounded-full hover:bg-[#FFDBE9]"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-[#FDF0F2] pixel-corners shadow-lg border border-[#FBADD1] py-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-[#C094E4] hover:bg-[#FBADD1] flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-[#FCAAB6] hover:bg-[#FFC1CC] flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditor && (
        <FlashcardEditor 
          card={card} 
          onClose={() => setShowEditor(false)} 
        />
      )}
    </>
  );
}
