// components/Dashboard.jsx
import React from 'react';
import { Users, MessageSquare, Video, Trophy, Star, Plus, Edit, Eye } from 'lucide-react';
import { StatCard } from './StateCard';

export const Dashboard = ({ dashboardStats, recentResponses }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
      <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard title="Total Users" value={dashboardStats.totalUsers.toLocaleString()} icon={Users} trend={12} />
      <StatCard title="Responses" value={dashboardStats.totalResponses.toLocaleString()} icon={MessageSquare} trend={8} />
      <StatCard title="Videos" value={dashboardStats.totalVideos} icon={Video} trend={15} />
      <StatCard title="Success Stories" value={dashboardStats.successStories} icon={Trophy} trend={22} />
      <StatCard title="Testimonials" value={dashboardStats.testimonials} icon={Star} trend={18} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentResponses.slice(0, 5).map(response => (
            <div key={response.id} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{response.user}</p>
                <p className="text-sm text-gray-600">{response.message}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                response.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {response.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Add Video
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            New Story
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <Edit className="h-5 w-5 mr-2" />
            Moderate
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
            <Eye className="h-5 w-5 mr-2" />
            Analytics
          </button>
        </div>
      </div>
    </div>
  </div>
);
