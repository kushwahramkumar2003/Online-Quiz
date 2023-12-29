const Feedback = require("../models/Feedback.model");
const asyncHandler = require("../services/asyncHandler");

exports.sendFeedback = asyncHandler(async (req, res) => {
  const { name, email, message, rating } = req.body;

  if (!name || !email || !message || !rating) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const feedback = new Feedback({
    name,
    email,
    message,
    rating,
  });

  await feedback.save();

  res.status(201).json({
    message: "Feedback sent successfully",
    feedback,
  });
});
