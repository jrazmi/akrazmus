require("dotenv").config();

const config = { 
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    },
    seeds: {
      directory: './db/seeds/test'
    }
}
module.exports = require('knex')(config);