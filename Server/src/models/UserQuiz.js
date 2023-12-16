const mongoose = require("mongoose");

const userQuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  answers: {
    type: Map,
    of: String,
    default: {},
  },
  startTime: Date,
  endTime: Date,
  // Add other user-specific fields as needed
});

const UserQuiz = mongoose.model("UserQuiz", userQuizSchema);

module.exports = UserQuiz;
