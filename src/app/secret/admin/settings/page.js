// pages/admin/frontend-texts.js
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_BASE_URL = 'https://api.arcdatum.com/api/frontend';

export default function FrontendTextManagement() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState({}); // Track file upload states
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/text/settings`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch settings');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      
      if (data?._id) {
        // Update existing
        const response = await axios.put(
          `${API_BASE_URL}/text/settings/${data._id}`,
          data
        );
        setSuccess('Settings updated successfully!');
      } else {
        // Create new
        const response = await axios.post(
          `${API_BASE_URL}/text/settings`,
          data
        );
        setData(response.data.data);
        setSuccess('Settings created successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save settings');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setData(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, template) => {
    setData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (e, field, index, acceptedTypes = '*/*') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadKey = index !== undefined ? `${field}_${index}` : field;
    
    try {
      setUploadingFiles(prev => ({ ...prev, [uploadKey]: true }));
      setError('');

      const formData = new FormData();
      formData.append('file', file);
      
      // Upload to storage server
      const uploadResponse = await axios.post('https://ftp.arcdatum.com/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          // Optional: You can add progress tracking here
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });
      
      const fileUrl = uploadResponse.data.url;

      if (index !== undefined) {
        // For array fields like about_me_pictures or help_sections
        setData(prev => {
          const newArray = [...prev[field]];
          const currentItem = newArray[index];
          
          // Determine the correct URL field name based on the current structure
          let urlFieldName = 'url'; // default
          if ('picture_url' in currentItem) urlFieldName = 'picture_url';
          else if ('image_url' in currentItem) urlFieldName = 'image_url';
          else if ('video_url' in currentItem) urlFieldName = 'video_url';
          else if ('file_url' in currentItem) urlFieldName = 'file_url';
          
          newArray[index] = { ...newArray[index], [urlFieldName]: fileUrl };
          return { ...prev, [field]: newArray };
        });
      } else {
        // For direct file fields
        setData(prev => ({ ...prev, [field]: fileUrl }));
      }
      
      setSuccess(`File uploaded successfully!`);
    } catch (err) {
      console.error('File upload error:', err);
      setError(`Failed to upload file: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploadingFiles(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  const getFilePreview = (fileUrl, fileName = '') => {
    if (!fileUrl) return null;

    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(fileExtension);
    const isVideo = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv'].includes(fileExtension);
    const isAudio = ['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(fileExtension);

    if (isImage) {
      return <img src={fileUrl} alt={fileName} className="max-w-xs max-h-48 object-cover mb-2 rounded" />;
    } else if (isVideo) {
      return (
        <video controls className="max-w-xs max-h-48 mb-2 rounded">
          <source src={fileUrl} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (isAudio) {
      return (
        <audio controls className="mb-2">
          <source src={fileUrl} />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      return (
        <div className="mb-2 p-2 border rounded bg-gray-50">
          <p className="text-sm text-gray-600">File: {fileName || fileUrl.split('/').pop()}</p>
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            View/Download File
          </a>
        </div>
      );
    }
  };

  const getAcceptAttribute = (fieldType) => {
    switch (fieldType) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';
      case 'document':
        return '.pdf,.doc,.docx,.txt,.rtf';
      default:
        return '*/*'; // Accept all file types
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error && !data) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frontend Text Management</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Trophy Text */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Trophy Text</h2>
          <textarea
            name="trophy_text"
            value={data?.trophy_text || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          
          <div className="mb-4">
            <label className="block mb-2">Banner Text</label>
            <input
              type="text"
              name="hero_section_banner_text"
              value={data?.hero_section_banner_text || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Description Text</label>
            <textarea
              name="hero_section_description_text"
              value={data?.hero_section_description_text || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block mb-2">Elements</label>
            {data?.hero_section_elements_text?.map((element, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Element {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('hero_section_elements_text', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Heading</label>
                  <input
                    type="text"
                    value={element.element_heading}
                    onChange={(e) => handleArrayChange('hero_section_elements_text', index, 'element_heading', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Text</label>
                  <textarea
                    value={element.element_text}
                    onChange={(e) => handleArrayChange('hero_section_elements_text', index, 'element_text', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('hero_section_elements_text', { element_heading: '', element_text: '' })}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Element
            </button>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">About Me Section</h2>
          
          <div className="mb-4">
            <label className="block mb-2">Paragraph One</label>
            <textarea
              name="about_me_paragraph_one"
              value={data?.about_me_paragraph_one || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Paragraph Two</label>
            <textarea
              name="about_me_paragraph_two"
              value={data?.about_me_paragraph_two || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block mb-2">Media Files</label>
            {data?.about_me_pictures?.map((picture, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Media {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('about_me_pictures', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                {picture.picture_url && getFilePreview(picture.picture_url, `About me media ${index + 1}`)}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept={getAcceptAttribute('image')} // You can change this to '*/*' for all files
                    onChange={(e) => handleFileUpload(e, 'about_me_pictures', index)}
                    disabled={uploadingFiles[`about_me_pictures_${index}`]}
                    className="w-full p-2 border rounded"
                  />
                  {uploadingFiles[`about_me_pictures_${index}`] && (
                    <span className="text-blue-500 text-sm">Uploading...</span>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('about_me_pictures', { picture_url: '' })}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Media File
            </button>
          </div>
        </div>

        {/* Form Questions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Form Questions</h2>
          
          {data?.form_questions?.map((question, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Question {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem('form_questions', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={question.name}
                  onChange={(e) => handleArrayChange('form_questions', index, 'name', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Label</label>
                <input
                  type="text"
                  value={question.label}
                  onChange={(e) => handleArrayChange('form_questions', index, 'label', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Type</label>
                <select
                  value={question.type}
                  onChange={(e) => handleArrayChange('form_questions', index, 'type', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="select">Select</option>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="file">File Upload</option>
                </select>
              </div>
              
              <div className="mb-2">
                <label className="block mb-2">Options</label>
                {question.options?.map((option, optIndex) => (
                  <div key={optIndex} className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Value"
                      value={option.value}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[optIndex] = { ...newOptions[optIndex], value: e.target.value };
                        handleArrayChange('form_questions', index, 'options', newOptions);
                      }}
                      className="w-1/2 p-2 border rounded mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Label"
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[optIndex] = { ...newOptions[optIndex], label: e.target.value };
                        handleArrayChange('form_questions', index, 'options', newOptions);
                      }}
                      className="w-1/2 p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = question.options.filter((_, i) => i !== optIndex);
                        handleArrayChange('form_questions', index, 'options', newOptions);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newOptions = [...(question.options || []), { value: '', label: '' }];
                    handleArrayChange('form_questions', index, 'options', newOptions);
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Option
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('form_questions', {
              name: '',
              label: '',
              type: 'select',
              options: []
            })}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>

        {/* Help Sections */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Help Sections</h2>
          
          {data?.help_sections?.map((section, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Section {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem('help_sections', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="mb-2">
                {section.image_url && getFilePreview(section.image_url, `Help section ${index + 1}`)}
                <label className="block mb-1">Media File</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="*/*" // Accept all file types
                    onChange={(e) => handleFileUpload(e, 'help_sections', index)}
                    disabled={uploadingFiles[`help_sections_${index}`]}
                    className="w-full p-2 border rounded"
                  />
                  {uploadingFiles[`help_sections_${index}`] && (
                    <span className="text-blue-500 text-sm">Uploading...</span>
                  )}
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleArrayChange('help_sections', index, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Paragraphs</label>
                {section.paragraphs?.map((paragraph, pIndex) => (
                  <div key={pIndex} className="flex mb-2">
                    <textarea
                      value={paragraph}
                      onChange={(e) => {
                        const newParagraphs = [...section.paragraphs];
                        newParagraphs[pIndex] = e.target.value;
                        handleArrayChange('help_sections', index, 'paragraphs', newParagraphs);
                      }}
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newParagraphs = section.paragraphs.filter((_, i) => i !== pIndex);
                        handleArrayChange('help_sections', index, 'paragraphs', newParagraphs);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newParagraphs = [...(section.paragraphs || []), ''];
                    handleArrayChange('help_sections', index, 'paragraphs', newParagraphs);
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Paragraph
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('help_sections', {
              image_url: '',
              title: '',
              paragraphs: ['']
            })}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Help Section
          </button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">FAQ Section</h2>
          
          {data?.faq_section?.map((faq, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">FAQ {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem('faq_section', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Question</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleArrayChange('faq_section', index, 'question', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Answer</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleArrayChange('faq_section', index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('faq_section', { question: '', answer: '' })}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add FAQ
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={Object.values(uploadingFiles).some(Boolean)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {Object.values(uploadingFiles).some(Boolean) ? 'Uploading Files...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
