import { gql } from "apollo-boost";

// Update to match schema user
export const CURRENT_USER_QUERY = gql`
    query Me {
        me {
            id
            email
        }
    }
`;

// server side query for current user
// HOC Auth components should decide what to do with an empty user object.
export const GetCurrentUser = apolloClient =>
apolloClient
.query({query: CURRENT_USER_QUERY})
.then(({data}) => {
    return { currentUser: data}
})
.catch((e) => {
    console.log('Server Current User Query Failure');
    console.log(e)
    return { currentUser: {} }
})