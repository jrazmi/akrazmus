export const me = async(root,args,context,info) => {
    if(context.user && context.user.id){
        return await context.loaders.user.id.load(context.user.id);
    }
    return null;
}