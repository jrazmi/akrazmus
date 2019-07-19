exports.up = knex =>
knex.schema.createTable('users', function (table) {
  table.increments('id').primary();
  table.string('first_name');
  table.string('last_name');
  table.string('email').unique().notNullable();
  table.string('password', 255);
  table.boolean('deleted').defaultTo(false);
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists('users');

