"use client";
import React from 'react';

const Partners = () => {
  const partners = [
    { name: "Shopify", logo: "🛍️" },
    { name: "Meta", logo: "📘" },
    { name: "Google", logo: "🔍" },
    { name: "TikTok", logo: "🎵" },
    { name: "PayPal", logo: "💳" },
    { name: "Stripe", logo: "💰" }
  ];

  return (
    <section id="partners" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted By Industry <span className="text-yellow-400">Leaders</span>
          </h2>
          <p className="text-gray-300">We work with the biggest platforms in e-commerce</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {partner.logo}
              </div>
              <div className="text-gray-400 group-hover:text-white transition-colors">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;