
let users = [{},{}];

export const user = async(root,args,context,info) => {
    if(args.id){
        return await context.loaders.user.id.load(args.id);
    }
    else if (args.email){
        return await context.loaders.user.email.load(args.email.toUpperCase());
    }
    else return null;
}

export const Queries = {
    user,
    users,
}