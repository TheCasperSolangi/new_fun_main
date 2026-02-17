// components/AddTestimonialModal.jsx
import React, { useState } from 'react';
import { X, Upload, Star } from 'lucide-react';

const API_BASE_URL = 'https://api.arcdatum.com/api';

export const AddTestimonialModal = ({ isOpen, onClose, onTestimonialAdded }) => {
  const [formData, setFormData] = useState({
    id: '',
    student: '',
    age: '',
    location: '',
    timeframe: '',
    revenue: '',
    growth: '',
    video_url: '',
    thumbnail: '',
    duration: '',
    testimonial: '',
    beforeJob: '',
    afterStatus: '',
    rating: 5,
    joinDate: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id) newErrors.id = 'ID is required';
    if (!formData.student) newErrors.student = 'Student name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.timeframe) newErrors.timeframe = 'Timeframe is required';
    if (!formData.revenue) newErrors.revenue = 'Revenue is required';
    if (!formData.growth) newErrors.growth = 'Growth is required';
    if (!formData.video_url) newErrors.video_url = 'Video URL is required';
    if (!formData.thumbnail) newErrors.thumbnail = 'Thumbnail URL is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.testimonial) newErrors.testimonial = 'Testimonial is required';
    if (!formData.beforeJob) newErrors.beforeJob = 'Before job status is required';
    if (!formData.afterStatus) newErrors.afterStatus = 'After status is required';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to create testimonial');
      }

      const newTestimonial = await response.json();
      
      // Reset form
      setFormData({
        id: '',
        student: '',
        age: '',
        location: '',
        timeframe: '',
        revenue: '',
        growth: '',
        video_url: '',
        thumbnail: '',
        duration: '',
        testimonial: '',
        beforeJob: '',
        afterStatus: '',
        rating: 5,
        joinDate: ''
      });
      
      // Notify parent component
      if (onTestimonialAdded) {
        onTestimonialAdded(newTestimonial);
      }
      
      // Close modal
      onClose();
      
    } catch (error) {
      console.error('Error creating testimonial:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setFormData({
        id: '',
        student: '',
        age: '',
        location: '',
        timeframe: '',
        revenue: '',
        growth: '',
        video_url: '',
        thumbnail: '',
        duration: '',
        testimonial: '',
        beforeJob: '',
        afterStatus: '',
        rating: 5,
        joinDate: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Testimonial</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.id ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter unique ID"
              />
              {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="student"
                value={formData.student}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.student ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter student name"
              />
              {errors.student && <p className="text-red-500 text-sm mt-1">{errors.student}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter age"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter location"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.timeframe ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 6 months"
              />
              {errors.timeframe && <p className="text-red-500 text-sm mt-1">{errors.timeframe}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Revenue <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.revenue ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., $50K/month"
              />
              {errors.revenue && <p className="text-red-500 text-sm mt-1">{errors.revenue}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Growth <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="growth"
                value={formData.growth}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.growth ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 300% increase"
              />
              {errors.growth && <p className="text-red-500 text-sm mt-1">{errors.growth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.joinDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.joinDate && <p className="text-red-500 text-sm mt-1">{errors.joinDate}</p>}
            </div>
          </div>

          {/* Video Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.video_url ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/video.mp4"
              />
              {errors.video_url && <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/thumbnail.jpg"
              />
              {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 5:32"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`p-1 ${
                      star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">({formData.rating}/5)</span>
              </div>
            </div>
          </div>

          {/* Career Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Before Job Status <span className="text-red-500">*</span>
              </label>
              <textarea
                name="beforeJob"
                value={formData.beforeJob}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.beforeJob ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe situation before joining..."
              />
              {errors.beforeJob && <p className="text-red-500 text-sm mt-1">{errors.beforeJob}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                After Status <span className="text-red-500">*</span>
              </label>
              <textarea
                name="afterStatus"
                value={formData.afterStatus}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.afterStatus ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe current situation..."
              />
              {errors.afterStatus && <p className="text-red-500 text-sm mt-1">{errors.afterStatus}</p>}
            </div>
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonial <span className="text-red-500">*</span>
            </label>
            <textarea
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.testimonial ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter the testimonial text..."
            />
            {errors.testimonial && <p className="text-red-500 text-sm mt-1">{errors.testimonial}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create Testimonial'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};