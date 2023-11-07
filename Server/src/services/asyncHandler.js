const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log("error : ", error);
    // Define a function to check if the error code is a valid HTTP or HTTPS status code
    const isHttpStatusCode = (code) => code >= 100 && code < 600;

    // Handle errors from asyncHandler2 here and set appropriate HTTP or HTTPS status codes
    if (isHttpStatusCode(error.code)) {
      return res.status(error.code).json({
        success: false,
        message: error.message,
      });
    } else if (error.code >= 6000 && error.code < 7000) {
      // Assuming error codes in the range 6000-6999 are HTTPS status codes
      return res.status(error.code).json({
        success: false,
        message: error.message,
      });
    } else {
      // If it's not a valid HTTP or HTTPS status code, use a default 500 status code
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
module.exports = asyncHandler;
