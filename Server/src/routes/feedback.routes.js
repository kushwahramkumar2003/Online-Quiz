const express = require("express");
const { sendFeedback } = require("../controllers/feedback.controllers");
const router = express.Router();

// GET all results for the current user
router.post("/submit", sendFeedback);

module.exports = router;
