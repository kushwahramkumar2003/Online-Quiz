// Feedback.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      // Assuming you have a backend endpoint to handle feedback submission
      await axios.post('/api/feedback', formData);
      // Optionally, you can add logic to handle success (e.g., redirect)
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating (0-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            required
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
