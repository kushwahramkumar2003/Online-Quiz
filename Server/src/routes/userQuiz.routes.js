// Importing required packages and models
const express = require("express");
const router = express.Router();
const {
  startQuiz,
  submitQuiz,
  startQuizTimer,
  submitAnswer,
  finishQuiz,
  getQuizByIdForUser,
  getResultByQuizIdAndResultIdAndUserId,
} = require("../controllers/userQuiz.controllers.js");
const {
  isAdmin,
  isAuthenticated,
} = require("../middlewares/auth.middlewares.js");

// router.get("/:quizId/start", startQuiz);
router.post("/:quizId/submit", submitQuiz);
router.post("/submitAnswer", submitAnswer);
router.post("/:quizId/finishQuiz", finishQuiz);
router.get("/:quizId", getQuizByIdForUser);
router.get("/result/:quizId/:resultId", getResultByQuizIdAndResultIdAndUserId);

module.exports = router;
