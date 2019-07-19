const connect = require('connect');
const { ApolloServer } = require('apollo-server-express');
const query = require('qs-middleware');
const jwt = require('express-jwt');
import { GraphQLServer } from "graphql-yoga";

require("dotenv").config();


import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import context from './context';
import Permissions from './permissions';

const server = new ApolloServer(
    { 
        typeDefs, 
        resolvers,
        context: ({req, res}) => context(req,res),
    }
    );
    
const PORT = process.env.PORT || 4000;
const app = connect();
const path = '/graphql';


app.use(query());

// jwt middlewhere
app.use(jwt({
    secret: process.env.TOKEN_SECRET,
    credentialsRequired: false,
    //allow for auth header or token query param
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }));


server.applyMiddleware({ app, path });

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
