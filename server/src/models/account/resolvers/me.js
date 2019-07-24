export const me = async(root,args,ctx,info) => {
    return ctx.currentUser
}