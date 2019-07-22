import { me } from './me';
import { requestLogin } from './requestLogin';
import { register } from './register';
import { requestPasswordReset } from './requestPasswordReset';
import { resetPassword } from './resetPassword';
import { isAuthenticated, hasGlobalPerm } from '../../middleware/auth/rules';

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
}

export const ShieldMutation = {
}