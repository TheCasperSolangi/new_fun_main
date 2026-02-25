"use client"
import React, { useState, useEffect, useCallback } from 'react';

export default function MatrixPillChoice() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [selectedPill, setSelectedPill] = useState(null);
  const [matrixCode, setMatrixCode] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Detect mobile device
  // Testing Comment
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateMatrixCode = useCallback(() => {
    const chars = '0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const count = isMobile ? 50 : 100; // Reduce particles on mobile
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      size: Math.random() * 8 + 8
    }));
  }, [isMobile]);

  useEffect(() => {
    setIsLoaded(true);
    setMatrixCode(generateMatrixCode());
    
    const interval = setInterval(() => {
      setMatrixCode(generateMatrixCode());
    }, 4000);
    
    return () => clearInterval(interval);
  }, [generateMatrixCode]);

  const handlePillSelect = (pill) => {
    setSelectedPill(pill);
    setLoadingProgress(0);
    
    // Animated loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          
          if (pill === 'blue') {
            // Blue pill: show final message and stop
            setTimeout(() => {
              setShowFinalMessage(true);
            }, 500);
          } else if (pill === 'red') {
            // Red pill: show message then navigate to onboarding
            setTimeout(() => {
              setShowFinalMessage(true);
              // Navigate to onboarding after showing the message
              setTimeout(() => {
                // In a real Next.js app, you would use:
                // import { useRouter } from 'next/router';
                // const router = useRouter();
                // router.push('/onboarding');
                
                // For demonstration, we'll use window.location
                // Replace this with your preferred navigation method
                window.location.href = '/onboarding';
              }, 3000); // Show red message for 3 seconds before navigating
            }, 500);
          }
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const resetChoice = () => {
    setSelectedPill(null);
    setShowFinalMessage(false);
    setLoadingProgress(0);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      {/* Enhanced Matrix Rain Background */}
      <div className="absolute inset-0 z-0">
        {matrixCode.map((item) => (
          <div
            key={item.id}
            className="absolute text-green-400 font-mono animate-pulse transition-all duration-2000"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: item.opacity,
              fontSize: `${item.size}px`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translateY(${Math.sin(Date.now() * 0.001 + item.id) * 15}px) rotate(${Math.sin(Date.now() * 0.0005 + item.id) * 5}deg)`,
              textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
            }}
          >
            {item.char}
          </div>
        ))}
      </div>
      
      {/* Enhanced Digital Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-green-950/20 via-black to-black" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 255, 0, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
            linear-gradient(rgba(0, 255, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 30px 30px, 30px 30px'
        }}
      />
      
      {/* Main Content */}
      <div className={`relative z-10 text-center w-full max-w-6xl transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        
        {/* Enhanced Matrix-style Title */}
        <div className={`mb-8 ${isMobile ? 'mb-6' : 'mb-16'}`}>
          <div className="mb-6">
            <div className="text-green-400 text-xs font-mono mb-2 opacity-70 animate-pulse">
              <span className="inline-block animate-bounce">{'>'}</span> MATRIX_PROTOCOL://CHOICE_INITIATED
            </div>
            <h1 className={`font-bold text-green-400 mb-4 tracking-wider font-mono ${isMobile ? 'text-4xl' : 'text-7xl'}`}>
              <span className="animate-pulse text-red-400">[</span>
              <span style={{ textShadow: '0 0 20px rgba(0, 255, 0, 0.8)' }}>THE CHOICE</span>
              <span className="animate-pulse text-blue-400">]</span>
            </h1>
          </div>
          
          <div className="relative mb-8">
            <div className={`bg-green-400 mx-auto animate-pulse ${isMobile ? 'w-48 h-0.5' : 'w-64 h-1'}`} style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)' }}></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)' }}></div>
          </div>
          
          <div className={`text-green-300 max-w-3xl mx-auto leading-relaxed font-mono ${isMobile ? 'text-base px-4' : 'text-xl'}`}>
            <span className="text-red-400 animate-pulse">{'>'}</span> This is your last chance. After this, there is no going back.
          </div>
        </div>

        {/* Enhanced Morpheus Quote */}
        <div className={`max-w-5xl mx-auto ${isMobile ? 'mb-8 px-2' : 'mb-16'}`}>
          <div className="border border-green-400 border-opacity-40 p-4 md:p-8 bg-black bg-opacity-60 backdrop-blur-sm" style={{ boxShadow: '0 0 30px rgba(0, 255, 0, 0.1)' }}>
            <div className="text-green-400 text-xs font-mono mb-4 opacity-70 animate-pulse">
              <span className="inline-block animate-spin mr-2">⚡</span> MORPHEUS_QUOTE.EXE LOADING...
            </div>
            <p className={`text-green-200 font-mono leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'}`}>
              <span className="text-blue-400"></span>You take the <span className="text-blue-400 font-bold animate-pulse">blue pill</span>—the story ends, 
              you wake up in your bed and believe whatever you want to believe.<br/><br/>
              You take the <span className="text-red-400 font-bold animate-pulse">red pill</span>—break free of the matrix and see just how far down the rabbit hole goes.<span className="text-blue-400"></span>
            </p>
          </div>
        </div>

        {/* Enhanced Mobile-Optimized Pill Containers */}
        <div className={`flex justify-center items-center mb-12 ${isMobile ? 'flex-col gap-8' : 'gap-24 mb-16'}`}>
          
          {/* Blue Pill Container */}
          <div className="relative group">
            <div 
              className={`relative cursor-pointer transform transition-all duration-700 ${
                hoveredPill === 'blue' ? 'scale-105' : 'scale-100'
              } ${selectedPill === 'blue' ? 'scale-110' : ''}`}
              onMouseEnter={() => setHoveredPill('blue')}
              onMouseLeave={() => setHoveredPill(null)}
              onClick={() => handlePillSelect('blue')}
            >
              <div className={`relative border-2 border-blue-400 bg-gradient-to-b from-blue-950 to-black p-4 transition-all duration-500 ${
                isMobile ? 'w-32 h-40' : 'w-40 h-48'
              } ${hoveredPill === 'blue' ? 'border-blue-300' : ''}`} 
              style={{ 
                boxShadow: hoveredPill === 'blue' ? '0 0 40px rgba(59, 130, 246, 0.6)' : '0 0 10px rgba(59, 130, 246, 0.2)' 
              }}>
                
                <div className="text-blue-400 text-xs font-mono mb-2 opacity-70">
                  PILL_ID: 001
                </div>
                
                <div className="relative bg-black border border-blue-600 h-16 md:h-24 mb-4 flex items-center justify-center">
                  <div className={`w-10 h-5 md:w-12 md:h-6 bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600 rounded-full transition-all duration-300 ${
                    hoveredPill === 'blue' ? 'animate-pulse' : ''
                  } ${selectedPill === 'blue' ? 'animate-bounce' : ''}`}
                  style={{ 
                    boxShadow: hoveredPill === 'blue' ? '0 0 20px rgba(59, 130, 246, 0.8)' : '0 0 5px rgba(59, 130, 246, 0.4)' 
                  }}>
                    <div className="w-3 h-1.5 md:w-4 md:h-2 bg-blue-100 rounded-full ml-2 mt-1 opacity-80"></div>
                  </div>
                </div>
                
                <div className="text-blue-400 text-xs font-mono space-y-1">
                  <div>STATUS: <span className="text-blue-300">READY</span></div>
                  <div>EFFECT: <span className="text-blue-300">PEACE</span></div>
                </div>
              </div>
              
              <div className="mt-4 border border-blue-400 border-opacity-30 p-3 bg-black bg-opacity-80">
                <h3 className={`text-blue-400 font-bold font-mono mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>BLUE_PILL</h3>
                <p className="text-blue-300 text-sm font-mono">
                  {'>'} STAY_ASLEEP
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced VS Divider */}
          <div className={`text-green-400 font-bold font-mono animate-pulse relative ${isMobile ? 'text-3xl my-4' : 'text-5xl'}`}>
            <div className="relative" style={{ textShadow: '0 0 20px rgba(0, 255, 0, 0.8)' }}>
              VS
              <div className="absolute -top-2 -left-2 w-8 h-8 md:w-12 md:h-12 border border-green-400 animate-spin"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 border border-green-400 animate-ping"></div>
            </div>
          </div>

          {/* Red Pill Container */}
          <div className="relative group">
            <div 
              className={`relative cursor-pointer transform transition-all duration-700 ${
                hoveredPill === 'red' ? 'scale-105' : 'scale-100'
              } ${selectedPill === 'red' ? 'scale-110' : ''}`}
              onMouseEnter={() => setHoveredPill('red')}
              onMouseLeave={() => setHoveredPill(null)}
              onClick={() => handlePillSelect('red')}
            >
              <div className={`relative border-2 border-red-400 bg-gradient-to-b from-red-950 to-black p-4 transition-all duration-500 ${
                isMobile ? 'w-32 h-40' : 'w-40 h-48'
              } ${hoveredPill === 'red' ? 'border-red-300' : ''}`}
              style={{ 
                boxShadow: hoveredPill === 'red' ? '0 0 40px rgba(239, 68, 68, 0.6)' : '0 0 10px rgba(239, 68, 68, 0.2)' 
              }}>
                
                <div className="text-red-400 text-xs font-mono mb-2 opacity-70">
                  PILL_ID: 002
                </div>
                
                <div className="relative bg-black border border-red-600 h-16 md:h-24 mb-4 flex items-center justify-center">
                  <div className={`w-10 h-5 md:w-12 md:h-6 bg-gradient-to-r from-red-600 via-red-300 to-red-600 rounded-full transition-all duration-300 ${
                    hoveredPill === 'red' ? 'animate-pulse' : ''
                  } ${selectedPill === 'red' ? 'animate-bounce' : ''}`}
                  style={{ 
                    boxShadow: hoveredPill === 'red' ? '0 0 20px rgba(239, 68, 68, 0.8)' : '0 0 5px rgba(239, 68, 68, 0.4)' 
                  }}>
                    <div className="w-3 h-1.5 md:w-4 md:h-2 bg-red-100 rounded-full ml-2 mt-1 opacity-80"></div>
                  </div>
                </div>
                
                <div className="text-red-400 text-xs font-mono space-y-1">
                  <div>STATUS: <span className="text-red-300">READY</span></div>
                  <div>EFFECT: <span className="text-red-300">TRUTH</span></div>
                </div>
              </div>
              
              <div className="mt-4 border border-red-400 border-opacity-30 p-3 bg-black bg-opacity-80">
                <h3 className={`text-red-400 font-bold font-mono mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>RED_PILL</h3>
                <p className="text-red-300 text-sm font-mono">
                  {'>'} WAKE_UP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Command Line */}
        <div className="text-green-400 text-sm font-mono opacity-70">
          <div className="animate-pulse">
            <span className="text-red-400">root@matrix:</span>
            <span className="text-blue-400">~</span>
            <span className="text-green-400">$ </span>
            AWAITING_USER_INPUT... 
            <span className="animate-ping">_</span>
          </div>
        </div>
      </div>

      {/* Enhanced Selection Overlay */}
      {selectedPill && !showFinalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-98 flex items-center justify-center z-50 px-4">
          <div className="text-center border border-green-400 p-8 md:p-12 bg-black bg-opacity-90 max-w-md w-full" 
               style={{ boxShadow: '0 0 50px rgba(0, 255, 0, 0.3)' }}>
            <div className="text-green-400 text-sm font-mono mb-4 opacity-70 animate-pulse">
              <span className="inline-block animate-spin mr-2">⚡</span> CHOICE_CONFIRMED.EXE
            </div>
            <div className={`font-bold mb-6 font-mono animate-pulse ${
              selectedPill === 'blue' ? 'text-blue-400' : 'text-red-400'
            } ${isMobile ? 'text-5xl' : 'text-7xl'}`}
            style={{ textShadow: `0 0 30px ${selectedPill === 'blue' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(239, 68, 68, 0.8)'}` }}>
              [{selectedPill.toUpperCase()}_PILL]
            </div>
            <div className="text-green-400 text-lg md:text-xl font-mono mb-4">
              {selectedPill === 'blue' ? 'SIMULATION_CONTINUES...' : 'AWAKENING_PROTOCOL_INITIATED...'}
            </div>
            <div className="text-green-400 text-sm font-mono opacity-70 mb-6">
              {selectedPill === 'blue' ? 'Until we meet again...' : 'WELCOME TO ARCDATUM...'}
            </div>
            
            {/* Enhanced Animated Loading Bar */}
            <div className="w-full max-w-xs h-3 border border-green-400 mx-auto relative overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${selectedPill === 'blue' ? 'bg-blue-400' : 'bg-red-400'}`}
                style={{ 
                  width: `${loadingProgress}%`,
                  boxShadow: `0 0 20px ${selectedPill === 'blue' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(239, 68, 68, 0.8)'}`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
            </div>
            <div className="text-green-400 text-xs font-mono mt-2 opacity-70">
              {Math.round(loadingProgress)}% COMPLETE
            </div>
          </div>
        </div>
      )}

      {/* Final Message Overlay */}
      {showFinalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-98 flex items-center justify-center z-50 px-4">
          <div className="text-center border border-green-400 p-8 md:p-12 bg-black bg-opacity-90 max-w-lg w-full" 
               style={{ boxShadow: '0 0 50px rgba(0, 255, 0, 0.3)' }}>
            <div className="text-green-400 text-sm font-mono mb-4 opacity-70 animate-pulse">
              <span className="inline-block animate-spin mr-2">⚡</span> {selectedPill === 'blue' ? 'SIMULATION_ACTIVE' : 'TRANSFER_PROTOCOL'}
            </div>
            
            <div className={`font-bold mb-6 font-mono animate-pulse ${
              selectedPill === 'blue' ? 'text-blue-400' : 'text-red-400'
            } ${isMobile ? 'text-4xl' : 'text-6xl'}`}
            style={{ textShadow: `0 0 30px ${selectedPill === 'blue' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(239, 68, 68, 0.8)'}` }}>
              {selectedPill === 'blue' ? '[BLUE_PILL_ACTIVE]' : '[RED_PILL_ACTIVE]'}
            </div>
            
            {selectedPill === 'blue' ? (
              <div className="space-y-4">
                <div className="text-blue-300 text-lg md:text-xl font-mono mb-4">
                  SIMULATION MAINTAINED
                </div>
                <div className="text-blue-200 text-sm md:text-base font-mono leading-relaxed">
                  You chose the comfortable lie. Return to your life,<br/>
                  forget this moment ever happened.<br/>
                  The Matrix has you...
                </div>
                <button 
                  onClick={resetChoice}
                  className="mt-6 px-6 py-3 border border-blue-400 text-blue-400 font-mono text-sm hover:bg-blue-400 hover:text-black transition-all duration-300"
                  style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                >
                  [ESC] RETURN_TO_CHOICE
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-red-300 text-lg md:text-xl font-mono mb-4">
                  INITIATING TRANSFER...
                </div>
                <div className="text-red-200 text-sm md:text-base font-mono leading-relaxed">
                  Welcome to the ARCDATUM.<br/>
                  Your journey begins now...<br/>
                  <span className="text-green-400 animate-pulse">Redirecting to onboarding...</span>
                </div>
                <div className="text-green-400 text-xs font-mono opacity-70 animate-pulse">
                  Transfer in progress.... Please wait.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Optimized Digital Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isMobile ? 8 : 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 border border-green-400 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Enhanced Corner UI Elements */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 text-green-400 text-xs font-mono opacity-50">
        <div>MATRIX_OS v3.1.4</div>
        <div className="text-xs opacity-30">BUILD: {new Date().getFullYear()}</div>
      </div>
      <div className="absolute top-2 right-2 md:top-4 md:right-4 text-green-400 text-xs font-mono opacity-50">
        <div>CONNECTION: <span className="text-green-300 animate-pulse">SECURE</span></div>
        <div className="text-xs opacity-30">PING: 001ms</div>
      </div>
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-green-400 text-xs font-mono opacity-50">
        <div>USER: NEO_CANDIDATE</div>
        <div className="text-xs opacity-30">STATUS: CHOOSING</div>
      </div>
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-green-400 text-xs font-mono opacity-50 animate-pulse">
        <div>MORPHEUS_ONLINE</div>
        <div className="text-xs opacity-30">SIGNAL: STRONG</div>
      </div>
    </div>
  );
}
