const express = require("express");
const router = express.Router();
const {
  getAllResults,
  getResultById,
} = require("../controllers/result.controllers.js");

// GET all results for the current user
router.get("/results", getAllResults);

// GET a specific result by ID for the current user
router.get("/results/:id", getResultById);

module.exports = router;
