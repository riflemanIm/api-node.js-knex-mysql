exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("translations")
    .createTable("translations", (table) => {
      table.increments("id").unsigned().primary();
      table.integer("account_id").unsigned().notNullable();
      // .references("account_id")
      // .inTable("account")
      // .index();

      table.string("pname").notNullable();
      table.string("lang").notNullable();
      table.string("gkey").notNullable();
      table.string("tkey").notNullable();
      table.string("tvalue").notNullable();
      table.unique(["pname", "lang", "gkey", "tkey", "tvalue"]);
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("translations");
};
