const dotenv = require("dotenv");
dotenv.config();

const config = {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/quiz-app",
  PORT: process.env.PORT || 3001,

  JWT_SECRET: process.env.JWT_SECRET || "thisisasecret",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "1d",

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  FROM_NAME: process.env.FROM_NAME,
};

module.exports = config;
