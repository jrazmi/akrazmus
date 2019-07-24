import { me } from './resolvers/me';
import { requestLogin } from './resolvers/requestLogin';
import { register } from './resolvers/register';
import { requestPasswordReset } from './resolvers/requestPasswordReset';
import { resetPassword } from './resolvers/resetPassword';
import { updateMe } from './resolvers/updateMe';
import { isAuthenticated } from '../../middleware/auth/rules';

export const Query = {
    me
}

export const ShieldQuery = {
    me: isAuthenticated
}


export const Mutation = {
    requestLogin,
    register,
    requestPasswordReset,
    resetPassword,
    updateMe,
}

export const ShieldMutation = {
    updateMe: isAuthenticated
}