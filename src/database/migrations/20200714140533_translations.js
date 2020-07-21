exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("translations")
    .createTable("translations", (table) => {
      table.charset("utf8");
      table.collate("utf8_general_ci");
      table.increments("id").unsigned().primary();
      table.integer("account_id").unsigned().notNullable().index();

      // .references("account_id")
      // .inTable("account")
      // .index();

      table.string("pname").notNullable();
      table.string("gkey").notNullable();
      table.string("tkey").notNullable();

      table.text("lang_ru").notNullable();
      table.boolean("checked_ru").notNullable().defaultTo(true);
      table.text("lang_en").notNullable();
      table.boolean("checked_en").notNullable().defaultTo(true);
      table.text("lang_fr").notNullable();
      table.boolean("checked_fr").notNullable().defaultTo(true);
      table.unique(["pname", "gkey", "tkey"]);
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("translations");
};
