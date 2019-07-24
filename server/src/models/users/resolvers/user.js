import { FormatEmail } from '../../../util';

export const user = async(root,args,ctx,info) => {
    let u;
    if(args.id){
        u = await ctx.loaders.user.id.load(parseInt(args.id));
    } else if (args.email){
        u = await ctx.loaders.user.email.load(FormatEmail(args.email));
    } 
    return u
}