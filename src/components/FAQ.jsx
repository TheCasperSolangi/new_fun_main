"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
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
        
        // Transform API data to FAQ format
        const transformedFaqs = data.faq_section?.map((faq, index) => ({
          q: faq.question || 'No question available',
          a: faq.answer || 'No answer available'
        })) || [];

        setFaqs(transformedFaqs);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQ data:', err);
        setError(err.message);
        // Fallback to empty faqs array
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section id="faq" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading FAQs...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="faq" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="text-red-400 text-6xl mb-4">⚠️</div>
                <h3 className="text-white text-xl mb-2">Failed to load FAQs</h3>
                <p className="text-gray-400 mb-4">Error: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors font-semibold"
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
  if (faqs.length === 0) {
    return (
      <section id="faq" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">❓</div>
                <h3 className="text-white text-xl mb-2">No FAQs available</h3>
                <p className="text-gray-400">Please add some frequently asked questions in your admin panel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>
          <p className="text-xl text-gray-300">Everything you need to know</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full bg-black/50 border border-gray-800 rounded-2xl p-6 text-left flex items-center justify-between hover:border-yellow-400/50 transition-all group"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-yellow-400 transition-transform flex-shrink-0 ${
                  openFaq === index ? 'rotate-180' : ''
                }`} />
              </button>
              {openFaq === index && (
                <div className="bg-gray-800/50 border-l-4 border-yellow-400 p-6 mt-2 rounded-r-2xl animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FAQ;