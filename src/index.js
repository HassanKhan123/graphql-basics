import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar Types - Strings, Boolean, Int, Float, ID

//Type Definitions (Schemas)
const typeDefs = `
    type Query {
      add(num1:Float!,num2:Float!):Float!
      sum(numbers:[Float!]!):Float!
      greeting(name:String):String!
      me:User!
      post:Post!
      grades:[Int!]!
    }

    type User {
      id:ID!
      name:String!
      age:Int!
    }

    type Post {
      id:ID!
      title:String!
      body:String!
      published:Boolean!
    }

`;

//Resolvers
const resolvers = {
  Query: {
    greeting(parent,args,ctx,info){
      if(args.name) return `Hello, ${args.name}!`
      return `Hello!`
    },
    add(parent,args,ctx,info){
      let sum = args.num1 + args.num2
      return sum
    },
    sum(parent,args,ctx,info){
      if(args.numbers.length === 0) return 0
      return args.numbers.reduce((acc,cur) => {
        return acc+cur
      })
    },
    grades(parent,args,ctx,info){
      return [1,2,3]
    },
    me(){
      return {
        id:'abc123',
        name:'Hassan',
       age:21
      }
    },
    post(){
      return{
        id:'12az',
        title:'GraphQL',
        body:"Best Place to learn graphQL",
        published:true
      }
    }
    
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server is running'));
