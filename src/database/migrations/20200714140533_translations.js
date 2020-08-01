exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("translations")
    .createTable("translations", (table) => {
      table.charset("utf8");
      table.collate("utf8_bin");
      table.increments("id").unsigned().primary();
      table.integer("account_id").unsigned().notNullable().index();

      // .references("account_id")
      // .inTable("account")
      // .index();

      table.string("pname").notNullable();
      table.string("gkey").notNullable();
      table.string("tkey").notNullable();

      table.text("lang_ru");
      table.boolean("checked_ru").notNullable().defaultTo(false);
      table.text("lang_en");
      table.boolean("checked_en").notNullable().defaultTo(false);
      table.text("lang_fr");
      table.boolean("checked_fr").notNullable().defaultTo(false);
      table.unique(["pname", "gkey", "tkey"]);
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  //return knex.schema.dropTableIfExists("translations");
};
