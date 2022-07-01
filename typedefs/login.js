// const { buildSchema } = require("graphql");
const { gql } = require("apollo-server");

const typeDefs = gql(`

    type signupData {
        fullname: String
        username: String
        password: String
    }

    input signupInput {
        fullname: String!
        username: String!
        password: String!
    }

    type signupOutput {
        data:signupData
        message: String
        status: Int
    }
    
    input loginInput {
        username: String!
        password: String!
    }

    type loginOutput {
        data: logintoken
        message: String
        status: Int
    }

    type logintoken{
        token: String
    }

    type Query {
        empLogin( input: loginInput ): loginOutput
    }
     
    type Mutation {
        empSignup( input: signupInput): signupOutput
    }
`);


module.exports = { typeDefs };
