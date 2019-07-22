import * as ctx from '../../../../tests/setup';

beforeEach(async () => {
    return await ctx.before();
})
afterEach(async () => {
    return await ctx.after();
});

const ME_QUERY =`{
    me{
        id
        first_name
        last_name
        email
    }
}`
describe("ME", () => {

    it('Me query should return a not authorized message without user context', async() => {
        const response = await ctx.mockCall(ME_QUERY);
        expect(response.data.me).toBeNull();
        expect(response.errors[0].message).toEqual("Not Authorized");
        expect(true).toBe(true);
    });

    it('Me query should return user object produced from request context', async() => {
        // assumes the user is extracted from the token and applied to context
        const user = await ctx.db('users').where({id:1}).first()
        const response = await ctx.mockCall(ME_QUERY, {}, {currentUser:user})
        // convert pk int id to string for gql response
        expect(response.data.me.id).toBe(user.id.toString());
        expect(response.data.me.first_name).toBe(user.first_name);
    })

})