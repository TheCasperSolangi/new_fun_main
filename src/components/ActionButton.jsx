// components/ActionButton.jsx
import React from 'react';

export const ActionButton = ({ icon: Icon, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${className}`}
  >
    <Icon className="h-4 w-4" />
  </button>
);
