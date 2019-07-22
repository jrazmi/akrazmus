import { fakeUser } from '../../../tests/models';


exports.seed = async(knex) => {
  await knex('users').del();
  const user1 = await fakeUser(1);
  const user2 = await fakeUser(2);
  await knex('users').insert([
    user1,
    user2
  ]);

  // seeds don't increment sequence for some silly reason?  so manually set user sequence
  await knex.raw('select setval(\'users_id_seq\', max(id)) from users');
}