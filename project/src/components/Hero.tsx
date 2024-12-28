import React from 'react';
import { ArrowRight, FileText, Upload, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import image1 from './images/image1.png';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDF0F2] pt-24 pb-16 px-4">
      {/* Hero Section */}
      <div className="mt-16 text-center">
        <h1 aria-label="Learn different subjects" className="text-7xl md:text-8xl lg:text-9xl">
          <span className="text-[#FBADD1]">Learn</span>&nbsp;<span className="typewriter"></span>
        </h1>
      </div>
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-8">
        {/* Left Section */}
        <div className="text-left md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FBADD1] mb-6">
            Is it Magie? No ! It's <span className="text-[#C094E4]"> QUIZWHIZ</span> !
            Transform Your Learning with
            <span className="text-[#C094E4]"> AI-Powered</span> Flashcards
          </h1>
          <p className="text-xl text-[#FBADD1] mb-8 max-w-lg">
            Convert any text into effective study materials in seconds. QuizzWhiz uses AI to generate
            smart flashcards that help you learn faster and retain more.
          </p>
          {/* Pixelated Button */}
          <button
            onClick={() => navigate('/create')}
            className="pixel-corners relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-[#FFDBE9] bg-[#C094E4] hover:bg-[#AD85CD] transition-colors cursor-pointer uppercase"
            style={{ fontFamily: '"VT323", monospace' }}
          >
            Start Creating <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>


        {/* Right Section (Image) */}
        <div className="md:w-1/2">
          <img
            src={image1}
            alt="Illustrative graphic for learning"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
        <div className="pixel-corners bg-[#FEF5F6] p-6 shadow-sm hover:bg-[#FBADD1] transition-colors">
          <div className="bg-[#C094E4] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-[#FFDBE9]" />
          </div>
          <h3 className="text-[#8668A0] text-lg font-semibold mb-2">Paste Text</h3>
          <p className="text-[#8668A0]">
            Simply paste your study material and let our AI create perfect flashcards instantly.
          </p>
        </div>

        <div className="pixel-corners bg-[#FEF5F6] p-6 shadow-sm hover:bg-[#FBADD1] transition-colors">
          <div className="bg-[#C094E4] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-[#FFDBE9]" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-[#8668A0]">Upload Files</h3>
          <p className="text-[#8668A0]">
            Support for PDF and TXT files. Drag and drop your documents to get started.
          </p>
        </div>

        <div className="pixel-corners bg-[#FEF5F6] p-6 shadow-sm hover:bg-[#FBADD1] transition-colors">
          <div className="bg-[#C094E4] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Wand2 className="h-6 w-6 text-[#FFDBE9]" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-[#8668A0]">AI Generation</h3>
          <p className="text-[#8668A0]">
            Let AI generate topic-specific flashcards based on your chosen subject.
          </p>
        </div>
    </div>
      </div>
  );
}
