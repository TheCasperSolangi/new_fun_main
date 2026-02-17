// components/VideosTable.jsx
import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { TableRow } from './TableRow';

export const VideosTable = ({ videos }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Title</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Duration</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Views</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
          <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {videos.map(video => (
          <TableRow key={video.id}>
            <td className="py-4 px-6 font-medium">{video.title}</td>
            <td className="py-4 px-6 text-gray-600">{video.duration}</td>
            <td className="py-4 px-6 text-gray-600">{video.views.toLocaleString()}</td>
            <td className="py-4 px-6">
              <span className={`px-2 py-1 rounded-full text-xs ${
                video.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {video.status}
              </span>
            </td>
            <td className="py-4 px-6 text-gray-500">{video.date}</td>
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
