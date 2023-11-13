const Quiz = require("../models/Quiz.model.js");
const Question = require("../models/Question.model.js");
const { ObjectId } = require("bson");
const asyncHandler = require("./../services/asyncHandler.js");

/**********************************************************************
 * @desc    Create a quiz
 * @route   POST /api/v1/quiz/create
 * @access  Private/Admin
 * @kushwahramkumar2003
 **********************************************************************/
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
  const quizzes = await Quiz.find({}, { questions: 0 }).populate().exec();
  res.json(quizzes);
});

/*************************************************************************
 * @desc    Get quiz by ID
 * @route   GET /api/v1/quiz/:id
 * @access  Public
 * @kushwahramkumar2003
 *************************************************************************/
exports.getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate("questions", "text options")
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
