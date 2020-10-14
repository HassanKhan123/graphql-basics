import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar Types - Strings, Boolean, Int, Float, ID

//Type Definitions (Schemas)
const typeDefs = `
    type Query {
       id:ID!
       name:String!
       age:Int!
       employed:Boolean!
       gpa:Float
    }

`;

//Resolvers
const resolvers = {
  Query: {
    id() {
      return 'abc123';
    },
    name() {
      return 'Hassan Khan';
    },
    age() {
      return 20;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.4;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server is running'));
