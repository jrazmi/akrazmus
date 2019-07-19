import { shield } from 'graphql-shield';

import { ShieldQuery as AccountQuery, ShieldMutation as AccountMutation } from '../../models/account';



export default shield({
        Query:{
            ...AccountQuery
        },
        Mutation:{
            ...AccountMutation
        }, 
    },
    {
        fallbackError: "Not Autorized",
        debug: process.env.NODE_ENV !== "production",
        allowExternalErrors: true
    }
);