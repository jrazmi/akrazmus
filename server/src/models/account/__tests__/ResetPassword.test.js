import * as ctx from '../../../../tests/setup';
import _ from 'lodash';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


beforeEach(async () => {
    return await ctx.before();
})
afterEach(async () => {
    return await ctx.after();
});


const RESET_PASSWORD_MUTATION = `
    mutation resetPassword($password: String!, $token: String!){
        resetPassword(password: $password, token: $token){
            code
            success
            message
        }
    }
`;


describe('resetPassword', () => {
    it('it requires password and token variables', async () => {
        const response = await ctx.mockCall(RESET_PASSWORD_MUTATION);
        const tokenError = _.filter(response.errors, e => e.message.indexOf('$token') !== -1);
        expect(tokenError.length >= 1).toBe(true);

        const pwError = _.filter(response.errors, e => e.message.indexOf('$password') !== -1);
        expect(pwError.length >= 1).toBe(true);

    });
    it('it returns an error for an invalid token', async () => {
        const invalidJWT = jsonwebtoken.sign({id: 1, email: 'fake@fake.com'}, 'fake');
        const response = await ctx.mockCall(RESET_PASSWORD_MUTATION, {
            password: 'foo',
            token: invalidJWT,
        });

        expect(response.data.resetPassword.code).toEqual('EXPIRED');
        expect(response.data.resetPassword.success).toBe(false);
    });

    it('it resets a users password with a valid token', async () => {
        const user = await ctx.db('users').where({id:1}).first();

        //verify current pasword is set to cat.
        const currentPassword = await bcrypt.compare('cat', user.password);
        expect(currentPassword).toBe(true);


        const validJWT = jsonwebtoken.sign({id: user.id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '5m'});
        const response = await ctx.mockCall(RESET_PASSWORD_MUTATION, {
            password: "foo",
            token: validJWT,
        });

        // graph api sends valid response
        expect(response.data.resetPassword.code).toEqual('OK');
        expect(response.data.resetPassword.success).toBe(true);


        // verify user's password has been updated
        const updated = await ctx.db('users').where({id:1}).first();
        const updatedPassword = await bcrypt.compare('foo', updated.password);

        expect(updatedPassword).toBe(true);


    });
})