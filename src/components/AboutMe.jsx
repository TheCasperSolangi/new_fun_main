"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AboutMe = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [aboutData, setAboutData] = useState({
    about_me_paragraph_one: '',
    about_me_paragraph_two: '',
    about_me_pictures: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.arcdatum.com/api/frontend/text/settings');
        const data = await response.json();
        setAboutData({
          about_me_paragraph_one: data.about_me_paragraph_one,
          about_me_paragraph_two: data.about_me_paragraph_two,
          about_me_pictures: data.about_me_pictures.map((pic, index) => ({
            id: index + 1,
            url: pic.picture_url,
            alt: `Personal media ${index + 1}`,
            isVideo: isVideoUrl(pic.picture_url)
          }))
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching about me data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to check if URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Auto-advance slideshow
  useEffect(() => {
    if (aboutData.about_me_pictures.length > 0) {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % aboutData.about_me_pictures.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [aboutData.about_me_pictures.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % aboutData.about_me_pictures.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + aboutData.about_me_pictures.length) % aboutData.about_me_pictures.length);
  };

  // Glitch text effect
  const GlitchText = ({ children, className = "" }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 8000 + Math.random() * 5000);

      return () => clearInterval(glitchInterval);
    }, []);

    return (
      <span 
        className={`${className} ${isGlitching ? 'animate-glitch' : ''} relative`}
        style={{
          textShadow: isGlitching ? 
            '2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff' : 
            'none'
        }}
      >
        {children}
      </span>
    );
  };

  // Matrix scramble text effect component
  const MatrixScrambleText = ({ children, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isScrambling, setIsScrambling] = useState(true);
    const targetText = children;
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    useEffect(() => {
      const timer = setTimeout(() => {
        let iteration = 0;
        const scrambleInterval = setInterval(() => {
          setDisplayText(() => 
            targetText
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iteration) {
                  return targetText[index];
                }
                return matrixChars[Math.floor(Math.random() * matrixChars.length)];
              })
              .join('')
          );

          if (iteration >= targetText.length) {
            clearInterval(scrambleInterval);
            setIsScrambling(false);
          }

          iteration += 1/3;
        }, 50);

        return () => clearInterval(scrambleInterval);
      }, delay);

      return () => clearTimeout(timer);
    }, [targetText, delay]);

    return (
      <span className={`${isScrambling ? 'text-green-400' : 'text-white'} transition-colors duration-1000`}>
        {displayText || targetText}
      </span>
    );
  };

  // Lightning effect component
  const LightningEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="lightning-bolt absolute top-10 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 animate-lightning-1"></div>
      <div className="lightning-bolt absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 animate-lightning-2"></div>
      <div className="lightning-bolt absolute bottom-1/4 left-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-0 animate-lightning-3"></div>
    </div>
  );

  // Matrix rain effect
  const MatrixRain = () => {
    useEffect(() => {
      const canvas = document.getElementById('matrix-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops = [];

      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 33);
      return () => clearInterval(interval);
    }, []);

    return (
      <canvas 
        id="matrix-canvas" 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ zIndex: 1 }}
      />
    );
  };

  // Media slideshow component
  const MediaSlideshow = ({ className = "" }) => (
    aboutData.about_me_pictures.length > 0 && (
      <div className={`relative ${className}`}>
        {/* Main Media Container */}
        <div className="aspect-[5/6] rounded-2xl overflow-hidden shadow-2xl border border-green-500/30 relative">
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 animate-pulse z-10"></div>
          
          {aboutData.about_me_pictures[currentImage].isVideo ? (
            <video 
              src={aboutData.about_me_pictures[currentImage].url}
              className="w-full h-full object-cover filter brightness-110 contrast-125"
              controls
              autoPlay
              muted
              loop
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <img 
              src={aboutData.about_me_pictures[currentImage].url}
              alt={aboutData.about_me_pictures[currentImage].alt}
              className="w-full h-full object-cover transition-opacity duration-500 filter brightness-110 contrast-125"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x600/000/0f0?text=MATRIX+ERROR';
              }}
            />
          )}
          
          {/* Error fallback */}
          <div className="hidden w-full h-full bg-black items-center justify-center border border-green-500">
            <p className="text-green-400 text-center font-mono">MEDIA COULD NOT BE LOADED</p>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {aboutData.about_me_pictures.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? 'bg-gradient-to-r from-green-400 to-cyan-500 w-8 shadow-lg shadow-green-400/50' 
                  : 'bg-gray-700 hover:bg-green-700/50 w-2 border border-green-500/30'
              }`}
            />
          ))}
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <section id="about" className="py-20 relative overflow-hidden bg-black">
        <MatrixRain />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-green-900/30 rounded w-1/3 border border-green-500/30"></div>
              <div className="h-4 bg-green-900/30 rounded border border-green-500/20"></div>
              <div className="h-4 bg-green-900/30 rounded w-5/6 border border-green-500/20"></div>
              <div className="h-4 bg-green-900/30 rounded w-2/3 border border-green-500/20"></div>
              <div className="h-4 bg-green-900/30 rounded w-4/5 border border-green-500/20"></div>
            </div>
            <div className="animate-pulse aspect-[5/6] rounded-xl bg-green-900/30 border border-green-500/30"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-black min-h-screen">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Lightning Effects */}
      <LightningEffect />

      {/* Background Effects */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - About Me Text */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight font-mono">
              <MatrixScrambleText delay={0}>ABOUT </MatrixScrambleText>
              <MatrixScrambleText delay={1000}>ME</MatrixScrambleText>
            </h2>
            
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-all duration-500">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full bg-gradient-to-b from-green-400 to-cyan-500 rounded-full mt-1"></div>
                    <p className="text-lg font-light leading-relaxed tracking-wide" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}>
                      <GlitchText>
                        {aboutData.about_me_paragraph_one || "I'm a passionate entrepreneur and mentor who has built multiple successful businesses from the ground up. Over the past 8 years, I've helped thousands of people transform their lives through proven business strategies, fitness coaching, and credit repair services. My journey started from humble beginnings, working a regular 9-5 job, but I always knew I was meant for something bigger."}
                      </GlitchText>
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-500">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-1"></div>
                    <p className="text-lg font-light leading-relaxed tracking-wide" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}>
                      <GlitchText>
                        {aboutData.about_me_paragraph_two || "Today, I run ARCDATUM, a comprehensive mentorship program that has generated over $10 million in revenue for my students. My mission is simple: to provide people with the tools, knowledge, and support they need to achieve financial freedom and live their dream life. Whether you're looking to start your first business, get in the best shape of your life, or repair your credit score, I'm here to guide you every step of the way."}
                      </GlitchText>
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Media Slideshow */}
          <MediaSlideshow />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-center font-mono">
            <MatrixScrambleText delay={0}>ABOUT </MatrixScrambleText>
            <MatrixScrambleText delay={1000}>ME</MatrixScrambleText>
          </h2>

          {/* First Paragraph */}
          <div className="mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full bg-gradient-to-b from-green-400 to-cyan-500 rounded-full mt-1"></div>
                  <p className="text-gray-300 text-lg font-light leading-relaxed tracking-wide" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}>
                    <GlitchText>
                      {aboutData.about_me_paragraph_one || "I'm a passionate entrepreneur and mentor who has built multiple successful businesses from the ground up. Over the past 8 years, I've helped thousands of people transform their lives through proven business strategies, fitness coaching, and credit repair services. My journey started from humble beginnings, working a regular 9-5 job, but I always knew I was meant for something bigger."}
                    </GlitchText>
                  </p>
                </div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Media Slideshow */}
          <MediaSlideshow className="mb-8" />

          {/* Second Paragraph */}
          <div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-1"></div>
                  <p className="text-gray-300 text-lg font-light leading-relaxed tracking-wide" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}>
                    <GlitchText>
                      {aboutData.about_me_paragraph_two || "Today, I run ARCDATUM, a comprehensive mentorship program that has generated over $10 million in revenue for my students. My mission is simple: to provide people with the tools, knowledge, and support they need to achieve financial freedom and live their dream life. Whether you're looking to start your first business, get in the best shape of your life, or repair your credit score, I'm here to guide you every step of the way."}
                    </GlitchText>
                  </p>
                </div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes lightning-1 {
          0%, 90%, 100% { opacity: 0; }
          5% { opacity: 1; transform: scaleY(1); }
          10% { opacity: 0.8; transform: scaleY(0.8); }
          15% { opacity: 0; transform: scaleY(1); }
        }
        
        @keyframes lightning-2 {
          0%, 85%, 100% { opacity: 0; }
          10% { opacity: 0.9; transform: scaleY(1.2); }
          15% { opacity: 0.6; transform: scaleY(0.9); }
          20% { opacity: 0; transform: scaleY(1); }
        }
        
        @keyframes lightning-3 {
          0%, 80%, 100% { opacity: 0; }
          15% { opacity: 0.7; transform: scaleY(1.1); }
          20% { opacity: 0.9; transform: scaleY(0.7); }
          25% { opacity: 0; transform: scaleY(1); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        .animate-lightning-1 {
          animation: lightning-1 8s infinite;
        }
        
        .animate-lightning-2 {
          animation: lightning-2 12s infinite 2s;
        }
        
        .animate-lightning-3 {
          animation: lightning-3 10s infinite 4s;
        }
        
        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }
        
        .font-mono {
          font-family: 'Courier New', Courier, monospace;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00ff00, #00ffff);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00ff88, #00ffff);
        }
      `}</style>
    </section>
  );
};

export default AboutMe;
