const asyncHandler = require("./../services/asyncHandler.js");
const User = require("../models/User.model.js");
const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/index.js");

const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

// Signup controller
exports.signup = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }
  user = new User({
    name,
    email,
    password,
  });
  await user.save();

  user.password = undefined;
  const token = user.generateToken();
  res.cookie = ("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

// Login controller
exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  let user = await User.findOne(
    { email },
    { email: 1, password: 1, name: 1, role: 1 }
  );
  // console.log("user", user);
  if (!user) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await user.comparePassword(password);

  // console.log("isMatch", isMatch);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const token = user.generateToken();
  user.token = token;

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
  res.user = user;
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
});

// Logout controller
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});

// Request password reset controller
exports.requestPasswordReset = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "10m" },
    async (err, token) => {
      if (err) throw err;

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 600000; // 10 minutes

      await user.save();

      // Send email with reset link
      // ...

      res.json({ msg: "Password reset link sent to email" });
    }
  );
});

// Reset password controller
exports.resetPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;
  const { token } = req.params;

  let user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  res.json({ msg: "Password reset successful" });
});
