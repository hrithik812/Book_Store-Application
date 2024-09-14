// validators/authorValidator.js
const { checkSchema, validationResult } = require("express-validator");

const authorValidator = checkSchema({
  name: {
    notEmpty: true,
    errorMessage: "Name is required and should be a non-empty string.",
  },
  bio: {
    optional: true,
    isString: true,
    errorMessage: "Bio should be a valid text string.",
  },
  birthdate: {
    isDate: true,
    errorMessage: "Birthdate must be a valid date.",
  },
});

const validateAuthorRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { authorValidator, validateAuthorRequest };
