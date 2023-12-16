// Importing required packages and models
const express = require("express");
const router = express.Router();
const {
  startQuiz,
  submitQuiz,
  startQuizTimer,
  submitAnswer,
  finishQuiz,
} = require("../controllers/userQuiz.controllers.js");
const {
  isAdmin,
  isAuthenticated,
} = require("../middlewares/auth.middlewares.js");

router.get("/:quizId/start", startQuiz);
router.get("/:quizId/submit", submitQuiz);
router.post("/submitAnswer", submitAnswer);
router.post("/:quizId/finishQuiz", finishQuiz);

module.exports = router;
