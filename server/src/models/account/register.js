import { FormatEmail } from '../../util';
import bcrypt from 'bcryptjs';

export const register = async(root,args,ctx,info) => {
    // Load user from formatted email
    const formattedEmail = FormatEmail(args.input.email);
    const existing = await ctx.loaders.user.email.load(formattedEmail);
    if(existing){
        return(
            {
                code: "DUPLICATE",
                success: false,
                message: "Go Log In!",
                nextPage: "/login"
            }
        )
    }

    const userData = Object.assign({}, args.input, {
        password: await bcrypt.hash(args.input.password, 10),
        email: formattedEmail,
    });

    const user = await ctx.db('users').insert(userData).return('*');
    
    return(
        {
            code: "OK",
            success: true,
            message: "Go Log In!",
            nextPage: "/login"
        }
    )

}