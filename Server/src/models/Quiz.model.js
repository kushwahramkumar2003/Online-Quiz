const mongoose = require("mongoose");

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
});

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
        return value.length >= 0; // At least one question per quiz
      },
      message: "Questions must have at least one item",
    },
  },
  times_taken: {
    type: Number,
    default: 0,
  },
  id: {
    type: Number,
    default: 0,
  },
});

// Increment the times_taken field before saving
quizSchema.pre("save", async function (next) {
  const quiz = this;
  quiz.times_taken += 1;
  if (!quiz.isNew) {
    return next();
  }
  const count = await Quiz.countDocuments();
  console.log("count", count);
  quiz.id = count + 1;
  next();
});

// quizSchema.pre("save", async function (next) {
//   const quiz = this;

//   next();
// });

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

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
