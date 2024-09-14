/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("books", function (table) {
    table.increments("id").primary(); // Primary key, auto-increment
    table.string("title").notNullable(); // Required string for book title
    table.text("description").nullable(); // Optional text for description
    table.date("published_date").notNullable(); // Required date for published date

    // Foreign key referencing 'authors' table
    table.integer("author_id").unsigned().notNullable();
    table.foreign("author_id").references("authors.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
