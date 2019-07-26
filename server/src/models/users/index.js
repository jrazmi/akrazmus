import { globalPermissions } from './resolvers/globalPermissions';
import { user } from './resolvers/user';
import { users } from './resolvers/users';

export const Query = {
    user,
    users
}


export const User = {
    globalPermissions
}

