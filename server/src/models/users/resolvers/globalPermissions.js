import _ from 'lodash';

export const globalPermissions = async (root,args,ctx,info) => {
    //load all global permissions for root user id
    const perms = await ctx.loaders.permissions.global.userId.load(root.id);

    // map result to an array of perm values
    return _.map(perms, 'permission');
}