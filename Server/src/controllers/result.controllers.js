const asyncHandler = require("./../services/asyncHandler.js");
const Result = require("./../models/Result.model.js");

// @desc    Get all results
// @route   GET /api/results
// @access  Public
exports.getAllResults = asyncHandler(async (req, res) => {
  const results = await Result.find({});
  res.json(results);
});

// @desc    Get result by ID
// @route   GET /api/results/:id
// @access  Public
exports.getResultById = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);
  if (!result) {
    res.status(404);
    throw new Error("Result not found");
  }
  res.json(result);
});
