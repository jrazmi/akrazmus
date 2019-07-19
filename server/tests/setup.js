process.env.NODE_ENV = 'test';

export const db = require('./testDB.js');

export const before = async() => {
    let rollback = await db.migrate.rollback();
    let migrate = await db.migrate.latest();
    let seed = await db.seed.run()
    console.log(seed)
    return
}

export const after = async() => {
   let rollback = await db.migrate.rollback();
   return
}