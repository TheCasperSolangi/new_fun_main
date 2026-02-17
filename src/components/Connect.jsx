"use client";
import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, Target, DollarSign, Calendar, CheckCircle, Loader2, Crosshair, LifeBuoy, Eye, Edit2, Trash2 } from 'lucide-react';
import { createLead, getLeads, updateLead, deleteLead } from '../services/leadsApi'; // Adjust path as needed

const ConnectWithUs = () => {
  const [formData, setFormData] = useState({
    full_name: '', // Changed from 'name' to match backend model
    email: '',
    phone: '',
    status: 'new', // Added status field
    questions: [],
    additional_message: '', // Changed from 'message' to match backend model
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  // For lead management (optional - for admin view)
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [showLeads, setShowLeads] = useState(false); // Toggle for admin view

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitError) setSubmitError('');
  };

  // Updated to match backend lead model
  const formatQuestionsForAPI = () => {
    const questions = [];
    
    // Add questions from form selections
    questionsConfig.slice(0, -1).forEach((questionConfig, index) => {
      const answer = formData[questionConfig.name];
      if (answer && answer !== '') {
        const option = questionConfig.options.find(opt => opt.value === answer);
        questions.push({
          question: questionConfig.label,
          answer: option ? option.label : answer
        });
      }
    });

    return questions;
  };

  // Send emails function (keep as is)
  const sendEmail = async (responseData) => {
    try {
      // ... (keep your existing sendEmail function code)
      // Email to admin/owner
      const emailData = {
        from: 'contact@spidysofts.com',
        to: 'naveeddsolangi@gmail.com',
        subject: 'New Lead Form Submission',
        html: `
          <h2>New Lead Form Submission</h2>
          <h3>Lead Information:</h3>
          <p><strong>Name:</strong> ${responseData.full_name}</p>
          <p><strong>Email:</strong> ${responseData.email}</p>
          <p><strong>Phone:</strong> ${responseData.phone || 'Not provided'}</p>
          <p><strong>Status:</strong> ${responseData.status}</p>
          
          <h3>Responses:</h3>
          ${responseData.questions && responseData.questions.map(q => `
            <div style="margin-bottom: 15px;">
              <strong>${q.question}</strong><br>
              ${q.answer}
            </div>
          `).join('')}
          
          ${responseData.additional_message ? `
            <h3>Additional Message:</h3>
            <p>${responseData.additional_message}</p>
          ` : ''}
          
          <hr>
          <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
          <p><em>Lead ID: ${responseData._id}</em></p>
        `
      };

      // Send notification email
      await fetch('https://api.arcdatum.com/api/emails/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      // Auto-reply to user
      const autoReplyData = {
        from: 'contact@spidysofts.com',
        to: responseData.email,
        subject: 'Thank you for contacting us!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank You, ${responseData.full_name}!</h2>
            <p>Your information has been saved to our system. We've received your details and will review them shortly.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Lead Summary:</h3>
              <p><strong>Lead ID:</strong> ${responseData._id}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Status:</strong> ${responseData.status}</p>
            </div>
            
            <p>We'll contact you within 24 hours to discuss next steps.</p>
            
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              Your Team
            </p>
          </div>
        `
      };

      await fetch('https://api.arcdatum.com/api/emails/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(autoReplyData)
      });

    } catch (error) {
      console.error('Email sending error:', error);
    }
  };

  // Fetch leads (admin function)
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const response = await getLeads();
      setLeads(response.data || response);
      setShowLeads(true);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setSubmitError('Failed to load leads');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  // Update lead status
  const updateLeadStatus = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      // Refresh leads list
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      setSubmitError('Failed to update lead status');
    }
  };

  // Delete lead
  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        // Refresh leads list
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        setSubmitError('Failed to delete lead');
      }
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.full_name || !formData.email) {
      setSubmitError('Please fill in all required fields (Name and Email)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepare data for lead API
      const leadData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || '',
        status: 'new',
        questions: formatQuestionsForAPI(),
        additional_message: formData.additional_message || ''
      };

      // Submit to leads API
      const result = await createLead(leadData);
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create lead');
      }

      console.log('Lead created successfully:', result.data);

      // Send emails
      await sendEmail({ ...leadData, _id: result.data._id || 'new-lead' });

      // Show success state
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          status: 'new',
          questions: [],
          additional_message: ''
        });
      }, 5000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

const questionsConfig = [
  {
    name: 'currentSituation',
    label: 'What best describes your current situation?',
    type: 'select',
    icon: <User className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select your situation...' },
      { value: 'employed', label: 'Currently employed, looking for growth' },
      { value: 'unemployed', label: 'Currently unemployed, need fast results' },
      { value: 'business-owner', label: 'Business owner wanting to scale' },
      { value: 'student', label: 'Student looking to build skills' },
      { value: 'retired', label: 'Retired, seeking new challenges' },
      { value: 'fitness-beginner', label: 'Fitness beginner wanting to transform' },
      { value: 'gym-regular', label: 'Regular gym-goer wanting to level up' },
      { value: 'credit-challenges', label: 'Facing credit challenges' }
    ]
  },
  {
    name: 'primaryFocus',
    label: 'What area do you want to focus on most?',
    type: 'select',
    icon: <Crosshair className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select your focus area...' },
      { value: 'business', label: 'Starting/growing a business' },
      { value: 'ecommerce', label: 'Ecommerce/digital business' },
      { value: 'fitness', label: 'Fitness and workout programs' },
      { value: 'nutrition', label: 'Nutrition and diet planning' },
      { value: 'credit-repair', label: 'Credit repair and improvement' },
      { value: 'personal-finance', label: 'Personal finance management' },
      { value: 'multiple-areas', label: 'Multiple areas (balanced approach)' }
    ]
  },
  {
    name: 'goals',
    label: 'What is your primary goal?',
    type: 'select',
    icon: <Target className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select your goal...' },
      { value: 'extra-income', label: 'Generate extra income ($1K-$5K/month)' },
      { value: 'replace-job', label: 'Replace my full-time job income' },
      { value: 'financial-freedom', label: 'Achieve financial freedom' },
      { value: 'credit-repair', label: 'Fix/improve my credit score' },
      { value: 'weight-loss', label: 'Lose weight and get healthier' },
      { value: 'muscle-gain', label: 'Build muscle and strength' },
      { value: 'nutrition-plan', label: 'Develop better eating habits' },
      { value: 'business-launch', label: 'Launch a successful business' },
      { value: 'all-above', label: 'Multiple goals across different areas' }
    ]
  },
  {
    name: 'timeline',
    label: 'What is your ideal timeline to see results?',
    type: 'select',
    icon: <Calendar className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select timeline...' },
      { value: '30-days', label: 'Quick results (30 days)' },
      { value: '3-months', label: 'Short-term (3 months)' },
      { value: '6-months', label: 'Medium-term (6 months)' },
      { value: '1-year', label: 'Long-term (1 year)' },
      { value: 'sustainable-change', label: 'Sustainable lifestyle change' }
    ]
  },
  {
    name: 'investmentRange',
    label: 'What is your budget for programs/tools/coaching?',
    type: 'select',
    icon: <DollarSign className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select investment range...' },
      { value: 'under-500', label: 'Under $500' },
      { value: '500-1000', label: '$500 - $1,000' },
      { value: '1000-2500', label: '$1,000 - $2,500' },
      { value: '2500-5000', label: '$2,500 - $5,000' },
      { value: 'over-5000', label: 'Over $5,000' },
      { value: 'depends-results', label: 'Depends on potential results' },
      { value: 'payment-plan', label: 'Need payment plan options' }
    ]
  },
  {
    name: 'experience',
    label: 'What is your experience level in your focus area?',
    type: 'select',
    icon: <CheckCircle className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select experience level...' },
      { value: 'complete-beginner', label: 'Complete beginner' },
      { value: 'some-experience', label: 'Some experience, need guidance' },
      { value: 'intermediate', label: 'Intermediate, looking to improve' },
      { value: 'experienced', label: 'Experienced, want to optimize' },
      { value: 'expert', label: 'Expert level, seeking mastery' }
    ]
  },
  {
    name: 'supportNeeds',
    label: 'What type of support do you need most?',
    type: 'select',
    icon: <LifeBuoy className="w-5 h-5" />,
    options: [
      { value: '', label: 'Select support type...' },
      { value: 'step-by-step', label: 'Step-by-step blueprint' },
      { value: 'accountability', label: 'Accountability and coaching' },
      { value: 'community', label: 'Community support' },
      { value: 'tools-resources', label: 'Tools and resources' },
      { value: 'personalized-plan', label: 'Personalized 1-on-1 plan' },
      { value: 'hybrid', label: 'Combination of several' }
    ]
  }
];

  if (isSubmitted) {
    return (
      <section id="connect" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50 shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Lead Created Successfully!</h3>
              <p className="text-gray-300 text-lg mb-4">
                Your lead has been saved to our database with status: <span className="text-green-400 font-bold">{formData.status}</span>. We'll review your information and get back to you within 24 hours.
              </p>
              <p className="text-gray-400 text-sm">
                A confirmation email has been sent to your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="connect" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Admin Controls */}
          <div className="flex justify-end mb-6">
            <button
              onClick={fetchLeads}
              disabled={isLoadingLeads}
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              {isLoadingLeads ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              {showLeads ? 'Hide Leads' : 'View Leads'}
            </button>
          </div>

          {/* Leads Table (Admin View) */}
          {showLeads && (
            <div className="mb-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Leads Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead._id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                        <td className="px-4 py-3">{lead.full_name}</td>
                        <td className="px-4 py-3">{lead.email}</td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                          >
                            <option value="new">New</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="complete">Complete</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-white">CREATE </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                NEW LEAD
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Submit your information to create a new lead in our system.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="space-y-6">
              
              {/* Error Message */}
              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-sm">{submitError}</p>
                </div>
              )}
              
              {/* Basic Info Row */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('full_name')}
                    onBlur={() => setFocusedField('')}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === 'full_name' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === 'email' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === 'phone' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              

              {/* Dynamic Questions */}
              <div className="grid md:grid-cols-2 gap-6">
                {questionsConfig.slice(0, -1).map((question) => (
                  <div key={question.name} className="relative">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      {question.icon}
                      <span className="ml-2">{question.label}</span>
                    </label>
                    <select
                      name={question.name}
                      value={formData[question.name]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(question.name)}
                      onBlur={() => setFocusedField('')}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        focusedField === question.name 
                          ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {question.options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Additional Message
                </label>
                <textarea
                  name="additional_message"
                  value={formData.additional_message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('additional_message')}
                  onBlur={() => setFocusedField('')}
                  rows={4}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    focusedField === 'additional_message' 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  placeholder="Tell us more about your specific situation, challenges, or questions..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Lead...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Create New Lead
                    </>
                  )}
                </button>
                <p className="text-gray-400 text-sm mt-3">
                  Lead will be saved to database and emails will be sent automatically
                </p>
              </div>

            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Database Storage</h3>
              <p className="text-gray-400">All leads are securely stored in our database</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Status Tracking</h3>
              <p className="text-gray-400">Track lead progress with status updates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Automated Emails</h3>
              <p className="text-gray-400">Instant confirmation and notification emails</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;