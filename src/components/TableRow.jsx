// components/TableRow.jsx
import React from 'react';

export const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b hover:bg-gray-50 ${className}`}>
    {children}
  </tr>
);
