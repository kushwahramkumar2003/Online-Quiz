const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Check for duplicate email
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

// Delete the results of the user before deleting the user
userSchema.pre("deleteOne", { document: true }, async function (next) {
  const user = this;
  await Result.deleteMany({ user: user._id });
  next();
});

// Compare the password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// Generate a JWT for the user
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, role: user.role }, "secret");
  return token;
};

// Find a user by email and password
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return user;
};

// Find a user by email and send a password reset email
userSchema.statics.sendPasswordResetEmail = async function (email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "1h" });
  // Send email with password reset link containing token
};

// Reset the user's password
userSchema.statics.resetPassword = async function (token, newPassword) {
  const decoded = jwt.verify(token, "secret");
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new Error("User not found");
  }
  user.password = newPassword;
  await user.save();
};

// Create a login session for the user
userSchema.methods.createSession = async function () {
  const user = this;
  const session = await Session.create({ user: user._id });
  return session;
};

const User = mongoose.model("User", userSchema);
