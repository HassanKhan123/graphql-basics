import { GraphQLServer } from 'graphql-yoga';

//Type Definitions (Schemas)
const typeDefs = `
    type Query {
        hello: String!
        name:  String!
        location:  String!
        bio:  String!
    }

`;

//Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'First Query';
    },
    name(){
        return 'Hassan'
    },
    location(){
        return 'Karachi, Pakistan'
    },
    bio(){
        return 'I am MERN Developer'
    }
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running'));
