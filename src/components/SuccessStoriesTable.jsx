// components/SuccessStoriesTable.jsx
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { TableRow } from './TableRow';

export const SuccessStoriesTable = ({ stories }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Title</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Author</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Category</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Featured</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {stories.map(story => (
          <TableRow key={story.id}>
            <td className="py-4 px-6 font-medium">{story.title}</td>
            <td className="py-4 px-6 text-gray-600">{story.author}</td>
            <td className="py-4 px-6 text-gray-600">{story.category}</td>
            <td className="py-4 px-6">
              <span className={`px-2 py-1 rounded-full text-xs ${
                story.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {story.featured ? 'Featured' : 'Regular'}
              </span>
            </td>
            <td className="py-4 px-6 text-gray-500">{story.date}</td>
            <td className="py-4 px-6">
              <div className="flex items-center space-x-2">
                <ActionButton icon={Eye} />
                <ActionButton icon={Edit} />
                <ActionButton icon={Trash2} className="text-red-500 hover:bg-red-50" />
              </div>
            </td>
          </TableRow>
        ))}
      </tbody>
    </table>
  </div>
);