import { fakeUser } from '../../../tests/models';


exports.seed = async(knex) => {
  await knex('users').del();
  const user1 = await fakeUser(1);
  const user2 = await fakeUser(2);
  return knex('users').insert([
    user1,
    user2
  ])
}