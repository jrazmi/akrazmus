import * as ctx from '../../../../tests/setup';
import _ from 'lodash';

beforeEach(async () => {
    return await ctx.before();
})
afterEach(async () => {
    return await ctx.after();
});

const REQUEST_PASSWORD_RESET = `
    mutation requestPasswordReset($email: String!, $link: String!){
        requestPasswordReset(email: $email, link: $link){
            code
            success
            message
        }
    }
`;

describe('RequestPasswordReset', () => {
    it('it requires and email and frontend link', async () => {
        const response = await ctx.mockCall(REQUEST_PASSWORD_RESET);
        //error list contains email required
        const emailError = _.filter(response.errors, e => e.message.indexOf('$email') !== -1);
        expect(emailError.length >= 1).toBe(true);

        //error list contains password required
        const linkError = _.filter(response.errors, e => e.message.indexOf('$link') !== -1);
        expect(linkError.length >= 1).toBe(true);
    });
    it('it throws generic faux error if user does not exist', async () => {
        const response = await ctx.mockCall(REQUEST_PASSWORD_RESET, {
            email: "fake@fake.com",
            link: "foo.com"
        });
        // error is same is non user exits ... generic error message
        expect(response.data.requestPasswordReset.code).toEqual('DOES_NOT_EXIST')
        expect(response.data.requestPasswordReset.success).toBe(false);
    });

    it('it sends an email to reset password for a valid user', async () => {
        const sendEmail = jest.fn();

        const user = await ctx.db('users').where({id:1}).first();

        //send request with mock email function
        const response = await ctx.mockCall(REQUEST_PASSWORD_RESET, {
            email: user.email,
            link: "foo.com"
        }, {sendEmail: sendEmail});

        // ctx mock function called
        expect(sendEmail).toBeCalled();
        expect(response.data.requestPasswordReset.code).toEqual('OK')
        expect(response.data.requestPasswordReset.success).toBe(true);

    });
})