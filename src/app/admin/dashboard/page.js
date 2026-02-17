// Main AdminDashboard.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { PageHeader } from '@/components/PageHeader';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { ResponsesTable } from '@/components/ResponseTable';
import { VideosTable } from '@/components/VideoTable';
import { SuccessStoriesTable } from '@/components/SuccessStoriesTable';
import { TestimonialsTable } from '@/components/TestimonialTable';
import { AddTestimonialModal } from '@/components/AddTestimonialModal';

const API_BASE_URL = 'https://api.arcdatum.com/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddTestimonialModalOpen, setIsAddTestimonialModalOpen] = useState(false);
  const [refreshTestimonials, setRefreshTestimonials] = useState(0);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalResponses: 0,
    totalVideos: 0,
    successStories: 0,
    testimonials: 0
  });

  // Sample data for other sections (you can make these dynamic too)
  const recentResponses = [
    { id: 1, user: 'John Doe', message: 'Great service!', date: '2024-06-01', status: 'approved' },
    { id: 2, user: 'Jane Smith', message: 'Very helpful platform', date: '2024-06-01', status: 'pending' },
    { id: 3, user: 'Mike Johnson', message: 'Excellent experience', date: '2024-05-31', status: 'approved' }
  ];

  const videos = [
    { id: 1, title: 'Getting Started Tutorial', duration: '5:32', views: 1240, status: 'published', date: '2024-05-28' },
    { id: 2, title: 'Advanced Features', duration: '8:15', views: 890, status: 'draft', date: '2024-05-30' },
    { id: 3, title: 'Best Practices', duration: '6:45', views: 2100, status: 'published', date: '2024-05-25' }
  ];

  const successStories = [
    { id: 1, title: 'From Zero to Hero', author: 'Sarah Wilson', category: 'Business', date: '2024-05-29', featured: true },
    { id: 2, title: 'My Journey to Success', author: 'David Brown', category: 'Personal', date: '2024-05-27', featured: false },
    { id: 3, title: 'Overcoming Challenges', author: 'Emma Davis', category: 'Career', date: '2024-05-26', featured: true }
  ];

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      // Fetch testimonials count
      const testimonialsResponse = await fetch(`${API_BASE_URL}/testimonials`);
      if (testimonialsResponse.ok) {
        const testimonials = await testimonialsResponse.json();
        setDashboardStats(prev => ({
          ...prev,
          testimonials: testimonials.length
        }));
      }

      // You can add more API calls here for other statistics
      // For now, keeping the sample data for other stats
      setDashboardStats(prev => ({
        ...prev,
        totalUsers: 12430,
        totalResponses: 8564,
        totalVideos: 342,
        successStories: 127
      }));
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Handle adding new testimonial
  const handleAddTestimonial = () => {
    setIsAddTestimonialModalOpen(true);
  };

  // Handle testimonial added successfully
  const handleTestimonialAdded = (newTestimonial) => {
    // Refresh testimonials list
    setRefreshTestimonials(prev => prev + 1);
    // Update dashboard stats
    setDashboardStats(prev => ({
      ...prev,
      testimonials: prev.testimonials + 1
    }));
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': 
        return <Dashboard dashboardStats={dashboardStats} recentResponses={recentResponses} />;
      
      case 'responses': 
        return (
          <div className="space-y-6">
            <PageHeader title="Responses Management" buttonText="Add Response" />
            <div className="bg-white rounded-lg shadow-sm border">
              <SearchAndFilter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                placeholder="Search responses..."
              />
              <ResponsesTable responses={recentResponses} />
            </div>
          </div>
        );
      
      case 'videos': 
        return (
          <div className="space-y-6">
            <PageHeader title="Videos Management" buttonText="Upload Video" />
            <div className="bg-white rounded-lg shadow-sm border">
              <SearchAndFilter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                placeholder="Search videos..."
              />
              <VideosTable videos={videos} />
            </div>
          </div>
        );
      
      case 'success-stories': 
        return (
          <div className="space-y-6">
            <PageHeader title="Success Stories" buttonText="Add Story" />
            <div className="bg-white rounded-lg shadow-sm border">
              <SearchAndFilter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                placeholder="Search stories..."
              />
              <SuccessStoriesTable stories={successStories} />
            </div>
          </div>
        );
      
      case 'testimonials': 
        return (
          <div className="space-y-6">
            <PageHeader 
              title="Testimonials" 
              buttonText="Add Testimonial" 
              onButtonClick={handleAddTestimonial}
            />
            <div className="bg-white rounded-lg shadow-sm border">
              <SearchAndFilter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                placeholder="Search testimonials..."
              />
              <TestimonialsTable 
                searchTerm={searchTerm} 
                refreshTrigger={refreshTestimonials}
              />
            </div>
          </div>
        );
      
      default: 
        return <Dashboard dashboardStats={dashboardStats} recentResponses={recentResponses} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
      
      {/* Add Testimonial Modal */}
      <AddTestimonialModal
        isOpen={isAddTestimonialModalOpen}
        onClose={() => setIsAddTestimonialModalOpen(false)}
        onTestimonialAdded={handleTestimonialAdded}
      />
    </div>
  );
};

export default AdminDashboard;