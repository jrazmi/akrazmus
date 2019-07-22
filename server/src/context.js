import { SingleLoader, ManyLoader } from './loaders';

export default async (req, res, db) => {
    let currentUser;
    // initialize dataloaders to context
    const loaders = {
        user: {
            id: SingleLoader('users', 'id'),
            email: SingleLoader('users', 'email')
        },
        permissions: {
            global: {
                userId: ManyLoader('global_permissions', 'user_id'),
            }
        }
    }

    // load currentuser into context
    // do we want to actually load user or no?
    // console.log(req)
    if(req && req.user) {
        currentUser = await loaders.user.id.load(req.user.id);
    }

    return {
        req,
        res,
        currentUser: currentUser,
        db,
        loaders: loaders,
    }
};