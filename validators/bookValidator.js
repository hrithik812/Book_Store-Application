const { checkSchema, validationResult } = require("express-validator");
const knex = require("../db/db"); // Import your Knex instance

// Validation schema for book
const bookValidator = checkSchema({
  title: {
    isString: true,
    notEmpty: {
      errorMessage: "Title is required and should be a non-empty string.",
    },
  },
  description: {
    optional: true,
    isString: true,
    errorMessage: "Description should be a valid text string.",
  },
  published_date: {
    isDate: true,
    errorMessage:
      "Published date must be a valid date in the format YYYY-MM-DD.",
  },
  author_id: {
    isInt: true,
    custom: {
      options: async (value) => {
        // Query the database to check if the author exists
        const authorExists = await knex("authors").where({ id: value }).first();
        if (!authorExists) {
          throw new Error("Author ID does not exist");
        }
        return true;
      },
    },
    errorMessage:
      "Author ID must be a valid integer and reference an existing author.",
  },
});

// Middleware to handle validation results
const validateBookRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { bookValidator, validateBookRequest };
