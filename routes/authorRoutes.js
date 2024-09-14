const express = require("express");

const router = express.Router();

const authorsController = require("../controller/authorController");

const {
  authorValidator,
  validateAuthorRequest,
} = require("../validators/authorValidator");

router.get("/", authorsController.getAllAuthors);

// GET /authors/:id: Retrieve details of a single author
router.get("/:id", authorsController.getAuthorById);

// POST /authors: Create a new author
router.post(
  "/",
  authorValidator,
  validateAuthorRequest,
  authorsController.createAuthor
);

// PUT /authors/:id: Update an existing author
router.put(
  "/:id",
  authorValidator,
  validateAuthorRequest,
  authorsController.updateAuthor
);

// DELETE /authors/:id: Delete an author
router.delete("/:id", authorsController.deleteAuthor);
module.exports = router;
