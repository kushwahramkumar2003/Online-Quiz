const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0; // At least one question per quiz
      },
      message: "Questions must have at least one item",
    },
  },
});

// Increment the times_taken field before saving
quizSchema.pre("save", async function (next) {
  const quiz = this;
  quiz.times_taken += 1;
  next();
});

// Log the quiz title after saving
quizSchema.post("save", function (doc, next) {
  console.log("Quiz saved:", doc.title);
  next();
});

// Delete the results of the quiz before deleting the quiz
quizSchema.pre("deleteOne", { document: true }, async function (next) {
  const quiz = this;
  await Result.deleteMany({ quiz: quiz._id });
  next();
});

// Check if the user's answers are correct and return the score
quizSchema.methods.checkAnswers = function (answers) {
  const quiz = this;
  let score = 0;
  for (let i = 0; i < quiz.questions.length; i++) {
    if (answers[i] === quiz.questions[i].answer) {
      score++;
    }
  }
  return score;
};

// Find a quiz by category and title
quizSchema.statics.findByCategoryAndTitle = async function (category, title) {
  const quiz = await Quiz.findOne({ category, title });
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  return quiz;
};

const Quiz = mongoose.model("Quiz", quizSchema);
