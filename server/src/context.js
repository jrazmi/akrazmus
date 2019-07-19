const db = require('../db/knex.js');
import { Loader } from './loaders';

export default async (req, res) => {
    let currentUser;
    // initialize dataloaders to context
    const loaders = {
        user: {
            id: Loader('users', 'id'),
            email: Loader('users', 'email')
        }
    }

    // load currentuser into context
    if(req && req.user) {
        currentUser = await loaders.user.id.load(req.user.id);
    }

    console.log(req.user)
    return {
        req,
        res,
        currentUser: currentUser,
        db,
        loaders: loaders,
    }
};