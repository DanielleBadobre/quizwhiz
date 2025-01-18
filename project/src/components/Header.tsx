import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './images/logo.png';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = isHome ? [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
  ] : [
    { href: '/', label: 'Home' },
  ];

  return (
    <header className="fixed w-full bg-[#FDF0F2] backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="QuizzWhiz Logo" className="h-8 md:h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#FCAAB6] hover:text-[#C094E4] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/create"
              className="bg-[#C094E4] text-white w-32 h-19 flex items-center justify-center border-4 border-[#FFDBE9] hover:bg-[#AD85CD] transition-colors"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#FCAAB6]" />
            ) : (
              <Menu className="h-6 w-6 text-[#FCAAB6]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#FCAAB6] hover:text-[#C094E4] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/create"
                className="bg-[#C094E4] text-white px-6 py-2 rounded-full hover:bg-[#AD85CD] transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}