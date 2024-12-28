import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FlashcardProvider } from './context/FlashcardContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Create from './pages/Create';
import Flashcards from './pages/Flashcards';

export default function App() {
  return (
    <BrowserRouter>
      <FlashcardProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </FlashcardProvider>
    </BrowserRouter>
  );
}