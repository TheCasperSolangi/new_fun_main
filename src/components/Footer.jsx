"use client";
import React from 'react';
import { Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="py-12 bg-black border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Arcdatum
            </span>
          </div>
          
          <p className="text-gray-400 mb-6">
            Building the next generation of e-commerce entrepreneurs
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <a href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors">Terms of Service</a>
         
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              © 2025 Arcdatum. All rights reserved. Results may vary based on individual effort and market conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;