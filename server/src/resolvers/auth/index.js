import { me } from './me';
import { login } from './login';
import { register } from './register';
import { requestPasswordReset } from './requestPasswordReset';
import { resetPassword } from './resetPassword';

export const Queries = {
    me
}

export const Mutations = {
    login,
    register,
    requestPasswordReset,
    resetPassword,
}