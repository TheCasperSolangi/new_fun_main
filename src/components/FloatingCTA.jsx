import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';

export default function FloatingCTA() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLightning, setShowLightning] = useState(false);

  // Matrix rain characters
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

  useEffect(() => {
    // Initial loading animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      // Trigger lightning effect after load
      setTimeout(() => {
        setShowLightning(true);
        setTimeout(() => setShowLightning(false), 800);
      }, 500);
    }, 2000);

    // Periodic lightning effect
    const lightningInterval = setInterval(() => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 800);
    }, 8000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(lightningInterval);
    };
  }, []);

  const scrollToConnect = () => {
    const connectElement = document.getElementById('connect');
    if (connectElement) {
      connectElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs opacity-20 font-mono whitespace-nowrap"
            style={{
              left: `${i * 7}%`,
              animation: `matrixRain ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j} className="block">
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isLoaded ? (
          // Loading Animation
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="relative group">
            {/* Lightning Effect */}
            {showLightning && (
              <>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
                <div className="absolute -inset-2 bg-white rounded-full opacity-50 animate-ping"></div>
              </>
            )}
            
            {/* Main Button */}
            <button 
              onClick={scrollToConnect}
              className="relative bg-black border-2 border-green-400 text-green-400 px-6 py-3 rounded-full font-mono font-bold shadow-2xl hover:shadow-green-400/50 transition-all duration-300 flex items-center gap-2 overflow-hidden group-hover:scale-105"
              style={{
                boxShadow: showLightning ? '0 0 30px #00ff00, 0 0 60px #00ff00' : '0 0 20px rgba(0, 255, 0, 0.3)'
              }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Matrix Code Animation */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="text-xs font-mono text-green-400 whitespace-nowrap animate-pulse">
                  {matrixChars.substring(0, 20)}
                </div>
              </div>
              
              <Zap className={`w-5 h-5 z-10 ${showLightning ? 'animate-bounce text-white' : ''}`} />
              <span className="z-10 relative tracking-wider">Break the Matrix here →</span>
              
              {/* Glitch Effect */}
              <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-150"></div>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </>
  );
}