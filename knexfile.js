require("dotenv").config();

console.log("process.env.MYSQL_DEV_HOST", process.env.MYSQL_DEV_HOST);

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      user: process.env.MYSQL_DEV_USER,
      password: process.env.MYSQL_DEV_PASSWORD,
      database: process.env.MYSQL_DEV_DATABASE,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },
};
