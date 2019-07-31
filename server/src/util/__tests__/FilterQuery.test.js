import * as ctx from '../../../tests/setup';
import _ from "lodash";

beforeEach(async () => {
    await ctx.before();
    await ctx.db('users').del();

    await ctx.db('users').insert({
        first_name: "Foo",
        last_name: "Foos",
        email: "foo@foo.com",
        password: "cat"
    });
    await ctx.db('users').insert({
        first_name: "Bar",
        last_name: "Bars",
        email: "bar@bar.com",
        password: "cat"
    });
    await ctx.db('users').insert({
        first_name: "Baz",
        last_name: "Baz",
        email: "baz@baz.com",
        password: "cat"
    });
    return
});
afterEach(async () => {
    return await ctx.after();
})

const USERS_QUERY = `
    query users($input: UsersInput){
        users(input: $input) {
            hasMore
            totalCount
            items {
                id
                first_name
                last_name
                email
            }
        }
    }
`

describe("FilterQuery", () => {
    it('It should return a list of users when no arguments provided', async() => {
        const currentUsers = await ctx.db('users').count();
        const response = await ctx.mockCall(USERS_QUERY);
        // console.log(JSON.stringify(response.data, null, 2));
        expect(response.data.users.items.length).toBe(parseInt(currentUsers[0].count));
    });

    it('It should filter by a string name lookup', async () => {
        const response = await ctx.mockCall(USERS_QUERY, 
            {input: {where: {first_name: {contains: "b"}}}}
        )
        // console.log(JSON.stringify(response.data, null, 2));
    })
})