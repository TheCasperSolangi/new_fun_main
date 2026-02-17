"use client";
import React, { useState } from 'react';
import { Rocket, Menu, X, ChevronDown, Award, Play, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header id="header" className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-gold-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Arcdatum
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#hero" className="hover:text-yellow-400 transition-colors">Home</a>
              <a href="#why-choose" className="hover:text-yellow-400 transition-colors">Why Us</a>

              <a href="#testimonials" className="hover:text-yellow-400 transition-colors">Reviews</a>
              <a href="#faq" className="hover:text-yellow-400 transition-colors">FAQ</a>
            
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            <a href="#hero" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#why-choose" onClick={() => setIsMenuOpen(false)}>Why Us</a>

            <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Reviews</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
           
          </div>
        </div>
      )}
    </>
  );
};

export default Header;