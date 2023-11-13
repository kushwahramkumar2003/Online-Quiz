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
} = require("../controllers/quiz.controllers.js");
const {
  isAdmin,
  isAuthenticated,
} = require("../middlewares/auth.middlewares.js");

// GET all quizzes
router.get("/", getAllQuizzes);

// GET a specific quiz by ID
router.get("/:id", getQuizById);

// POST - Create a new quiz
router.post("/create", isAuthenticated, isAdmin, createQuiz);

router.post(
  "/create/addQuestion/:quizId",
  isAuthenticated,
  isAdmin,
  addQuestionToQuiz
);

// PUT - Update an existing quiz by ID
router.put("/:id/update", isAdmin, updateQuizById);

// DELETE - Delete a quiz by ID
router.delete("/:id/delete", isAdmin, deleteQuizById);

// GET - Retrieve a specific quiz for users to attempt
router.get("/:id/take", getQuizForAttempt);

// POST - Submit answers for a specific quiz
router.post("/:id/submit", submitQuizAnswers);

// GET - Fetch results of a specific quiz
router.get("/:id/results", getQuizResults);

module.exports = router;
