const express = require("express");
const router = express.Router();

// Import all route files
const bookRoutes = require("./bookRoutes");
const authorRoutes = require("./authorRoutes");

// Mount routes
router.use("/books", bookRoutes); // Routes for books
router.use("/authors", authorRoutes); // Routes for authors

// Export the router
module.exports = router;
