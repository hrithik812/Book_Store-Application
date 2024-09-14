// middleware/errorHandler.js
const { validationResult } = require("express-validator");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  // Handle express-validator errors
  if (err instanceof Array && err.length > 0 && err[0].msg) {
    return res.status(400).json({ errors: err.map((e) => e.msg) });
  }

  if (err.name === "KnexTimeoutError") {
    return res.status(503).json({ error: "Database connection timed out" });
  }

  // Generic fallback for unexpected errors
  res.status(500).json({
    error: "An internal server error occurred",
    message: err.message,
  });
};

module.exports = errorHandler;
