"use client";
import React, { useState, useEffect } from 'react';
import { Quote, Star, TrendingUp, MapPin, Calendar, ChevronLeft, ChevronRight, Trophy, Zap, Loader2 } from 'lucide-react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api.arcdatum.com/api/testimonials');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to match component structure
        const transformedData = data.map((item) => ({
          id: item._id,
          name: item.student,
          age: item.age,
          revenue: item.revenue,
          timeframe: item.timeframe,
          image: item.thumbnail || `https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face`, // fallback image
          text: item.testimonial,
          location: item.location,
          beforeJob: item.beforeJob,
          afterStatus: item.afterStatus,
          joinDate: item.joinDate,
          rating: item.rating,
          highlight: item.growth,
          videoUrl: item.video_url,
          duration: item.duration
        }));
        
        setTestimonials(transformedData);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  // Loading state
  if (loading) {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Failed to Load Testimonials</h3>
              <p className="text-gray-300 mb-4">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-2 rounded-full transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">No Testimonials Available</h3>
              <p className="text-gray-500">Check back later for student success stories!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400/20 to-blue-400/20 border border-purple-400/30 px-6 py-2 rounded-full text-purple-400 mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold">5-STAR REVIEWS • VERIFIED STUDENTS</span>
            <Star className="w-4 h-4" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            What Our <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Students</span> Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real transformations from real people who took action and changed their lives
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Student Cards Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">
              Featured Success Stories
            </h3>
            
            {testimonials.slice(0, Math.min(3, testimonials.length)).map((testimonial, index) => (
              <div 
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  index === activeTestimonial 
                    ? 'border-purple-400/50 shadow-lg shadow-purple-400/20' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/30"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face';
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{testimonial.name || 'Anonymous'}</div>
                    <div className="text-gray-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location || 'Unknown'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">{testimonial.revenue || 'N/A'}</div>
                    <div className="text-gray-400 text-xs">in {testimonial.timeframe || 'N/A'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column - Main Testimonial */}
          <div className="lg:order-2">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl relative">
              
              {/* Navigation Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(Math.max(1, Math.min(5, currentTestimonial.rating || 5)))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
                  >
                    <ChevronLeft className="w-4 h-4 text-white group-hover:text-purple-400" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-white group-hover:text-purple-400" />
                  </button>
                </div>
              </div>

              {/* Student Profile */}
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <img 
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-purple-400/30 shadow-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentTestimonial.name || 'Anonymous'}
                </h3>
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{currentTestimonial.location || 'Unknown'}</span>
                  {currentTestimonial.age && (
                    <>
                      <span>•</span>
                      <span>Age {currentTestimonial.age}</span>
                    </>
                  )}
                </div>

                {/* Highlight Badge */}
                {currentTestimonial.highlight && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 px-4 py-2 rounded-full text-purple-400 text-sm font-semibold mb-6">
                    <Zap className="w-4 h-4" />
                    {currentTestimonial.highlight}
                  </div>
                )}
              </div>

              {/* Quote */}
              <div className="relative mb-8">
                <Quote className="w-8 h-8 text-purple-400/50 mb-4" />
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "{currentTestimonial.text || 'Amazing transformation story!'}"
                </p>
              </div>

              {/* Video Player (if available) */}
              {currentTestimonial.videoUrl && (
                <div className="mb-6">
                  <video 
                    controls 
                    className="w-full rounded-xl bg-gray-800"
                    poster={currentTestimonial.image}
                  >
                    <source src={currentTestimonial.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {currentTestimonial.duration && (
                    <p className="text-gray-400 text-sm mt-2 text-center">
                      Duration: {currentTestimonial.duration}
                    </p>
                  )}
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">{currentTestimonial.revenue || 'N/A'}</div>
                  <div className="text-gray-400 text-sm">Total Revenue</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{currentTestimonial.timeframe || 'N/A'}</div>
                  <div className="text-gray-400 text-sm">Time Frame</div>
                </div>
              </div>

              {/* Before/After */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-red-400 text-sm font-semibold mb-1">BEFORE</div>
                    <div className="text-white text-sm">{currentTestimonial.beforeJob || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-green-400 text-sm font-semibold mb-1">AFTER</div>
                    <div className="text-white text-sm">{currentTestimonial.afterStatus || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Join Date */}
              {currentTestimonial.joinDate && (
                <div className="text-center mt-4">
                  <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Joined: {currentTestimonial.joinDate}</span>
                  </div>
                </div>
              )}

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-purple-400 w-8' 
                        : 'bg-gray-600 hover:bg-gray-500 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Testimonials */}
          {testimonials.length > 3 && (
            <div className="space-y-4 lg:order-3">
              <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">
                More Transformations
              </h3>
              
              {testimonials.slice(3).map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(index + 3)}
                  className={`bg-gradient-to-br from-gray-900/60 to-gray-800/40 border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    index + 3 === activeTestimonial 
                      ? 'border-purple-400/50 shadow-lg shadow-purple-400/20' 
                      : 'border-gray-700/50 hover:border-gray-600/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/30"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face';
                      }}
                    />
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{testimonial.name || 'Anonymous'}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location || 'Unknown'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">{testimonial.revenue || 'N/A'}</div>
                      <div className="text-gray-400 text-xs">in {testimonial.timeframe || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-gray-300 mb-6">
              Don't let another year pass by wondering "what if" - take action today
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105">
              <TrendingUp className="w-5 h-5" />
              START YOUR TRANSFORMATION
              <Star className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;