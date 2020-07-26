exports.up = function (knex) {
  knex.schema.alterTable("account", (table) => {
    table.string("role", 35).notNullable().alter();
  });
};

exports.down = function (knex) {};
