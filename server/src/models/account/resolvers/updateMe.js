import { FormatEmail, prove } from '../../../util';

export const updateMe = async (root, args, ctx, info) => {

    // leaving this in here in case we want to remove user query from context constructor
    // shouldn't be returned if shield isAuthenticated middleware applied
    if(!ctx.currentUser){
        return{
            code: "EXPIRED",
            success: false,
            message: "No current user"
        }
    }

    const [err, update] = await prove(ctx.db('users').where({id: ctx.currentUser.id}).update(args.input));
    if(err) {
        return {
            code: "ERROR",
            success: false,
            message: err.message ? err.message : 'Unknown error'
        }
    }
    return {
        code: "OK",
        success: true,
        message: "Profile updated"
    }
}