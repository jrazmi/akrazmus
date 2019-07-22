import * as ctx from '../../../../tests/setup';
import _ from 'lodash';

beforeEach(async () => {
    return await ctx.before();
})
afterEach(async () => {
    return await ctx.after();
});

const REGISTER_MUTATION = `
    mutation register($input: RegisterInput!){
        register(input: $input){
            code
            message
            success
        }
    }
`;

describe('register', () => {
    it('it requires an request input variable', async () => {
        const response = await ctx.mockCall(REGISTER_MUTATION);
        const inputError = _.filter(response.errors, e => e.message.indexOf('$input') !== -1);
        expect(inputError.length >= 1).toBe(true);
    });
    it('it requires request input to container email, first_name, last_name, and password', async () => {
        const response = await ctx.mockCall(REGISTER_MUTATION, {input: {}});
        //error list contains email required

        const emailError = _.filter(response.errors, e => e.message.indexOf('value.email') !== -1);
        expect(emailError.length >= 1).toBe(true);

        //error list contains password required
        const passwordError = _.filter(response.errors, e => e.message.indexOf('value.password') !== -1);
        expect(passwordError.length >= 1).toBe(true);

        //error list contains first_name required
        const fnError = _.filter(response.errors, e => e.message.indexOf('value.first_name') !== -1);
        expect(fnError.length >= 1).toBe(true);

        //error list contains last_name required
        const lnError = _.filter(response.errors, e => e.message.indexOf('value.last_name') !== -1);
        expect(lnError.length >= 1).toBe(true);

    });

    it('it returns generic error for attempting to register existing user', async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const response = await ctx.mockCall(REGISTER_MUTATION, {
            input: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password: "cat",
            }
        });
        expect(response.data.register.code).toEqual('DUPLICATE');
        expect(response.data.register.success).toBe(false);

    });

    it('it registers a new user with valid input', async () => {
        const response = await ctx.mockCall(REGISTER_MUTATION, {
            input: {
                email: 'foo@foo.com',
                first_name: "foo",
                last_name: "bar",
                password: "cat",
            }
        });
        expect(response.data.register.code).toEqual('OK');
        expect(response.data.register.success).toBe(true);
    })
})