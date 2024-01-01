// import api from "./baseUrl";

import axios from "axios";

const api = axios;

export const submitFeedback = async (formData) => {
  try {
    // Assuming you have a backend endpoint to handle feedback submission
    const { data } = await api.post("/api/v1/feedback/submit", formData);
    // Optionally, you can add logic to handle success (e.g., redirect)
    return data;
  } catch (error) {
    // Handle error, e.g., display an error message
    console.error("Error submitting feedback:", error);
  }
};
