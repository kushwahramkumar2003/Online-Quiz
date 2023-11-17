const express = require("express");
const routes = express.Router();

// Importing the controller functions
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controllers.js");

// Routes
routes.get("/profile", getProfile);
routes.put("/profile/update", updateProfile);
routes.delete("/profile/delete", deleteProfile);

module.exports = routes;
