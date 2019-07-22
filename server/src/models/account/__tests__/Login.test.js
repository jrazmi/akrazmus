import * as ctx from '../../../../tests/setup';
import _ from 'lodash';

beforeEach(async () => {
    return await ctx.before();
})
afterEach(async () => {
    return await ctx.after();
});

const REQUEST_LOGIN_MUTATION =`
    mutation requestLogin($email: String!, $password: String!){
        requestLogin(email: $email, password: $password){
            code
            message
            success
        }
    }
`
describe("requestLogin", () => {
    it('Login resolver requires email and password', async () => {
        const response = await ctx.mockCall(REQUEST_LOGIN_MUTATION);

        //error list contains email required
        const emailError = _.filter(response.errors, e => e.message.indexOf('$email') !== -1);
        expect(emailError.length >= 1).toBe(true);

        //error list contains password required
        const passwordError = _.filter(response.errors, e => e.message.indexOf('$password') !== -1);
        expect(passwordError.length >= 1).toBe(true);
    });

    it('Login resolver returns faux error for non existent user', async () => {
        const response = await ctx.mockCall(REQUEST_LOGIN_MUTATION, {email: "fake@fake.com", password: "fake"});
        expect(response.data.requestLogin.code).toEqual('DOES_NOT_EXIST')
        expect(response.data.requestLogin.success).toBe(false);
    });

    it("Login resolver returns faux error when invalid password is passed for existing user", async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const response = await ctx.mockCall(REQUEST_LOGIN_MUTATION, { email: user.email, password: "12345" });

        // error is same is non user exits ... generic error message
        expect(response.data.requestLogin.code).toEqual('DOES_NOT_EXIST')
        expect(response.data.requestLogin.success).toBe(false);
    });

    it("Login request returns successful with correct user and password combo", async () => {
        const user = await ctx.db('users').where({id:1}).first();
        const response = await ctx.mockCall(REQUEST_LOGIN_MUTATION, { email: user.email, password: "cat" });
        
        expect(response.data.requestLogin.code).toEqual("OK");
        expect(response.data.requestLogin.success).toBe(true);
    })

})