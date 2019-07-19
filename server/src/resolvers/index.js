import { Queries as AuthQueries, Mutations as AuthMutations } from './auth';
import { Queries as UserQueries} from './users';
import { Queries as PermissionQueries } from './permissions';




export default {
    Query: {
        ...AuthQueries,
        ...UserQueries,
        ...PermissionQueries
    },
    Mutation: {
        ...AuthMutations
    }
}
