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
} = require("../controllers/quiz.controllers.js");
const { isAdmin } = require("../middlewares/auth.middlewares.js");

// GET all quizzes
router.get("/quiz", getAllQuizzes);

// GET a specific quiz by ID
router.get("/quiz/:id", getQuizById);

// POST - Create a new quiz
router.post("/quiz/create", isAdmin, createQuiz);

// PUT - Update an existing quiz by ID
router.put("/quiz/:id/update", isAdmin, updateQuizById);

// DELETE - Delete a quiz by ID
router.delete("/quiz/:id/delete", isAdmin, deleteQuizById);

// GET - Retrieve a specific quiz for users to attempt
router.get("/quiz/:id/take", getQuizForAttempt);

// POST - Submit answers for a specific quiz
router.post("/quiz/:id/submit", submitQuizAnswers);

// GET - Fetch results of a specific quiz
router.get("/quiz/:id/results", getQuizResults);

module.exports = router;
