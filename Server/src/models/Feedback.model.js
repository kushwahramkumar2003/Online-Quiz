const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to hash the password before saving to the database
feedbackSchema.pre("save", async function (next) {
  // Hash the password using bcrypt
  // ...
  next();
});

// Add a static method to find a user by email
feedbackSchema.statics.findByEmail = async function (email) {
  // ...
};

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
