import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../../context/FlashcardContext';
import { ApiService } from '../../services/api';

export default function FileUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useFlashcards();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const file = acceptedFiles[0];
      console.log('Processing file:', file.name);
      
      const deck = await ApiService.createDeckFromFile(file);
      console.log('Deck created:', deck);

      if (!deck || !deck.cards) {
        throw new Error('Invalid response from server');
      }

      dispatch({ type: 'SET_CURRENT_DECK', payload: deck });
      navigate('/flashcards');
    } catch (error) {
      console.error('Error processing file:', error);
      setError(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-[#C094E4] bg-[#FFDBE9]' 
            : 'border-[#FBADD1] hover:border-[#C094E4]'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-[#FBADD1] mb-4" />
        <p className="text-[#C094E4]">
          {isDragActive ? 'Drop your file here...' : 'Drag & drop your file here, or click to select'}
        </p>
        <p className="text-sm text-[#FCAAB6] mt-2">
          Supported formats: PDF, TXT (max 10MB)
        </p>
      </div>

      {error && (
        <div className="text-[#FCAAB6] text-sm p-2 bg-[#FDF0F2] pixel-corners">
          {error}
        </div>
      )}

      {acceptedFiles.length > 0 && (
        <div className="bg-[#FDF0F2] pixel-corners p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5 text-[#C094E4]" />
              <span className="text-sm text-[#C094E4]">{acceptedFiles[0].name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const files = [...acceptedFiles];
                files.splice(0, files.length);
              }}
              className="text-[#FBADD1] hover:text-[#FCAAB6] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C094E4] mx-auto mb-2"></div>
          <p className="text-sm text-[#C094E4]">Processing your file...</p>
        </div>
      )}
    </div>
  );
}