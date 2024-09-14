// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const {
  bookValidator,
  validateBookRequest,
} = require("../validators/bookValidator");
// Define routes
router.get("/", bookController.getBooks); // GET /books
router.get("/:id", bookController.getBookById); // GET /books/:id
router.post("/", bookValidator, validateBookRequest, bookController.createBook); // POST /books
router.put(
  "/:id",
  bookValidator,
  validateBookRequest,
  bookController.updateBook
); // PUT /books/:id
router.delete("/:id", bookController.deleteBook); // DELETE /books/:id

module.exports = router;
