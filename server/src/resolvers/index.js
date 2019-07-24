import { Query as AccountQuery, Mutation as AccountMutation } from '../models/account';
import { User, Query as UserQuery } from '../models/users';

export default {
    Query:{
        ...AccountQuery,
        ...UserQuery

    },
    Mutation: {
        ...AccountMutation
    },
    User: User,
}
