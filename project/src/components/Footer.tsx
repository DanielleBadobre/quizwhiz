import React from 'react';
import { Brain } from 'lucide-react';
import logo from './images/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#FFDBE9] border-t border-[#C094E4]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="QuizzWhiz Logo" className="h-12 w-15" />
              <span className="text-xl font-bold text-[#C094E4]">Transform your learning experience with AI-powered flashcards</span>
            </div>
          </div>
  
          <div>
            <h3 className="font-semibold mb-4 text-[#C094E4]">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-[#FCAAB6] hover:text-[#C094E4]">Features</a></li>
              <li><a href="#how-it-works" className="text-[#FCAAB6] hover:text-[#C094E4]">How it Works</a></li>
            </ul>
          </div>
  
          <div>
          <h3 className="font-semibold mb-4 text-[#C094E4]">Socials</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/DanielleBadobre" className="text-[#FCAAB6] hover:text-[#C094E4]">Github</a></li>
              <li><a href="https://www.linkedin.com/in/danielle-badobre/" className="text-[#FCAAB6] hover:text-[#C094E4]">Linkedin</a></li>
              <li><a href="https://x.com/DanielleBadobre" className="text-[#FCAAB6] hover:text-[#C094E4]">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C094E4] mt-12 pt-8 text-center text-[#C094E4]">
          <p>&copy; {new Date().getFullYear()} QuizWhiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}