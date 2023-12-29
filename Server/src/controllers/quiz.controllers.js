const Quiz = require("../models/Quiz.model.js");
const Question = require("../models/Question.model.js");
const QuizResult = require("../models/Result.model.js");
const asyncHandler = require("./../services/asyncHandler.js");

/**********************************************************************
 * @desc    Create a quiz with title, description and category
 * @route   POST /api/v1/quiz/create
 * @access  Private/Admin
 * @kushwahramkumar2003
 **********************************************************************/
exports.createQuiz = asyncHandler(async (req, res) => {
  const { title, description, category, duration, level } = req.body;

  console.log("req.body : ", req.body);

  if (!title || !description || !category || !duration || !level) {
    res.status(400);
    throw new Error("Title, Description and category are required");
  }

  const quiz = new Quiz({
    title,
    description,
    category,
    duration,
    difficulty: level,
    createdBy: req.user._id,
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

/************************************************************************
 * @desc    Add a new question to a quiz
 * @route   POST /api/v1/quiz//create/addQuestion/:_id
 * @access  Private/Admin
 * @kushwahramkumar2003
 *************************************************************************/

exports.addQuestionToQuiz = asyncHandler(async (req, res) => {
  console.log("Reached addQuestionToQuiz");
  const quizId = req.params.quizId;
  // console.log("quizId : ", quizId);
  if (!quizId) {
    res.status(401).json({
      success: false,
      message: "Must have QuizId",
    });
  }

  // const myObjectId = new ObjectId(quizId);
  // console.log("myObjectId : ", myObjectId);
  const quiz = await Quiz.findById({ _id: quizId });
  // console.log("quiz : ", quiz);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  const { question, options, correctAnswer } = req.body;

  // Validate request body
  if (!question || !options || !correctAnswer) {
    res.status(400);
    throw new Error("Missing required fields");
  }
  console.log("Options :", options);

  if (options.length !== 4) {
    res.status(401).json({
      success: false,
      message: "Options must have 4 options",
    });
  }
  console.log("Reached addQuestionToQuiz 2");
  // Create new question
  const newQuestion = new Question({
    text: question,
    options,
    answer: correctAnswer,
    quiz: quiz._id,
  });

  console.log("newQuestion : ", newQuestion);

  // Save new question to database
  await newQuestion.save();

  // Add new question to quiz
  quiz.questions.push(newQuestion._id);
  await quiz.save();
  console.log("Reached addQuestionToQuiz 3");

  res.status(201).json({
    success: true,
    data: newQuestion,
  });
});

/**************************************************************************
 * @desc    Get all quizzes
 * @route  GET /api/v1/quiz
 * @access  Public
 * @kushwahramkumar2003
 **************************************************************************/
exports.getAllQuizzes = asyncHandler(async (req, res) => {
  if (req.user.role === "USER") {
    const quizzes = await Quiz.find({ published: true }).populate().exec();
    res.json(quizzes);
  } else {
    const quizzes = await Quiz.find({}).populate().exec();
    res.json(quizzes);
  }
});

/*************************************************************************
 * @desc    Get quiz by ID
 * @route   GET /api/v1/quiz/:id
 * @access  Public
 * @kushwahramkumar2003
 *************************************************************************/
exports.getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate("questions", "text options answer")
    .exec();
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

/*************************************************************************
 * @desc    Update a quiz by ID
 * @route   PUT /api/v1/quiz/:id/update
 * @access  Private/Admin
 * @kushwahramkumar2003
 *************************************************************************/
exports.updateQuizById = asyncHandler(async (req, res) => {
  let { title, description, category } = req.body;
  const id = req.params.id;

  if (!id) {
    res.status(401).json({
      success: false,
      message: "Must have QuizId",
    });
  }

  const quiz = await Quiz.findById(id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  quiz.title = title || quiz.title;
  quiz.description = description || quiz.description;
  quiz.category = category || quiz.category;

  const updatedQuiz = await quiz.save();

  res.status(200).json({
    success: true,
    data: updatedQuiz,
  });
});

/*************************************************************************
 * @desc    Update a question by Quiz ID and Question ID
 * @route   PUT /api/v1/quiz/:quizId/question/:questionId/update
 * @access  Private/Admin
 * @kushwahramkumar2003
 *************************************************************************/
exports.updateQuestionById = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  const questionId = req.params.questionId;
  if (!quizId || !questionId) {
    res.status(401).json({
      success: false,
      message: "Must have QuizId or QuestionId",
    });
  }
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  const question = await Question.findById(questionId);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  question.text = req.body.question || question.title;
  question.options = req.body.options || question.options;
  question.answer = req.body.correctAnswer || question.correctOption;

  const updatedQuestion = await question.save();

  res.status(200).json({
    success: true,
    data: updatedQuestion,
  });
});

/*************************************************************************
 * @desc    Delete a quiz by ID
 * @route   DELETE api/v1/quiz/:id/delete
 * @access  Private/Admin
 * @kushwahramkumar2003
 *************************************************************************/
exports.deleteQuizById = asyncHandler(async (req, res) => {
  const quizId = req.params.id;

  // Delete all questions corresponding to the quiz
  await Question.deleteMany({ quiz: quizId });

  // Delete all results corresponding to the quiz
  await QuizResult.deleteMany({ quiz: quizId });

  // Delete the quiz itself
  // await Quiz.findByIdAndDelete(quizId);
  await Quiz.deleteOne({ _id: quizId });

  res.status(200).json({ success: true, message: "Quiz deleted successfully" });
});

/*************************************************************************
 * @desc    Delete a question by ID
 * @route   DELETE api/v1/quiz/:quizId/question/:questionId/delete
 * @access  Private/Admin
 * @kushwahramkumar2003
 *************************************************************************/
exports.deleteQuestionById = asyncHandler(async (req, res) => {
  const { quizId, questionId } = req.params;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(404).json({ success: false, message: "Quiz not found" });
  }

  const question = await Question.findOneAndDelete(questionId);

  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  let questionArr = quiz.questions;

  const newQuestionArr = questionArr.filter((question) => {
    return question.toString() !== questionId;
  });

  quiz.questions = newQuestionArr;

  await quiz.save();

  res
    .status(200)
    .json({ success: true, message: "Question deleted successfully" });
});

/*************************************************************************
 * @desc    Get quiz for attempt
 * @route   GET /api/quizzes/:id/attempt
 * @access  Public
 *************************************************************************/
exports.getQuizForAttempt = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate({
    path: "questions",
    select: "-correctAnswer",
  });

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const { questions } = quiz;

  const quizForAttempt = questions.map((question) => {
    const { _id, questionText, options } = question;
    return {
      _id,
      questionText,
      options,
    };
  });

  res.status(200).json({ quiz: quizForAttempt });
});

/*************************************************************************
 * @desc    Submit quiz answers                                          *
 * @route   POST /api/quizzes/:id/submit                                 *
 * @access  Public                                                       *
 *************************************************************************/
exports.submitQuizAnswers = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const { answers } = req.body;

  const quiz = await Quiz.findById(quizId).populate("questions");

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const { questions } = quiz;

  let score = 0;

  const results = questions.map((question) => {
    const { _id, correctAnswer } = question;
    const userAnswer = answers[_id];

    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      score++;
    }

    return {
      questionId: _id,
      userAnswer,
      isCorrect,
    };
  });

  const totalQuestions = questions.length;
  const percentageScore = (score / totalQuestions) * 100;

  const quizResult = new QuizResult({
    quiz: quizId,
    user: req.user._id,
    score,
    totalQuestions,
    percentageScore,
    results,
  });

  await quizResult.save();

  res.status(200).json({ quizResult });
});

/*************************************************************************
 * @desc    Get quiz results                                             *
 * @route   GET /api/quizzes/:id/results                                 *
 * @access  Private/Admin                                                *
 *************************************************************************/
exports.getQuizResults = asyncHandler(async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const results = await QuizResult.find({ quiz: quiz._id }).populate(
      "user",
      "name email"
    );
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Update user's answer to a question
 * @route   PUT /api/quizzes/:quizId/questions/:questionId/answer
 * @access  Public
 *************************************************************************/
exports.updateUserAnswer = asyncHandler(async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { answer } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const userAnswer = await UserAnswer.findOneAndUpdate(
      { user: req.user._id, question: questionId },
      { answer },
      { new: true, upsert: true }
    );

    res.status(200).json({ userAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Get remaining time for quiz
 * @route   GET /api/quizzes/:id/time
 * @access  Public
 *************************************************************************/
exports.getRemainingTime = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const remainingTime = quiz.duration - (Date.now() - quiz.startTime);
    res.status(200).json({ remainingTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Automatically submit quiz when time is up
 * @route   POST /api/quizzes/:id/submit-on-time-up
 * @access  Public
 *************************************************************************/
exports.submitQuizOnTimeUp = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const remainingTime = quiz.duration - (Date.now() - quiz.startTime);
    if (remainingTime > 0) {
      return res.status(400).json({ message: "Quiz time has not expired yet" });
    }
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: "Answers not provided" });
    }
    const quizResults = new QuizResult({
      quiz: id,
      user: req.user._id,
      answers,
    });
    await quizResults.save();
    res.status(200).json({ message: "Quiz submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Get quiz results for a user
 * @route   GET /api/quizzes/:id/results/:userId
 * @access  Private/Admin
 *************************************************************************/
exports.getQuizResultsForUser = asyncHandler(async (req, res) => {
  try {
    const { id, userId } = req.params;
    const quizResults = await QuizResult.findOne({
      quiz: id,
      user: userId,
    }).populate("quiz", "title");
    if (!quizResults) {
      return res.status(404).json({ message: "Quiz results not found" });
    }
    res.status(200).json({ quizResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Get all results for a quiz
 * @route   GET /api/quizzes/:id/all-results
 * @access  Private/Admin
 *************************************************************************/
exports.getAllResultsForQuiz = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const quizResults = await QuizResult.find({ quiz: id }).populate(
      "user",
      "name email"
    );
    if (!quizResults) {
      return res.status(404).json({ message: "No quiz results found" });
    }
    res.status(200).json({ quizResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Get all quizzes created by a user
 * @route   GET /api/quizzes/user/:userId
 * @access  Private/Admin
 *************************************************************************/
exports.getQuizzesByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const quizzes = await Quiz.find({ user: userId });
    if (!quizzes) {
      return res.status(404).json({ message: "No quizzes found" });
    }
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Delete a quiz result by ID
 * @route   DELETE api/v1/quiz/results/:id/delete
 * @access  Private/Admin
 *************************************************************************/
exports.deleteQuizResultById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const quizResult = await QuizResult.findById(id);
    if (!quizResult) {
      return res.status(404).json({ message: "Quiz result not found" });
    }
    await quizResult.remove();
    res.status(200).json({ message: "Quiz result deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*************************************************************************
 * @desc    Delete all quiz results for a quiz
 * @route   DELETE api/v1/quiz/:id/results/delete
 * @access  Private/Admin
 *************************************************************************/
exports.deleteAllQuizResults = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const quizResults = await QuizResult.find({ quiz: id });
    if (!quizResults) {
      return res.status(404).json({ message: "No quiz results found" });
    }
    await QuizResult.deleteMany({ quiz: id });
    res.status(200).json({ message: "All quiz results deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

exports.updateQuizPublishStatus = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  const { publish } = req.body;

  if (!quizId) {
    res.status(401).json({
      success: false,
      message: "Must have QuizId",
    });
  }

  const quiz = await Quiz.findById({ _id: quizId });

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  quiz.published = publish || quiz.published;

  if (quiz.questions.length !== quiz.numberOfQuestions) {
    res.status(401).json({
      success: false,
      message: "Please add all questions",
    });
  }

  const updatedQuiz = await quiz.save();

  res.status(200).json({
    success: true,
    data: updatedQuiz,
  });
});
