// Importing required packages and models
const express = require("express");
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuizById,
  deleteQuizById,
  getQuizForAttempt,
  submitQuizAnswers,
  getQuizResults,
  addQuestionToQuiz,
  updateQuestionById,
  getRemainingTime,
  getQuizResultsForUser,
  deleteQuestionById,
  updateQuizPublishStatus,
} = require("../controllers/quiz.controllers.js");
const {
  isAdmin,
  isAuthenticated,
} = require("../middlewares/auth.middlewares.js");
const limiter = require("../middlewares/rateLimit.middlewares.js");

// GET all quizzes
router.get("/", getAllQuizzes);

// GET a specific quiz by ID
router.get("/:id", getQuizById);

// POST - Create a new quiz
router.post("/create", isAuthenticated, isAdmin, createQuiz);

// POST - Add a question to a quiz
router.post(
  "/create/addQuestion/:quizId",
  isAuthenticated,
  isAdmin,
  addQuestionToQuiz
);

// PUT - Update an existing quiz by ID
router.put("/:id/update", isAuthenticated, isAdmin, updateQuizById);

// DELETE - Delete a quiz by ID
router.delete("/:id/delete", isAuthenticated, isAdmin, deleteQuizById);

// DELETE - Delete a question from a quiz by quiz ID and question ID
router.delete(
  "/:quizId/question/:questionId/delete",
  isAuthenticated,
  isAdmin,
  deleteQuestionById
);

// GET - Retrieve a specific quiz for users to attempt
router.get("/:id/attempt", isAuthenticated, getQuizForAttempt);

// POST - Submit answers for a specific quiz
router.post("/:id/submit", isAuthenticated, submitQuizAnswers);

// GET - Fetch results of a specific quiz
router.get("/:id/results", isAuthenticated, getQuizResults);

// PUT - Update a question in a quiz by quiz ID and question ID
router.put(
  "/:quizId/question/:questionId/update",
  isAuthenticated,
  isAdmin,
  updateQuestionById
);

//GET - Fetch remaining time for quiz
router.get("/:id/time", isAuthenticated, getRemainingTime);

//GET - Get quiz results for a user
router.get(
  "/:id/results/:userId",
  isAuthenticated,
  isAdmin,
  getQuizResultsForUser
);

//PUT - Update quiz publish status
router.put(
  "/:quizId/publish",
  isAuthenticated,
  isAdmin,
  limiter({ time: 10, limit: 5 }),
  updateQuizPublishStatus
);

// Exporting the router
module.exports = router;
