import { GraphQLServer } from 'graphql-yoga';

// Types
// Scalar Types - Strings, Boolean, Int, Float, ID

const users = [
  {
    id: 'abc124',
    name: 'Hassan',
    age: 21,
  },
  {
    id: 'abc123',
    name: 'Khan',
    age: 22,
  },
];

const posts = [
  {
    id: '12az',
    title: 'GraphQL',
    body: 'Best Place to learn graphQL',
    published: true,
    author:'abc124'
  },{
    id: '12aa',
    title: 'Node',
    body: 'Great Place to learn Node',
    published: false,
    author:'abc124'
  },{
    id: '12a1',
    title: 'React',
    body: 'Awesome Place to learn React',
    published: true,
    author:'abc123'
  }
]

//Type Definitions (Schemas)
const typeDefs = `
    type Query {
      add(num1:Float!,num2:Float!):Float!
      sum(numbers:[Float!]!):Float!
      greeting(name:String):String!
      me:User!
      post:Post!
      grades:[Int!]!
      users(query:String):[User!]!
      posts(query:String):[Post!]!
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
      published:Boolean!,
      author:User!
    }

`;

//Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) return `Hello, ${args.name}!`;
      return `Hello!`;
    },
    add(parent, args, ctx, info) {
      let sum = args.num1 + args.num2;
      return sum;
    },
    sum(parent, args, ctx, info) {
      if (args.numbers.length === 0) return 0;
      return args.numbers.reduce((acc, cur) => {
        return acc + cur;
      });
    },
    grades(parent, args, ctx, info) {
      return [1, 2, 3];
    },
    me() {
      return {
        id: 'abc123',
        name: 'Hassan',
        age: 21,
      };
    },
    post() {
      return {
        id: '12az',
        title: 'GraphQL',
        body: 'Best Place to learn graphQL',
        published: true,
      };
    },
    users(parent, args, ctx, info) {
      if(!args.query) return users
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })

    },
    posts(parent, args, ctx, info){
      if(!args.query) return posts
      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch 
      })
    }

  },
  Post:{
    author(parent, args, ctx, info){
      return users.find(user => user.id === parent.author)
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server is running'));
