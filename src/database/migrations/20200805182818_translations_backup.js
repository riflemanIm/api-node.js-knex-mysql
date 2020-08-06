exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("translations_backup")
    .createTable("translations_backup", (table) => {
      table.charset("utf8");
      table.collate("utf8_bin");
      table.integer("id").unsigned().notNullable();
      table.integer("account_id").unsigned().notNullable();

      table.string("pname").notNullable();
      table.string("gkey").notNullable();
      table.string("tkey").notNullable();

      table.text("lang_ru");
      table.boolean("checked_ru").notNullable();
      table.text("lang_en");
      table.boolean("checked_en").notNullable();
      table.text("lang_fr");
      table.boolean("checked_fr").notNullable();

      table.timestamps(false, true);
      table.timestamp("backuped_at").defaultTo(knex.fn.now());
      table.unique(["pname", "gkey", "tkey", "backuped_at"]);
    });
};

exports.down = function (knex) {
  //return knex.schema.dropTableIfExists("translations");
};
