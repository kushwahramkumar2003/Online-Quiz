// Feedback.jsx
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { submitFeedback } from "../../services/feedback";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Feed_back.css";

const Feedback = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const { mutate, isPending, isPaused } = useMutation({
    mutationFn: ({
      name,
      email,
      message,
      rating,
    }: {
      name: string;
      email: string;
      message: string;
      rating: number;
    }) => {
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
    <div className="main-feedback">
      <h2 className="text-[20px] mb-[2%] align-middle text-center font-bold text-green-600">
        {" "}
        Send us your feedback{" "}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block feedback-label">
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
            className="feedback-inputs p-4.5 mt-1 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block feedback-label">
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
            className="feedback-inputs p-4.5 mt-1 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="message" className="block feedback-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            // rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here"
            className="feedback-inputs p-4 mt-1 mb-[-1%] border rounded-md"
          ></textarea>
        </div>

        <div>
          <label htmlFor="rating" className="block feedback-label">
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
            className="p-2 mt-1 border rounded-md feedback-inputs"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending || isPaused}
            className="feedback-submit-btn"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
