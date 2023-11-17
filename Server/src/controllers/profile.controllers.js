const asyncHandler = require("./../services/asyncHandler.js");
const Profile = require("../models/Profile.model.js");

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  res.json(profile);
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  profile.name = req.body.name || profile.name;
  profile.email = req.body.email || profile.email;
  profile.bio = req.body.bio || profile.bio;
  const updatedProfile = await profile.save();
  res.json(updatedProfile);
});

// @desc    Delete user profile
// @route   DELETE /api/profile
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  await profile.remove();
  res.json({ message: "Profile removed" });
});
