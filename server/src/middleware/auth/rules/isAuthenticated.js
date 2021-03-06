import { rule } from 'graphql-shield';

export const isAuthenticated = rule({cache: "contextual"})(async(parent, args, ctx) => {
    if(!ctx.currentUser) return false;
    if(ctx.currentUser.deleted) return false;
    return true
})