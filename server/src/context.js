import { SingleLoader, ManyLoader } from './loaders';
import { sendEmail } from '../src/util/aws';

export default async (req, res, db) => {
    let currentUser;
    // initialize dataloaders to context
    const loaders = {
        user: {
            id: SingleLoader(db, 'users', 'id'),
            email: SingleLoader(db, 'users', 'email')
        },
        permissions: {
            global: {
                userId: ManyLoader(db, 'global_permissions', 'user_id'),
            }
        }
    }

    // load currentuser into context
    // do we want to actually load user or no?
    // console.log(req)
    if(req && req.user) {
        currentUser = await db('users').where({id:req.user.id}).first();
    }

    return {
        req,
        res,
        currentUser: currentUser,
        db,
        loaders: loaders,
        sendEmail: sendEmail
    }
};