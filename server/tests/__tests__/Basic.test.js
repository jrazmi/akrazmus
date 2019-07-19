import * as ctx from '../setup';

beforeEach(async () => {
    await ctx.before();
})
afterEach(async () => {
    await ctx.after();
});
  
describe("Init", () => {

    it('It runs!', async() => {
        console.log(await ctx.db('users').select().returning('*'))
        console.log('its running!')
        expect(true).toBe(true);
    })
})