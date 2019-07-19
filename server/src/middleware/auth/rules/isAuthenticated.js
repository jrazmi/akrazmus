import { rule } from 'graphql-shield';

export const isAuthenticated = rule({cache: "contextual"})(async(root,args,ctx,info) => {
    if(!ctx.currentUser) return false;
    if(ctx.currentUser.deleted) return false;
    return true
})