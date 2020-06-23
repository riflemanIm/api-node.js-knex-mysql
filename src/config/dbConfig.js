import knex from "knex";
import knexConfig from "../../knexfile";

import dotenv from "dotenv";
dotenv.config();

const environment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[environment]);
