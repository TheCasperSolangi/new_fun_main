// components/SearchAndFilter.jsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

export const SearchAndFilter = ({ searchTerm, setSearchTerm, placeholder = "Search..." }) => (
  <div className="p-6 border-b">
    <div className="flex items-center space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </button>
    </div>
  </div>
);