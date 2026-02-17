// components/PageHeader.jsx
import React from 'react';
import { Plus } from 'lucide-react';

export const PageHeader = ({ title, buttonText, onButtonClick }) => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <button 
      onClick={onButtonClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
    >
      <Plus className="h-4 w-4 mr-2" />
      {buttonText}
    </button>
  </div>
);
