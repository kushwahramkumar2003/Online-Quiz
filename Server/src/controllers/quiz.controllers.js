const Quiz = require("../models/Quiz.model.js");
const Question = require("../models/Question.model.js");
const asyncHandler = require("./../services/asyncHandler.js");

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({});
  res.json(quizzes);
});

// @desc    Get quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private/Admin
exports.createQuiz = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    throw new Error("Title, Description and category are required");
  }

  const quiz = new Quiz({
    title,
    description,
    category,
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

// @desc    Update a quiz by ID
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
exports.updateQuizById = asyncHandler(async (req, res) => {
  const { name, questions } = req.body;

  if (!name || !questions) {
    res.status(400);
    throw new Error("Name and questions are required");
  }

  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    quiz.name = name;
    quiz.questions = questions;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// @desc    Delete a quiz by ID
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
exports.deleteQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    await quiz.remove();
    res.json({ message: "Quiz removed" });
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// @desc    Get quiz for attempt
// @route   GET /api/quizzes/:id/attempt
// @access  Public
exports.getQuizForAttempt = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    const { name, questions } = quiz;
    const quizForAttempt = {
      name,
      questions: questions.map((question) => {
        const { _id, text, options } = question;
        return { _id, text, options };
      }),
    };
    res.json(quizForAttempt);
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Public
exports.submitQuizAnswers = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    const { answers } = req.body;
    const { questions } = quiz;
    const score = questions.reduce((totalScore, question, index) => {
      const correctAnswer = question.options.find((option) => option.isCorrect);
      const selectedAnswer = answers[index];
      if (correctAnswer._id === selectedAnswer) {
        return totalScore + 1;
      } else {
        return totalScore;
      }
    }, 0);
    res.json({ score });
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// @desc    Get quiz results
// @route   GET /api/quizzes/:id/results
// @access  Private/Admin
exports.getQuizResults = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    const { name, questions } = quiz;
    const results = await Promise.all(
      questions.map(async (question) => {
        const { _id, text } = question;
        const correctAnswer = question.options.find(
          (option) => option.isCorrect
        );
        const resultsForQuestion = await Quiz.aggregate([
          { $unwind: "$attempts" },
          {
            $match: {
              _id: quiz._id,
              "attempts.answers.questionId": question._id,
            },
          },
          {
            $group: {
              _id: "$attempts.answers.questionId",
              totalAttempts: { $sum: 1 },
              totalCorrect: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$attempts.answers.selectedOptionId",
                        correctAnswer._id,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ]);
        return {
          _id,
          text,
          results: resultsForQuestion[0],
        };
      })
    );
    res.json({ name, results });
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
});

// @desc    Add a new question to a quiz
// @route   POST /api/quizzes/:quizId/questions
// @access  Private/Admin
exports.addQuestionToQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  if (!quizId) {
    res.status(401).json({
      success: false,
      message: "Must have QuizId",
    });
  }
  const quiz = await Quiz.findById(quizId);

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

  if (options.length <= 0) {
    res.status(401).json({
      success: false,
      message: "Options must have 4 options",
    });
  }
  // Create new question
  const newQuestion = new Question({
    question,
    options,
    correctAnswer,
    quiz: quiz._id,
  });

  // Save new question to database
  await newQuestion.save();

  // Add new question to quiz
  quiz.questions.push(newQuestion._id);
  await quiz.save();

  res.status(201).json({
    success: true,
    data: newQuestion,
  });
});
