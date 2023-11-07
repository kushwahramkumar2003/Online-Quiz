const rateLimit = require("express-rate-limit");

// create a rate limiter middleware with a limit of 100 requests per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = limiter;
