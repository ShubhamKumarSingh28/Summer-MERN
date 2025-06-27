import React, { useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../config';

const CreateLinkForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    campaignTitle: '',
    originalUrl: '',
    category: '',
    thumbnail: ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${serverEndpoint}/links`, formData, { withCredentials: true });
      alert('Link created successfully');
      setFormData({ campaignTitle: '', originalUrl: '', category: '', thumbnail: '' });
      onSuccess(); // refresh links if needed
    } catch (err) {
      console.error('Error creating link', err);
      alert('Failed to create link');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Create New Link</h4>
      <input name="campaignTitle" placeholder="Campaign Title" className="form-control mb-2" onChange={handleChange} value={formData.campaignTitle} required />
      <input name="originalUrl" placeholder="Original URL" className="form-control mb-2" onChange={handleChange} value={formData.originalUrl} required />
      <input name="category" placeholder="Category" className="form-control mb-2" onChange={handleChange} value={formData.category} required />
      <input name="thumbnail" placeholder="Thumbnail URL (optional)" className="form-control mb-2" onChange={handleChange} value={formData.thumbnail} />
      <button type="submit" className="btn btn-primary">Create Link</button>
    </form>
  );
};

export default CreateLinkForm;
