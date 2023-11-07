const dotenv = require("dotenv");
dotenv.config();

const config = {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/quiz-app",
  PORT: process.env.PORT || 3001,
};

module.exports = config;
