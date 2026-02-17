// components/Sidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Video, 
  Trophy, 
  Star 
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'responses', label: 'Responses', icon: MessageSquare },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'success-stories', label: 'Success Stories', icon: Trophy },
    { id: 'testimonials', label: 'Testimonials', icon: Star }
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
