const db = require('../db/knex.js');
import { userLoaderById, Loader } from './loaders';
export default (req, res) => {
    const loaders = {
        user: {
            id: Loader('users', 'id'),
            email: Loader('users', 'email')
        }
    }
    return {
        req,
        res,
        user: req.user,
        db,
        loaders: loaders,
    }
};