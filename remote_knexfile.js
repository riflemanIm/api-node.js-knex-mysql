module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "openvpn.ru",
      user: "beta2ope_n",
      password: "QQR5X5JqsnIX",
      database: "heyo",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
