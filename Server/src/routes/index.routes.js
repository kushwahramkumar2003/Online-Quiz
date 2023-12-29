const express = require("express");
const routes = express.Router();
const authRoutes = require("./auth.routes.js");
const profileRoutes = require("./profile.routes.js");
const quizRoutes = require("./quiz.routes.js");
const resultRoutes = require("./result.routes.js");
const userQuizRoutes = require("./userQuiz.routes.js");
const feedbackRoutes = require("./feedback.routes.js");
const {
  isAuthenticated,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

routes.use("/auth", authRoutes);
routes.use("/profile", isAuthenticated, profileRoutes);
routes.use("/quiz", isAuthenticated, quizRoutes);
routes.use("/result", isAuthenticated, resultRoutes);
routes.use("/userQuiz", isAuthenticated, userQuizRoutes);
routes.use("/feedback", isAuthenticated, feedbackRoutes);

module.exports = routes;
