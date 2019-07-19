import { Query as AccountQuery, Mutation as AccountMutation } from '../models/account';


export default {
    Query:{
        ...AccountQuery
    },
    Mutation: {
        ...AccountMutation
    }
}
