import * as ctx from '../../../../tests/setup';
import _ from 'lodash';

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
        globalPermissions
    }
}`
describe("ME", () => {

    it('Me query should return a not authorized message without user context', async() => {
        const response = await ctx.mockCall(ME_QUERY);
        expect(response.data.me).toBeNull();
        expect(response.errors[0].message).toEqual("Not Authorized");
    });

    it('Me query should return user object produced from request context', async() => {
        // assumes the user is extracted from the token and applied to context
        const user = await ctx.db('users').where({id:1}).first()
        const response = await ctx.mockCall(ME_QUERY, {}, {currentUser:user})
        // convert pk int id to string for gql response
        expect(response.data.me.id).toBe(user.id.toString());
        expect(response.data.me.first_name).toBe(user.first_name);
    });
    it('Me query should return empty array for global permissions when no permissions exist', async () => {
        const user = await ctx.db('users').where({id:1}).first()
        const response = await ctx.mockCall(ME_QUERY, {}, {currentUser:user})
        // convert pk int id to string for gql response
        expect(response.data.me.id).toBe(user.id.toString());
        expect(response.data.me.first_name).toBe(user.first_name);
        expect(response.data.me.globalPermissions.length).toBe(0);
    });
    it('it should return a list of global permissions for users with global permissions', async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const addPerms = await ctx.db('global_permissions').insert({user_id: user.id, permission: "ADMIN"})
        const response = await ctx.mockCall(ME_QUERY, {}, {currentUser:user})
        // convert pk int id to string for gql response
        expect(response.data.me.id).toBe(user.id.toString());
        expect(response.data.me.first_name).toBe(user.first_name);
        expect(_.includes(response.data.me.globalPermissions, "ADMIN")).toBe(true)
    });
    it('it should return normal data and throw an error when returning inaccurate permission enum type', async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const addPerms = await ctx.db('global_permissions').insert({user_id: user.id, permission: "blah"})
        const response = await ctx.mockCall(ME_QUERY, {}, {currentUser:user})
        // convert pk int id to string for gql response
        expect(response.data.me.id).toBe(user.id.toString());
        expect(response.data.me.first_name).toBe(user.first_name);
        expect(response.errors.length >= 1).toBe(true);
    });

})