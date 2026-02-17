// components/TestimonialsTable.jsx
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Star, Loader2 } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { TableRow } from './TableRow';

const API_BASE_URL = 'https://api.arcdatum.com/api';

export const TestimonialsTable = ({ searchTerm = '', refreshTrigger }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken'); // Assuming you store JWT token
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

      // Remove from local state
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      alert('Failed to delete testimonial');
    }
  };

  // Update testimonial approval status
  const toggleApproval = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      const updatedTestimonial = await response.json();
      
      // Update local state
      setTestimonials(testimonials.map(testimonial =>
        testimonial.id === id ? updatedTestimonial : testimonial
      ));
    } catch (err) {
      console.error('Error updating testimonial:', err);
      alert('Failed to update testimonial');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [refreshTrigger]);

  // Add testimonial to local state (called from parent)
  const addTestimonial = (newTestimonial) => {
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.testimonial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading testimonials...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={fetchTestimonials}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (filteredTestimonials.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {searchTerm ? 'No testimonials found matching your search.' : 'No testimonials available.'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Student</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Rating</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Testimonial</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Location</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Revenue</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Join Date</th>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTestimonials.map(testimonial => (
            <TableRow key={testimonial.id}>
              <td className="py-4 px-6">
                <div>
                  <div className="font-medium">{testimonial.student}</div>
                  <div className="text-sm text-gray-500">Age: {testimonial.age}</div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating})</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="max-w-xs">
                  <div className="text-gray-600 truncate">{testimonial.testimonial}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {testimonial.timeframe} • {testimonial.growth}
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-600">{testimonial.location}</td>
              <td className="py-4 px-6">
                <span className="font-medium text-green-600">{testimonial.revenue}</span>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => toggleApproval(testimonial.id, testimonial.approved)}
                  className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                    testimonial.approved 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  {testimonial.approved ? 'Approved' : 'Pending'}
                </button>
              </td>
              <td className="py-4 px-6 text-gray-500">{testimonial.joinDate}</td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <ActionButton 
                    icon={Eye} 
                    onClick={() => window.open(testimonial.video_url, '_blank')}
                    title="View Video"
                  />
                  <ActionButton 
                    icon={Edit}
                    onClick={() => {
                      // Handle edit - you can implement a modal or navigate to edit page
                      console.log('Edit testimonial:', testimonial.id);
                    }}
                    title="Edit"
                  />
                  <ActionButton 
                    icon={Trash2} 
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(testimonial.id)}
                    title="Delete"
                  />
                </div>
              </td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};