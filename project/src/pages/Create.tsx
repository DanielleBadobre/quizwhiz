import React from 'react';
import InputMethods from '../components/create/InputMethods';

export default function Create() {
  return (
    <div className="min-h-screen bg-[#FDF0F2] pt-20 pb-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#C094E4] mb-4">
            Create Your Flashcards
          </h1>
          <p className="text-[#FBADD1] max-w-2xl mx-auto">
            Choose your preferred method to generate AI-powered flashcards. 
            You can paste text directly, upload a file, or let AI generate cards from a topic.
          </p>
        </div>

        <InputMethods />
      </div>
    </div>
  );
}