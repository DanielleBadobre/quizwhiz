import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../../context/FlashcardContext';
import { ApiService } from '../../services/api';

export default function TopicInput() {
  const [topic, setTopic] = useState('');
  const [complexity, setComplexity] = useState('intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useFlashcards();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const deck = await ApiService.createDeckFromTopic(
        `${topic} Flashcards`,
        topic,
        complexity
      );
      dispatch({ type: 'SET_CURRENT_DECK', payload: deck });
      navigate('/flashcards');
    } catch (error: any) {
      setError('Failed to generate flashcards. Please try again.');
      console.error('Error generating flashcards:', error);
      if (error.response) {
        console.error('Error response:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-[#C094E4] mb-2">
          What topic would you like to study?
        </label>
        <input
          type="text"
          id="topic"
          className="w-full border-2 border-[#FBADD1] bg-white
            focus:border-[#C094E4] focus:ring-[#C094E4] focus:ring-opacity-50
            placeholder-[#FCAAB6]"
          placeholder="e.g., World War II, Photosynthesis, JavaScript Basics"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#C094E4] mb-2">
          Complexity Level
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setComplexity(level)}
              className={`
                p-3 text-sm border-2 capitalize transition-all duration-200
                ${complexity === level
                  ? 'border-[#C094E4] bg-[#FFDBE9] text-[#C094E4]'
                  : 'border-[#FBADD1] hover:border-[#C094E4] text-[#FCAAB6] hover:text-[#C094E4]'
                }
              `}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-[#FCAAB6] text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className="
            inline-flex items-center px-4 py-2 pixel-corners
            bg-[#C094E4] text-white hover:bg-[#FBADD1]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
        >
          {isLoading ? 'Generating...' : 'Generate AI Flashcards'}
          {!isLoading && <Wand2 className="ml-2 h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}