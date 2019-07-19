import { rule } from 'graphql-shield';
import _ from "lodash";

export const hasGlobalPerm = (perm) => rule({cache: "contextual"})(async(root,args,ctx,info) => {
    if(!ctx.currentUser) return false;
    if(ctx.currentUser.deleted) return false;
    const perms = await ctx.loaders.permissions.global.userId.load(ctx.currentUser.id);
    // iterate over permissions map permission values to an array
    // return true/false if permission exists
    return _.includes(_.map(perms, 'permission'), perm);
})