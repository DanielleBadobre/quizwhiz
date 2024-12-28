import { useFlashcards } from '../../context/FlashcardContext';
import FlashcardItem from './FlashcardItem';
import { Trash2, Download, CheckSquare } from 'lucide-react';
import '../../index.css';

export default function FlashcardGrid() {
  const { state, dispatch } = useFlashcards();
  const { currentDeck, selectedCards } = state;

  if (!currentDeck) return null;

  const handleDeleteSelected = () => {
    if (selectedCards.length === 0) return;
    dispatch({ type: 'DELETE_CARDS', payload: selectedCards });
  };

  const handleExport = () => {
    if (selectedCards.length === 0) return;

    const cardsToExport = currentDeck.cards.filter(card => 
      selectedCards.includes(card.id)
    );

    if (cardsToExport.length === 0) {
      console.error("No cards selected for export.");
      return;
    }

    const csvContent = [
      'Front,Back',
      ...selectedCards.map((cardId) => {
        const card = currentDeck.cards.find(card => card.id === cardId);
        return card ? `"${card.question.replace(/"/g, '""')}","${card.answer.replace(/"/g, '""')}"` : '';
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${currentDeck.title || 'flashcards'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectAll = () => {
    if (selectedCards.length === currentDeck.cards.length) {
      dispatch({ type: 'CLEAR_SELECTED' });
    } else {
      const allCardIds = currentDeck.cards.map(card => card.id);
      dispatch({ type: 'SELECT_ALL_CARDS', payload: allCardIds });
    }
  };

  const isAllSelected = currentDeck.cards.length > 0 && selectedCards.length === currentDeck.cards.length;

  return (
    <div className="space-y-6">
      {selectedCards.length > 0 && (
        <div className="flex items-center justify-between bg-[#FFDBE9] p-4 shadow-sm pixel-corners">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#C094E4]">
              {selectedCards.length} cards selected
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="inline-flex items-center px-3 py-1.5 text-sm text-[#C094E4] hover:text-[#FBADD1] hover:bg-[#FFDBE9] rounded-md pixel-corners"
            >
              <CheckSquare className="h-4 w-4 mr-1" />
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={() => dispatch({ type: 'CLEAR_SELECTED' })}
              className="text-sm text-[#C094E4] hover:text-[#FBADD1]"
            >
              Clear selection
            </button>
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center px-3 py-1.5 text-sm text-[#FCAAB6] hover:text-[#FFDBE9] hover:bg-[#FFC1CC] rounded-md pixel-corners"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
            <button
              className="inline-flex items-center px-3 py-1.5 text-sm text-[#C094E4] hover:text-[#FBADD1] hover:bg-[#FFDBE9] rounded-md pixel-corners"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDeck.cards.map((card) => (
          <FlashcardItem
            key={card.id}
            card={card}
            isSelected={selectedCards.includes(card.id)}
            onSelect={() => dispatch({ type: 'TOGGLE_SELECT_CARD', payload: card.id })}
            className="bg-[#FFC1CC] text-[#C094E4] rounded-lg pixel-corners"
          />
        ))}
      </div>
    </div>
  );
}
