import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../../context/FlashcardContext';
import { ApiService } from '../../services/api';
import '../../index.css';

export default function TextInput() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useFlashcards();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const deck = await ApiService.createDeckFromText('My Flashcards', text);
      dispatch({ type: 'SET_CURRENT_DECK', payload: deck });
      navigate('/flashcards');
    } catch (error) {
      setError('Failed to generate flashcards. Please try again.');
      console.error('Error generating flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="content" 
          className="block text-sm font-medium text-[#C094E4] mb-2"
        >
          Enter your study material
        </label>
        <textarea
          id="content"
          rows={8}
          className={`
            w-full
            rounded
            border-2 border-[#FBADD1]
            bg-white
            focus:border-[#C094E4] focus:ring-[#C094E4] focus:ring-opacity-50
            placeholder-[#FCAAB6]
            transition-all duration-200
          `}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      {error && (
        <div className="text-[#FCAAB6] text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[#C094E4]">
          {text.length} characters
        </p>
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className={`
            inline-flex items-center px-4 py-2
            [clip-path:polygon(0_4px,4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px))]
            bg-[#C094E4] text-white 
            hover:bg-[#FBADD1] hover:shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          `}
        >
          {isLoading ? 'Generating...' : 'Generate Flashcards'}
          {!isLoading && <Send className="ml-2 h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}