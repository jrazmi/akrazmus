import { Query as AccountQuery, Mutation as AccountMutation } from '../models/account';
import { User } from '../models/users';

export default {
    Query:{
        ...AccountQuery
    },
    Mutation: {
        ...AccountMutation
    },
    User: User,
}
