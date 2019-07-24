import jsonwebtoken from 'jsonwebtoken';
import { FormatEmail } from '../../../util';
import bcrypt from 'bcryptjs';

export const resetPassword = async ( root, args, ctx, info ) => {
    let validJWT;
    //verify that a valid jwt was passed in
    try {
        validJWT = await jsonwebtoken.verify(args.token, process.env.TOKEN_SECRET);
    } catch(e){
        return({
            code: "EXPIRED",
            success: false,
            message: "This token is either invalid or expired"
        })
    }

    // get user from jwt args
    const user = await ctx.loaders.user.email.load(FormatEmail(validJWT.email));
    
    //set Generic Invalid Credential error
    const credAuthError = { code: "DOES_NOT_EXIST", success: false, message: "Could not find matching user with these credentials"};

    // if no user exists return GIC
    if(!user){
        return credAuthError
    }

    // bcrypt new password
    const updatedPassword = await bcrypt.hash(args.password, 10);

    //update new password
    const updatedUser = await ctx.db('users').where('id', user.id).update({password: updatedPassword}).returning('*');

    return{
        code: "OK",
        success: true,
        message: "Password has been updated"
    }
}