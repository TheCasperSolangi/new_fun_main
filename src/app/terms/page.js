"use client";
import React, { useState } from 'react';
import { Scale, FileText, AlertTriangle, CheckCircle, Users, CreditCard, Shield, Gavel, Globe, Calendar, ArrowRight, ChevronDown, ChevronUp, Star, Trophy, Lock } from 'lucide-react';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-400/30">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-green-400" />
              Agreement to Terms
            </h4>
            <p className="text-gray-300 mb-4">
              By accessing or using ARCDATUM CORP s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">What This Means:</h5>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Using our website or services means you accept these terms</li>
                <li>• These terms apply to all users, including visitors and paying customers</li>
                <li>• If terms change, continued use means acceptance of new terms</li>
                <li>• You must be 18+ or have parental consent to use our services</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Business Mentorship
              </h4>
              <p className="text-gray-300 text-sm">Comprehensive business training, dropshipping courses, and one-on-one mentorship programs</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community Access
              </h4>
              <p className="text-gray-300 text-sm">Exclusive access to our success community, networking events, and peer support groups</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Educational Content
              </h4>
              <p className="text-gray-300 text-sm">Video courses, written materials, templates, and resources for business development</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Support Services
              </h4>
              <p className="text-gray-300 text-sm">24/7 customer support, technical assistance, and success coaching</p>
            </div>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-400/30">
            <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Important Disclaimer
            </h4>
            <p className="text-gray-300 text-sm">
              Our services are educational and informational. While we provide proven strategies and support, individual results may vary. Success depends on your effort, dedication, and market conditions beyond our control.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'user-obligations',
      title: 'User Responsibilities',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-white font-bold mb-3">Account Requirements</h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Provide accurate and complete information during registration</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Maintain the security and confidentiality of your account credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Notify us immediately of any unauthorized account access</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use services only for lawful purposes and in accordance with these terms</span>
              </li>
            </ul>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-400/30">
            <h4 className="text-red-400 font-bold mb-3">Prohibited Activities</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-white font-semibold mb-2">Content Violations</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Sharing copyrighted materials</li>
                  <li>• Posting inappropriate content</li>
                  <li>• Harassment or bullying</li>
                  <li>• Spreading misinformation</li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-2">System Abuse</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Attempting to hack or breach security</li>
                  <li>• Using automated systems or bots</li>
                  <li>• Interfering with service operation</li>
                  <li>• Reverse engineering our systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment-terms',
      title: 'Payment & Billing',
      icon: <CreditCard className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/30">
            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Processing
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Accepted Payment Methods</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Major credit cards (Visa, Mastercard, American Express)</li>
                  <li>• PayPal and digital wallets</li>
                  <li>• Bank transfers for enterprise clients</li>
                  <li>• Cryptocurrency (Bitcoin, Ethereum)</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Billing Terms</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Payments are processed immediately upon purchase</li>
                  <li>• Subscription services are billed according to your selected plan</li>
                  <li>• All prices are in USD unless otherwise specified</li>
                  <li>• Taxes may apply based on your location</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-400/30">
            <h4 className="text-yellow-400 font-bold mb-2">Refund Policy</h4>
            <p className="text-gray-300 text-sm mb-3">
              We offer a 30-day money-back guarantee for most of our services. Refund requests must be submitted within 30 days of purchase and meet our refund criteria.
            </p>
            <div className="text-gray-400 text-xs">
              <strong>Note:</strong> Certain services may have different refund terms, which will be clearly communicated at the time of purchase.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <Lock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/30">
            <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Our Intellectual Property
            </h4>
            <p className="text-gray-300 mb-4">
              All content, materials, and intellectual property provided through ARCDATUM CORP services are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Whats Protected</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Course content and materials</li>
                  <li>• Video tutorials and presentations</li>
                  <li>• Proprietary methodologies</li>
                  <li>• Software and systems</li>
                  <li>• Branding and trademarks</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Your Rights</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Personal use of purchased content</li>
                  <li>• Download for offline viewing</li>
                  <li>• Apply learned concepts to your business</li>
                  <li>• Share success stories (with permission)</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-400/30">
            <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Restrictions
            </h4>
            <p className="text-gray-300 text-sm">
              You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission. Violation of these terms may result in legal action.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers & Limitations',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-400/30">
            <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Disclaimers
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">No Guarantee of Results</h5>
                <p className="text-gray-300 text-sm">
                  While our methods are proven and our students have achieved success, we cannot guarantee specific results. Your success depends on your effort, market conditions, and factors beyond our control.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Educational Purpose</h5>
                <p className="text-gray-300 text-sm">
                  Our content is provided for educational and informational purposes only. It should not be considered as financial, legal, or business advice. Always consult with qualified professionals for specific guidance.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Service Availability</h5>
                <p className="text-gray-300 text-sm">
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service. We may perform maintenance, updates, or experience technical issues that temporarily affect service availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <Gavel className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-white font-bold mb-3">Termination Rights</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-yellow-400 font-semibold mb-2">Your Rights</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Cancel subscription anytime</li>
                  <li>• Request account deletion</li>
                  <li>• Stop using services without penalty</li>
                  <li>• Export your data before termination</li>
                </ul>
              </div>
              <div>
                <h5 className="text-yellow-400 font-semibold mb-2">Our Rights</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Terminate for terms violation</li>
                  <li>• Suspend accounts for investigation</li>
                  <li>• Discontinue services with notice</li>
                  <li>• Modify or update terms</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-400/30">
            <h4 className="text-red-400 font-bold mb-2">Effect of Termination</h4>
            <p className="text-gray-300 text-sm">
              Upon termination, your access to services will cease immediately. You ll retain access to any downloaded content but lose access to online resources, community features, and support services.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'governing-law',
      title: 'Legal & Governing Law',
      icon: <Scale className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/30">
            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Legal Framework
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Governing Law</h5>
                <p className="text-gray-300 text-sm">
                  These terms are governed by the laws of [State/Country] without regard to conflict of law principles. Any disputes will be resolved in the courts of [Jurisdiction].
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Dispute Resolution</h5>
                <p className="text-gray-300 text-sm">
                  We encourage resolving disputes through direct communication. If formal resolution is needed, disputes will be handled through binding arbitration in accordance with applicable arbitration rules.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h5 className="text-yellow-400 font-semibold mb-2">Severability</h5>
                <p className="text-gray-300 text-sm">
                  If any provision of these terms is found to be unenforceable, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law.
                </p>
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
            <Scale className="w-4 h-4" />
            <span className="text-sm font-semibold">LEGAL TERMS • TRANSPARENT POLICIES</span>
            <Gavel className="w-4 h-4" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block text-white">TERMS OF</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              SERVICE
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to ARCDATUM CORP. These terms govern your use of our services and establish a framework for our business relationship. Please read carefully before using our services.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Effective: June 4, 2025</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>Version 2.1</span>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Key Terms Summary
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Quality Services</h3>
              <p className="text-gray-400 text-sm">Proven mentorship and business training programs</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Fair Billing</h3>
              <p className="text-gray-400 text-sm">Transparent pricing with 30-day money-back guarantee</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Community Rules</h3>
              <p className="text-gray-400 text-sm">Respectful environment for all members to succeed</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">IP Protection</h3>
              <p className="text-gray-400 text-sm">Secure content with clear usage rights</p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
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
            <h2 className="text-3xl font-bold text-white mb-4">Questions About These Terms?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our legal team is available to clarify any questions about these terms of service. We believe in transparency and are here to help you understand your rights and obligations.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-full">
                <Scale className="w-5 h-5 text-yellow-400" />
                <span className="text-white">legal@arcdatum.com</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-full">
                <FileText className="w-5 h-5 text-yellow-400" />
                <span className="text-white">1-800-LEGAL-HELP</span>
              </div>
            </div>

            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              Contact Legal Team
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-white font-bold mb-2">Agreement Acceptance</h3>
            <p className="text-gray-400 text-sm">
              By using ARCDATUM CORP services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
              These terms may be updated periodically, and continued use of our services constitutes acceptance of any changes.
            </p>
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default TermsOfService;