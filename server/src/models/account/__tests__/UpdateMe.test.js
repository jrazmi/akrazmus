import * as ctx from '../../../../tests/setup';
import _ from 'lodash';

beforeEach(async () => {
    return await ctx.before();
})
afterEach(async () => {
    return await ctx.after();
});


const UPDATE_ME_MUTATION = `
    mutation updateMe($input: UpdateMeInput!){
        updateMe(input:$input){
            code
            message
            success
        }
    }
`;

describe('updateMe', () => {
    it('it requires authentication', async () => {
        const response = await ctx.mockCall(UPDATE_ME_MUTATION, {input:{first_name:"foo"}});
        expect(response.data).toBeNull();
        expect(response.errors[0].message).toEqual("Not Authorized")
    });
    it('it throws a generic error with empty input', async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const response = await ctx.mockCall(UPDATE_ME_MUTATION, {input:{}}, {currentUser:user});
        expect(response.data.updateMe.success).toBe(false);
    });

    it('it updates a users first and last name', async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const response = await ctx.mockCall(UPDATE_ME_MUTATION, {input:{first_name: "Foo", last_name: "Baz"}}, {currentUser:user});
        expect(response.data.updateMe.success).toBe(true);

        const updatedUser = await ctx.db('users').where({id:1}).first();
        expect(updatedUser.first_name).toEqual('Foo');
        expect(updatedUser.last_name).toEqual('Baz');

    });
})