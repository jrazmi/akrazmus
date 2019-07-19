import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { FormatEmail } from '../../util';

export const login = async(root,args,ctx,info) => {
    // Load user from formatted email
    const user = await ctx.loaders.user.email.load(FormatEmail(args.email));

    //set Generic Invalid Credential error
    const credAuthError = { code: "DOES_NOT_EXIST", success: false, message: "Could not find matching user with these credentials"};

    // if no user exists return GIC
    if(!user){
        return credAuthError
    }

    // compare password and return GIC if mismatch
    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid){
        return credAuthError
    }

    //if user has been deleted/suspended return susspension error
    if(user.deleted){
        return { code: "REVOKED", success: false, message: "Access for this user account has been revoked."}
    }

    // set token for user
    const token = jsonwebtoken.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '30d'
    })
    
    

    return {
        code: "OK",
        success: true,
        message: "Login Successful",
        token: token,
    }
};
