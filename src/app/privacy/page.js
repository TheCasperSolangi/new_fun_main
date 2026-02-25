"use client";
import React, { useState } from 'react';
import { Shield, Eye, Lock, Server, UserCheck, AlertCircle, CheckCircle, Mail, Phone, Globe, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <UserCheck className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-yellow-400 font-bold mb-2">Personal Information</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Name, email address, and phone number</li>
              <li>• Payment information and billing details</li>
              <li>• Profile information and preferences</li>
              <li>• Communication records and support interactions</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-yellow-400 font-bold mb-2">Usage Information</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Website navigation patterns and behavior</li>
              <li>• Course progress and completion data</li>
              <li>• Device information and browser details</li>
              <li>• IP address and location data</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Service Delivery
              </h4>
              <p className="text-gray-300 text-sm">Provide access to courses, mentorship, and support services</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Communication
              </h4>
              <p className="text-gray-300 text-sm">Send important updates, course materials, and support responses</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Personalization
              </h4>
              <p className="text-gray-300 text-sm">Customize your learning experience and recommendations</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Analytics
              </h4>
              <p className="text-gray-300 text-sm">Improve our services and understand user preferences</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      icon: <Lock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-400/30">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-500" />
              <h4 className="text-white font-bold text-lg">Enterprise-Grade Security</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-yellow-400 font-semibold mb-2">Technical Safeguards</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• 256-bit SSL encryption</li>
                  <li>• Regular security audits</li>
                  <li>• Secure data centers</li>
                  <li>• Access controls & monitoring</li>
                </ul>
              </div>
              <div>
                <h5 className="text-yellow-400 font-semibold mb-2">Data Handling</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Minimal data collection</li>
                  <li>• Regular data purging</li>
                  <li>• Secure backup systems</li>
                  <li>• Staff training & protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing',
      icon: <Server className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              We DO NOT sell your personal information
            </h4>
            <p className="text-gray-300 text-sm mb-4">Your privacy is paramount. We only share information in these limited circumstances:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="text-yellow-400 font-semibold">Service Providers</h5>
                  <p className="text-gray-400 text-sm">Trusted partners who help deliver our services (payment processors, email providers)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="text-yellow-400 font-semibold">Legal Requirements</h5>
                  <p className="text-gray-400 text-sm">When required by law or to protect our rights and safety</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="text-yellow-400 font-semibold">With Your Consent</h5>
                  <p className="text-gray-400 text-sm">Only when you explicitly authorize us to share specific information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <UserCheck className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-400/30">
              <h4 className="text-green-400 font-bold mb-2">Access & Portability</h4>
              <p className="text-gray-300 text-sm">Request a copy of your personal data in a portable format</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-400/30">
              <h4 className="text-green-400 font-bold mb-2">Correction</h4>
              <p className="text-gray-300 text-sm">Update or correct any inaccurate personal information</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-400/30">
              <h4 className="text-green-400 font-bold mb-2">Deletion</h4>
              <p className="text-gray-300 text-sm">Request deletion of your personal data (subject to legal requirements)</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-400/30">
              <h4 className="text-green-400 font-bold mb-2">Marketing Opt-Out</h4>
              <p className="text-gray-300 text-sm">Unsubscribe from marketing communications at any time</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: <Globe className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-yellow-400 font-bold mb-3">Cookie Types We Use</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <div>
                  <h5 className="text-white font-semibold">Essential Cookies</h5>
                  <p className="text-gray-400 text-sm">Required for basic website functionality</p>
                </div>
                <div className="text-green-400 text-sm font-semibold">Always Active</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <div>
                  <h5 className="text-white font-semibold">Analytics Cookies</h5>
                  <p className="text-gray-400 text-sm">Help us understand how you use our site</p>
                </div>
                <div className="text-yellow-400 text-sm font-semibold">Optional</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <h5 className="text-white font-semibold">Marketing Cookies</h5>
                  <p className="text-gray-400 text-sm">Used to show relevant advertisements</p>
                </div>
                <div className="text-yellow-400 text-sm font-semibold">Optional</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-red-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 px-6 py-2 rounded-full text-yellow-400 mb-8">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">YOUR PRIVACY MATTERS</span>
            <Shield className="w-4 h-4" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block text-white">PRIVACY</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              POLICY
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            At ARCDATUM CORP, we re committed to protecting your privacy and maintaining the highest standards of data security. This policy explains how we collect, use, and safeguard your information.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: June 4, 2025</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>Effective Worldwide</span>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Privacy at a Glance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Lock className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Secure by Design</h3>
              <p className="text-gray-400 text-sm">Enterprise-grade security protects your data 24/7</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Your Control</h3>
              <p className="text-gray-400 text-sm">Full control over your personal information and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">No Data Sales</h3>
              <p className="text-gray-400 text-sm">We never sell your personal information to third parties</p>
            </div>
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl text-black">
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{section.title}</h2>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-6 h-6 text-yellow-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {expandedSection === section.id && (
                <div className="px-6 pb-6 border-t border-gray-700/50">
                  <div className="pt-6">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl p-8 border border-yellow-400/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our privacy team is here to help. Contact us anytime with questions about your data, privacy rights, or this policy.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-full">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-white">privacy@arcdatum.com</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-full">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-white">1-800-PRIVACY</span>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                Contact Privacy Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            This privacy policy is part of our commitment to transparency and your privacy rights. 
            We may update this policy from time to time, and we ll notify you of any significant changes.
          </p>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;