"use client";
import React from 'react';
import { Target, Users, Zap, BarChart3, Shield, Globe } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Target,
      title: "Proven Blueprint",
      desc: "Step-by-step system that's generated over $10M in student revenue"
    },
    {
      icon: Users,
      title: "1-on-1 Mentorship", 
      desc: "Direct access to successful mentors who've scaled to 7-figures"
    },
    {
      icon: Zap,
      title: "Fast Results",
      desc: "Most students see their first sales within 30-60 days"
    },
    {
      icon: BarChart3,
      title: "Scaling Strategies",
      desc: "Advanced techniques to scale from $1K to $100K+ per month"
    },
    {
      icon: Shield,
      title: "Risk-Free",
      desc: "90-day money-back guarantee - we're confident in our system"
    },
    {
      icon: Globe,
      title: "Global Community",
      desc: "Join 10,000+ entrepreneurs from 50+ countries worldwide"
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-yellow-400">Arcdatum?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We don't just teach theory - we provide a complete system with proven results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div key={index} className="bg-black/50 border border-gray-800 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;