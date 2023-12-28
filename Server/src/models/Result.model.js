const mongoose = require("mongoose");
const Feedback = require("./Feedback.model.js");
// const Quiz = require("./Quiz.model.js");
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
      type: Map,
      required: true,
    },
    percentage: {
      type: Number,
    },
    performance: {
      type: String,
      enum: ["Poor", "Average", "Good", "Excellent"],
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtual fields in JSON output
  }
);

// Update the user's score before saving

// resultSchema.pre("save", async function (next) {
//   const Quiz = mongoose.model("Quiz");

//   const result = this;
//   const user = await User.findById(result.user);
//   user.score += result.score;
//   const quiz = await Quiz.findById(this.quiz).populate("questions").exec();
//   await user.save();
//   console.log("quiz : ", quiz);
//   this.percentage = (this.score / quiz.questions.length) * 100;
//   next();
// });

// Log the result details after saving
// resultSchema.post("save", function (doc, next) {
//   console.log("Result saved:", doc);
//   next();
// });

// Delete the feedback of the result before deleting the result
// resultSchema.pre("deleteOne", { document: true }, async function (next) {
//   const result = this;
//   await Feedback.deleteMany({ result: result._id });
//   next();
// });

// Calculate the percentage of the score
resultSchema.methods.calculatePercentage = function () {
  const result = this;
  return (result.score / result.quiz.questions.length) * 100;
};

// Find the results by user and quiz

// resultSchema.statics.findByUserAndQuiz = async function (user, quiz) {
//   const results = await Result.find({ user, quiz });
//   return results;
// };

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
