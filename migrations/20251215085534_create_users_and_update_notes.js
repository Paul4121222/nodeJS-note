/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("password").notNullable();
    table.string("username").notNullable();
    //auto create created_at / updated_at
    // first: 要不要用時區, sec: 要不要用當前時間當預設
    table.timestamp(true, true);
  });

  await knex.schema.alterTable("notes", (t) => {
    t.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("notes", (t) => {
    t.dropColumn("user_id");
  });
  await knex.schema.dropTable("users");
};
