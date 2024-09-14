// controllers/authorsController.js
const knex = require("../db/db");
const errorHandler = require("../middleware/errorHandler");

// GET /authors: Retrieve a list of all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await knex("authors").select("*");
    res.status(200).json(authors);
  } catch (err) {
    errorHandler(err);
  }
};

// GET /authors/:id: Retrieve details of a single author
exports.getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await knex("authors").where({ id }).first();
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    errorHandler(err);
  }
};

// POST /authors: Create a new author
exports.createAuthor = async (req, res) => {
  const { name, bio, birthdate } = req.body;

  if (!name || !birthdate) {
    return res.status(400).json({ error: "Name and birthdate are required" });
  }

  try {
    const [newAuthor] = await knex("authors")
      .insert({ name, bio, birthdate })
      .returning("*");
    res.status(201).json(newAuthor);
  } catch (err) {
    errorHandler(err);
  }
};

// PUT /authors/:id:
exports.updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, bio, birthdate } = req.body;

  try {
    const updated = await knex("authors")
      .where({ id })
      .update({ name, bio, birthdate });
    if (updated) {
      const updatedAuthor = await knex("authors").where({ id }).first();
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    errorHandler(err);
  }
};

// DELETE /authors/:id:
exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await knex("authors").where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: "Author deleted successfully" });
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    errorHandler(err);
  }
};
