const rateLimit = require("express-rate-limit");

// create a rate limiter middleware with a limit of 100 requests per hour
const limiter = ({ time, limit }) => {
  return rateLimit({
    windowMs: time * 60 * 1000,
    max: limit, // limit each IP to 100 requests per windowMs
  });
};

module.exports = limiter;
