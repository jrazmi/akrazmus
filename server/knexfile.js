require("dotenv").config();

module.exports = {
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },
  development: {
    debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    }
  },
  production: {
    client: "pg",
    connection: process.env.PRODUCTION_DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    }
  }
};