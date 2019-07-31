process.env.NODE_ENV = 'test';

import { graphql } from 'graphql';
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import { AuthMiddleware } from '../src/middleware/auth';
import resolvers from "../src/resolvers";
import typeDefs from "../src/types";
import makeContext from '../src/context';


export const db = require('./testDB.js');

export const before = async() => {
    let rollback = await db.migrate.rollback();
    let migrate = await db.migrate.latest();
    let seed = await db.seed.run();
    return
}

export const after = async() => {
   let rollback = await db.migrate.rollback();
   return
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const schemaWithMiddleware = applyMiddleware(
    schema,
    AuthMiddleware
)
export const makeTestContext = async (contextOverRides) => {
    const context = await makeContext({}, {}, db);
    const testContext = Object.assign(context, contextOverRides);
    return testContext
};

export const mockCall = async (query, variables, contextOverRides) => {
    const testContext = await makeTestContext(contextOverRides);
    console.log(variables);
    // pass in schema, query, root, context, variables
    const gqls = await graphql(schemaWithMiddleware, query, {}, testContext, variables);
    console.log(gqls)
    return gqls;
}