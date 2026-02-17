"use client";
import React, { useState, useEffect } from 'react';
import { Play, Star, Trophy, TrendingUp, Calendar, MapPin, ChevronLeft, ChevronRight, Quote, Loader2 } from 'lucide-react';

const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch success stories from API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.arcdatum.com/api/success');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to match component structure
        const transformedData = data.map((story, index) => ({
          id: story.id || story._id,
          student: story.student,
          age: story.age,
          location: story.location,
          timeframe: story.timeframe,
          revenue: story.revenue,
          growth: story.growth,
          videoUrl: story.video_url, // Using video_url from API
          thumbnail: story.thumbnail,
          duration: story.duration,
          testimonial: story.testimonial,
          beforeJob: story.beforeJob,
          afterStatus: story.afterStatus,
          rating: Math.min(story.rating, 5), // Ensure rating doesn't exceed 5
          joinDate: story.joinDate
        }));
        
        setSuccessStories(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching success stories:', err);
        setError('Failed to load success stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Auto-advance main slideshow
  useEffect(() => {
    if (successStories.length === 0) return;
    
    const timer = setInterval(() => {
      if (!Object.values(isPlaying).some(Boolean)) {
        setCurrentStory((prev) => (prev + 1) % successStories.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying, successStories.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const handleVideoPlay = (index) => {
    setIsPlaying(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Loading state
  if (loading) {
    return (
      <section id="success-stories" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Loading success stories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="success-stories" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 max-w-md mx-auto">
                <h3 className="text-red-400 text-xl font-bold mb-2">Error Loading Stories</h3>
                <p className="text-gray-300">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (successStories.length === 0) {
    return (
      <section id="success-stories" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">Success</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-green-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-gray-300 text-lg">No success stories available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentData = successStories[currentStory];

  return (
    <section id="success-stories" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400/20 to-yellow-400/20 border border-green-400/30 px-6 py-2 rounded-full text-green-400 mb-6">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-semibold">REAL STUDENTS • REAL RESULTS</span>
            <Trophy className="w-4 h-4" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">Success</span>{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-green-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Watch real students share their transformation stories and learn how they meet their goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          {/* Left Column - Featured Video */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              
              {/* Student Info Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                    {currentData.student.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentData.student}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{currentData.location}</span>
                      <span>•</span>
                      <span>Age {currentData.age}</span>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex gap-2">
                  <button 
                    onClick={prevStory}
                    className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
                  >
                    <ChevronLeft className="w-4 h-4 text-white group-hover:text-yellow-400" />
                  </button>
                  <button 
                    onClick={nextStory}
                    className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-white group-hover:text-yellow-400" />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative mb-6 group">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black relative">
                  {isPlaying[currentStory] ? (
                    <video
                      src={currentData.videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      onError={(e) => {
                        console.error('Video loading error:', e);
                        setIsPlaying(prev => ({
                          ...prev,
                          [currentStory]: false
                        }));
                      }}
                    />
                  ) : (
                    <>
                      <img 
                        src={currentData.thumbnail}
                        alt={`${currentData.student} success story`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZpbGw9IiM5Q0EzQUYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmlkZW8gVGh1bWJuYWlsPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                        <button 
                          onClick={() => handleVideoPlay(currentStory)}
                          className="bg-red-600 hover:bg-red-700 rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all duration-300"
                        >
                          <Play className="w-8 h-8 text-white ml-1 fill-white" />
                        </button>
                      </div>

                      <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-white text-sm">
                        {currentData.duration}
                      </div>

                      <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full text-white text-xs font-bold">
                        SUCCESS STORY
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-6 mb-6 relative">
                <Quote className="absolute top-4 left-4 w-6 h-6 text-yellow-400/50" />
                <p className="text-gray-300 italic text-lg leading-relaxed pl-8">
                  "{currentData.testimonial}"
                </p>
                <div className="flex items-center gap-1 mt-4 pl-8">
                  {[...Array(Math.min(currentData.rating, 5))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Journey Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{currentData.revenue}</div>
                  <div className="text-gray-400 text-sm">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{currentData.timeframe}</div>
                  <div className="text-gray-400 text-sm">Time Frame</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{currentData.beforeJob}</div>
                  <div className="text-gray-400 text-sm">Before</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{currentData.afterStatus}</div>
                  <div className="text-gray-400 text-sm">After</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - All Success Stories Grid */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
              More Success Stories
            </h3>
            
            {successStories.map((story, index) => (
              <div 
                key={story.id}
                onClick={() => setCurrentStory(index)}
                className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  index === currentStory 
                    ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {story.student.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{story.student}</div>
                    <div className="text-gray-400 text-xs">{story.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">{story.revenue}</div>
                    <div className="text-gray-400 text-xs">in {story.timeframe}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="bg-gradient-to-r from-green-500/20 to-yellow-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    {story.growth}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Play className="w-3 h-3" />
                    <span className="text-xs">{story.duration}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 pt-4">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStory 
                      ? 'bg-yellow-400 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Write Your Own Success Story?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of students who've transformed their lives with our proven system
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105">
              <TrendingUp className="w-5 h-5" />
              START YOUR JOURNEY TODAY
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
