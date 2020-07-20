exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("translations")
    .createTable("translations", (table) => {
      table.increments("id").unsigned().primary();
      table.integer("account_id").unsigned().notNullable().index();

      // .references("account_id")
      // .inTable("account")
      // .index();

      table.string("pname").notNullable();
      table.string("gkey").notNullable();
      table.string("tkey").notNullable();

      table.string("lang_ru").notNullable();
      table.boolean("checked_ru").notNullable().defaultTo(false);
      table.string("lang_en").notNullable();
      table.boolean("checked_en").notNullable().defaultTo(false);
      table.string("lang_fr").notNullable();
      table.boolean("checked_fr").notNullable().defaultTo(false);
      table.unique(["pname", "gkey", "tkey"]);
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("translations");
};
