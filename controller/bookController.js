const knex = require("../db/db");

// GET /books
exports.getBooks = async (req, res) => {
  const { author } = req.query;

  try {
    let booksQuery = knex("books").select("*");

    if (author) {
      booksQuery = booksQuery.where({ author_id: author });
    }

    const books = await booksQuery;

    res.status(200).json(books);
  } catch (err) {
    errorHandler(err);
  }
};

// GET /books/:id
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await knex("books").where({ id });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    errorHandler(err);
  }
};

// POST /books
exports.createBook = async (req, res) => {
  const { title, description, published_date, author_id } = req.body;

  if (!title || !published_date || !author_id) {
    return res
      .status(400)
      .json({ error: "Title, published date, and author ID are required" });
  }

  try {
    const [newBook] = await knex("books")
      .insert({ title, description, published_date, author_id })
      .returning("*");

    res.status(201).json(newBook);
  } catch (err) {
    errorHandler(err);
  }
};

// PUT /books/:id
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, published_date, author_id } = req.body;

  try {
    const updated = await knex("books")
      .where({ id })
      .update({ title, description, published_date, author_id });

    if (updated === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedBook = await knex("books").where({ id }).first();
    res.status(200).json(updatedBook);
  } catch (err) {
    errorHandler(err);
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("books").where({ id }).del();

    if (deleted === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(204).send(); // No content
  } catch (err) {
    errorHandler(err);
  }
};
