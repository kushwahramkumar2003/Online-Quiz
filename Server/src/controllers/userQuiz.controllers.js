const Quiz = require("../models/Quiz.model.js");
const Question = require("../models/Question.model.js");
const UserQuiz = require("../models/UserQuiz.js");
const QuizResult = require("../models/Result.model.js");
const asyncHandler = require("../services/asyncHandler.js");

exports.getQuizByIdForUser = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  console.log("Backend Quiz id:", req.params.quizId);
  const quizData = await Quiz.findById(req.params.quizId)
    .populate("questions", "text options")
    .exec();

  if (quizData) {
    // console.log("Quiz data:", quizData);
    await this.startQuiz(req, res, quizData);
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// Inside your quiz controller or a dedicated timer service
const quizTimers = {}; // Keep track of timers for multiple quizzes

exports.startQuiz = async (req, res, quizData) => {
  const { quizId } = req.params;
  console.log("Quiz id:", quizId);

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check if the user has already started the quiz
    const userQuizAlredyStarted = await UserQuiz.findOne({
      userId: req.user._id,
      quizId,
    });

    if (userQuizAlredyStarted) {
      console.log("Reched here 1 ");
      return res.status(201).json({
        message: "User has already started the quiz",
        userQuizAlredyStarted,
        quizData,
      });
    }

    // Store user-specific quiz details in the database
    const userQuiz = new UserQuiz({
      userId: req.user._id, // Assuming you have user authentication middleware
      quizId,
      startTime: new Date(),
    });

    await userQuiz.save();

    // Other logic to start the quiz
    return res.json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const userQuiz = await UserQuiz.findOne({
      userId: req.user._id,
      quizId,
    });

    if (!userQuiz) {
      return res.status(404).json({ message: "Quiz not found for the user" });
    }

    userQuiz.endTime = new Date();
    await userQuiz.save();

    // Implement your logic to process the quiz submission
    // ...

    res.json({ message: "Quiz submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const startQuizTimer = (quizId, duration, req, res) => {
  quizTimers[quizId] = setTimeout(async () => {
    // Fetch user-specific quiz details from the database
    const userQuiz = await UserQuiz.findOne({
      userId: req.user._id,
      quiz: quizId,
    });

    if (userQuiz) {
      // Implement logic to automatically submit the quiz
      // This could involve calling your existing submitQuizAnswers controller
      // and generating the result on the backend
      console.log(`Automatic submission for quiz ${quizId}`);

      // Delete user-specific quiz details from the database
      await UserQuiz.deleteOne({ _id: userQuiz._id });
    }
  }, duration);
};

const stopQuizTimer = (quizId) => {
  clearTimeout(quizTimers[quizId]);
  delete quizTimers[quizId];
};

exports.submitAnswer = asyncHandler(async (req, res) => {
  const { quizId, questionId, answer } = req.body;

  // Find the quiz
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  // Find the question
  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  // Check if the user has started the quiz
  const userQuiz = await UserQuiz.findOne({
    userId: req.user._id,
    quizId,
  });

  if (!userQuiz) {
    return res.status(400).json({ message: "User has not started the quiz" });
  }

  // Update the user's answer to the question
  userQuiz.answers.set(questionId, answer);
  await userQuiz.save();

  res.status(200).json({ message: "Answer submitted successfully" });
});

// Controller to finish the quiz and calculate the result
exports.finishQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  // Find the quiz
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  // Find the user's quiz interaction
  const userQuiz = await UserQuiz.findOne({
    userId: req.user._id,
    quizId,
  });

  if (!userQuiz) {
    return res.status(400).json({ message: "User has not started the quiz" });
  }

  // Check if all questions are answered
  const answeredQuestionIds = Array.from(userQuiz.answers.keys());
  const allQuestionIds = quiz.questions.map((q) => q.toString());

  const unansweredQuestionIds = allQuestionIds.filter(
    (questionId) => !answeredQuestionIds.includes(questionId)
  );

  console.log("Unanswered questions:", unansweredQuestionIds.length);

  // if (unansweredQuestionIds?.length > 0) {
  //   return res.status(400).json({
  //     message: "Quiz cannot be finished until all questions are answered",
  //   });
  // }

  // Calculate the result
  let score = 0;

  const userAnswersMap = new Map();

  for (const [questionId, userAnswer] of userQuiz.answers.entries()) {
    userAnswersMap.set(questionId, userAnswer);

    const question = await Question.findById(questionId);

    if (question && question.answer === userAnswer) {
      score++;
    }
  }

  console.log("All question ids:", allQuestionIds.length);

  const totalQuestions = allQuestionIds.length;
  const percentageScore = (score / totalQuestions) * 100;

  const enm = ["Poor", "Average", "Good", "Excellent"];

  const performance =
    percentageScore >= 75
      ? enm[3]
      : percentageScore >= 50
        ? enm[2]
        : percentageScore >= 25
          ? enm[1]
          : enm[0];

  // Save the result

  const quizResult = new QuizResult({
    quiz: quizId,
    user: req.user._id,
    score,
    totalQuestions,
    percentage: percentageScore,
    answers: userAnswersMap,
    performance,
  });

  await quizResult.save();
  console.log("Score:", score);

  // Clear the user's quiz interaction
  await UserQuiz.deleteOne({ _id: userQuiz._id });

  res.status(200).json({
    message: "Quiz finished and result calculated successfully",
    result: quizResult,
  });
});

exports.getResultByQuizIdAndResultIdAndUserId = asyncHandler(
  async (req, res) => {
    const { quizId, resultId } = req.params;
    const userId = req.user._id;

    console.log("Quiz id:", quizId);
    console.log("Result id:", resultId);
    console.log("User id:", userId);

    const quizResult = await QuizResult.findOne({
      _id: resultId,
      quiz: quizId,
      user: userId,
    });

    if (!quizResult) {
      return res.status(404).json({ message: "Quiz result not found" });
    }

    res.json(quizResult);
  }
);
