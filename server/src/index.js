import { GraphQLServer } from "graphql-yoga";
import jwt from 'express-jwt';
import resolvers from "./resolvers";
import typeDefs from "./types";
import context from './context';
import { AuthMiddleware } from './middleware/auth';

require("dotenv").config();

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: ({request, response}) => context(request,response),
    middlewares:[
      AuthMiddleware
    ]
});

server.express.use(jwt({
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

const options = {
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
  cors: {
    credentials: true,
    origin: process.env.NODE_ENV === 'test' ? '*' : process.env.FRONTEND_HOST
  },
  formatError: err => {
    return {message: err.message}
  }
}

server.start(options, ({port}) => {
  console.log(`Server started, listening on port ${port} for incoming requests.`);
});
