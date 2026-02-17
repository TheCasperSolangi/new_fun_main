"use client";
import AboutMe from '@/components/AboutMe';
import ConnectWithUs from '@/components/Connect';
import FAQ from '@/components/FAQ';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HowIAmGoingToHelpYou from '@/components/Help';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import SuccessStories from '@/components/SuccessStories';
import Testimonials from '@/components/Testimonial';
import WhyChooseUs from '@/components/WhyChooseUs';
import React, { useState, useEffect } from 'react';


const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <AboutMe />
      <ConnectWithUs />
      <HowIAmGoingToHelpYou />
      <SuccessStories />

      <Testimonials />
      <FAQ />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default LandingPage;