const mongoose = require("mongoose");
const Result = require("./Result.model.js");
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 4; // Four options per question
      },
      message: "Options must have four items",
    },
  },
  answer: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return this.options.includes(value); // Answer must be one of the options
      },
      message: "Answer must be one of the options",
    },
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});

// Log the question text before saving
questionSchema.pre("save", function (next) {
  const question = this;
  console.log("Question saved:", question.text);
  next();
});

// Delete the results of the question before deleting the question
questionSchema.pre("deleteOne", { document: true }, async function (next) {
  const question = this;
  await Result.updateMany(
    { quiz: question.quiz },
    { $pull: { answers: question.answer } }
  );

  // Delete all questions corresponding to the quiz
  await Question.deleteMany({ quiz: this._id });

  // Delete all results corresponding to the quiz
  await Result.deleteMany({ quiz: this._id });

  next();
});

// Check if the user's answer is correct and return a boolean
questionSchema.methods.checkAnswer = function (answer) {
  const question = this;
  return answer === question.answer;
};

// Find a question by text and quiz
questionSchema.statics.findByTextAndQuiz = async function (text, quiz) {
  const question = await Question.findOne({ text, quiz });
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
};

questionSchema.virtual("correctAnswerIndex").get(function () {
  return this.options.indexOf(this.answer);
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
