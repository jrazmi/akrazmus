import { rule } from 'graphql-shield';

export const isAuthenticated = rule(`is-authenticated`, { cache:"contextual"})(async(parent, args, context, info) => {
    console.log('Auth Middlewhere')
    if(!context.user) return false;
    if(!context.user.id) return false;
    return true
})