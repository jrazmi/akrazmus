import { shield } from 'graphql-shield';

import { ShieldQuery as AccountQuery, ShieldMutation as AccountMutation } from '../../models/account';


export const AuthMiddleware = shield({
        Query:{
            ...AccountQuery
        },
        Mutation:{
            ...AccountMutation
        }, 
    },
    {
        fallbackError: "Not Authorized",
        debug: process.env.NODE_ENV !== "production",
        allowExternalErrors: true
    }
);