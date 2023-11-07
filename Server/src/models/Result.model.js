const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    answers: {
      type: [String],
      required: true,
    },
    percentage: {
      type: Number,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtual fields in JSON output
  }
);

// Update the user's score before saving
resultSchema.pre("save", async function (next) {
  const result = this;
  const user = await User.findById(result.user);
  user.score += result.score;
  await user.save();
  this.percentage = (this.score / this.quiz.questions.length) * 100;
  next();
});

// Log the result details after saving
resultSchema.post("save", function (doc, next) {
  console.log("Result saved:", doc);
  next();
});

// Delete the feedback of the result before deleting the result
resultSchema.pre("deleteOne", { document: true }, async function (next) {
  const result = this;
  await Feedback.deleteMany({ result: result._id });
  next();
});

// Calculate the percentage of the score
resultSchema.methods.calculatePercentage = function () {
  const result = this;
  return (result.score / result.quiz.questions.length) * 100;
};

// Find the results by user and quiz
resultSchema.statics.findByUserAndQuiz = async function (user, quiz) {
  const results = await Result.find({ user, quiz });
  return results;
};

const Result = mongoose.model("Result", resultSchema);
