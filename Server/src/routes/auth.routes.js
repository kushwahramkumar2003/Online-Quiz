// Initialize express router
const express = require("express");
const routes = express.Router();
const {
  signup,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/auth.controllers.js");

const {
  isAuthenticated,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

// Register a new user
routes.post("/register", signup);

// User login
routes.post("/login", login);

// Logout the user
routes.get("/logout", isAuthenticated, logout);

// Request password reset
routes.post("/reset-password", requestPasswordReset);

// Reset password with token
routes.post("/reset-password/:token", resetPassword);

module.exports = routes;
