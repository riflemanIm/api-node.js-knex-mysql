const bcrypt = require("bcrypt");
const config = require("../../config/config");

exports.seed = function (knex) {
  const passHash = bcrypt.hashSync(config.admin_pass, config.bcrypt.saltRounds);

  // Deletes ALL existing entries

  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Oleg",
          last_name: "La",
          email: "oleg@la.com",
          password: passHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
