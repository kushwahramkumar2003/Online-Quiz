// Feedback.jsx
import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { submitFeedback } from "../../services/feedback";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, message, rating }) => {
      return submitFeedback({ name, email, message, rating });
    },
    onSuccess: (data) => {
      toast.success("Feedback submitted successfully");
      console.log(data);
      navigate("/User");
    },
    onError: (error) => {
      toast.error(error?.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({ ...formData });
  };

  return (
    <div className="max-w-md mx-auto mt-[4.5%]">
        <h2 className="text-[20px] mb-[2%] align-middle text-center font-bold text-green-600"> Send us your feedback </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
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
            placeholder="Enter your name"
            className="w-full p-4.5 mt-1 border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
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
            placeholder="Enter your email address"
            className="w-full p-4.5 mt-1 border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
            placeholder="Enter your message here"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here"
            className="w-full p-4 mt-1 mb-[-1%] border rounded-md"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
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
            disabled={isLoading}
            className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:block"
          >
            Submit Feedback
          </button>
        </div>
      </form>

    </div>
  );
};

export default Feedback;
