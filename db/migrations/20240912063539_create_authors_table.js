/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("authors", (table) => {
    table.increments("id").primary(); // Primary key, auto-increment
    table.string("name").notNullable(); // Required string for author name
    table.text("bio").nullable(); // Optional bio text
    table.date("birthdate").notNullable(); // Required date for birthdate
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable("authors").then((exists) => {
    if (exists) {
      return knex.schema.dropTable("authors");
    }
  });
};
