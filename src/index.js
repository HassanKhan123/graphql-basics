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

const comments = [
  {
    id:'1',
    text:'First Comment',
    author:'abc124',
    post:'12a1'
  },
  {
    id:'2',
    text:'Second Comment',
    author:'abc123',
    post:'12a1'
  },
  {
    id:'3',
    text:'Third Comment',
    author:'abc123',
    post:'12aa'
  },
  {
    id:'4',
    text:'Fourth Comment',
    author:'abc123',
    post:'12az'
  },
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
      comments:[Comment!]!
    }

    type User {
      id:ID!
      name:String!
      age:Int!,
      posts:[Post!]!
      comments:[Comment!]!
    }

    type Post {
      id:ID!
      title:String!
      body:String!
      published:Boolean!,
      author:User!
      comments:[Comment!]!
    }
    type Comment{
      id:ID!
      text:String!,
      author:User!,
      post:Post!
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
    },
    comments(parent, args, ctx, info){
      return comments
    }

  },
  Post:{
    author(parent, args, ctx, info){
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info){
      return comments.filter(comment => parent.id === comment.post)
    },
  },
  User:{
    posts(parent, args, ctx, info){
      return posts.filter(post => parent.id === post.author)
    },
    comments(parent, args, ctx, info){
     
      return comments.filter(comment => parent.id === comment.author)
    },

  },
  Comment:{
    author(parent, args, ctx, info){
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info){
      return posts.find(post => post.id === parent.post)
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server is running'));
