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
        console.log(response);
    })
})