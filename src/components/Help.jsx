"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HowIAmGoingToHelpYou = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.arcdatum.com/api/frontend/text/settings');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to slides format
        const transformedSlides = data.help_sections?.map((section, index) => ({
          id: index + 1,
          image: {
            url: section.image_url || `https://via.placeholder.com/500x600/333/FFF?text=Image+${index + 1}`,
            alt: section.title || `Help section ${index + 1}`
          },
          title: section.title || 'Untitled Section',
          paragraphs: section.paragraphs || ['No content available']
        })) || [];

        setSlides(transformedSlides);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        // Fallback to empty slides array
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-advance slideshow (only if slides exist)
  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="help" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg">Loading content...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="help" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-white text-xl mb-2">Failed to load content</h3>
              <p className="text-gray-400">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (slides.length === 0) {
    return (
      <section id="help" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h3 className="text-white text-xl mb-2">No help sections available</h3>
              <p className="text-gray-400">Please add some help sections in your admin panel.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section id="help" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image Slideshow */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              
              {/* Navigation Controls */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
                  disabled={slides.length <= 1}
                >
                  <ChevronLeft className="w-5 h-5 text-white group-hover:text-blue-400" />
                </button>
                
                <span className="text-gray-400 text-sm">
                  {currentSlide + 1} / {slides.length}
                </span>
                
                <button 
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
                  disabled={slides.length <= 1}
                >
                  <ChevronRight className="w-5 h-5 text-white group-hover:text-blue-400" />
                </button>
              </div>

              {/* Main Image */}
              <div className="aspect-[5/6] rounded-xl overflow-hidden">
                <img 
                  src={currentSlideData.image.url}
                  alt={currentSlideData.image.alt}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x600/333/FFF?text=Image+Not+Found';
                  }}
                />
              </div>

              {/* Slide Indicators */}
              {slides.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 w-8' 
                          : 'bg-gray-600 hover:bg-gray-500 w-2'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="text-white">THIS IS HOW YOU WILL BENEFIT </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                FROM CONNECTING WITH ME
              </span>
            </h2>
            
            {/* Sliding Text Content */}
            <div className="relative min-h-[400px]">
              <div className="absolute inset-0 transition-opacity duration-500">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {currentSlideData.title}
                </h3>
                
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  {currentSlideData.paragraphs.map((paragraph, index) => (
                    <p key={index} className="opacity-0 animate-fade-in" style={{
                      animationDelay: `${index * 0.2}s`,
                      animationFillMode: 'forwards'
                    }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {slides.length > 1 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white text-sm font-semibold">
                    {Math.round(((currentSlide + 1) / slides.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HowIAmGoingToHelpYou;