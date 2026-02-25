// components/ResponsesTable.jsx
import React from 'react';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { TableRow } from './TableRow';
export const ResponsesTable = ({ responses }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left py-3 px-6 font-medium text-gray-700">User</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Message</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {responses.map(response => (
          <TableRow key={response.id}>
            <td className="py-4 px-6 font-medium">{response.user}</td>
            <td className="py-4 px-6 text-gray-600">{response.message}</td>
            <td className="py-4 px-6 text-gray-500">{response.date}</td>
            <td className="py-4 px-6">
              <span className={`px-2 py-1 rounded-full text-xs ${
                response.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {response.status}
              </span>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center space-x-2">
                <ActionButton icon={Edit} />
                <ActionButton icon={Trash2} className="text-red-500 hover:bg-red-50" />
                <ActionButton icon={MoreHorizontal} />
              </div>
            </td>
          </TableRow>
        ))}
      </tbody>
    </table>
  </div>
);
