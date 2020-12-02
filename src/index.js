import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

// Types
// Scalar Types - Strings, Boolean, Int, Float, ID

let users = [
  {
    id: 'abc124',
    name: 'Hassan',
    age: 21,
    email: 'hassan@gmail.com',
  },
  {
    id: 'abc123',
    name: 'Khan',
    age: 22,
    email: 'khan@gmail.com',
  },
];

let posts = [
  {
    id: '12az',
    title: 'GraphQL',
    body: 'Best Place to learn graphQL',
    published: true,
    author: 'abc124',
  },
  {
    id: '12aa',
    title: 'Node',
    body: 'Great Place to learn Node',
    published: false,
    author: 'abc124',
  },
  {
    id: '12a1',
    title: 'React',
    body: 'Awesome Place to learn React',
    published: true,
    author: 'abc123',
  },
];

let comments = [
  {
    id: '1',
    text: 'First Comment',
    author: 'abc124',
    post: '12a1',
  },
  {
    id: '2',
    text: 'Second Comment',
    author: 'abc123',
    post: '12a1',
  },
  {
    id: '3',
    text: 'Third Comment',
    author: 'abc123',
    post: '12aa',
  },
  {
    id: '4',
    text: 'Fourth Comment',
    author: 'abc123',
    post: '12az',
  },
];
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

    type Mutation {
      createUser(data:CreateUserInput!): User!
      deleteUser(id:ID!):User!
      createPost(data:CreatePostInput!): Post!
      deletePost(id:ID!):Post!
      createComment(data:CreateCommentInput!): Comment!
      deleteComment(id:ID!):Comment!
    }

    input CreateUserInput {
      name:String!
      email:String!
      age:Int
    }

    input CreatePostInput {
      title:String!
      body:String!
      published:Boolean!
      author:ID!
    }

    input CreateCommentInput {
      text:String!
      author:ID!
      post:ID!
    }

    type User {
      id:ID!
      name:String!
      age:Int,
      email:String!
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
      if (!args.query) return users;
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => parent.id === comment.post);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => parent.id === post.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => parent.id === comment.author);
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);
      if (emailTaken) throw new Error('Email Taken');
      const user = {
        id: uuidv4(),
        ...args.data,
      };

      users.push(user);
      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) throw new Error('User not found!');

      const deleteUserData = users.splice(userIndex, 1);
      posts = posts.filter((post) => {
        const match = post.author === args.id;
        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter((comment) => comment.author !== args.id);

      return deleteUserData[0];
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      if (!userExists) throw new Error('User not found');
      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts.push(post);
      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) throw new Error('Post not found!');

      const deletedPostData = posts.splice(postIndex, 1);

      comments = comments.filter((comment) => comment.post !== args.id);

      return deletedPostData[0];
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some(
        (post) => post.id === args.data.post && post.published
      );
      if (!userExists || !postExists)
        throw new Error('Unable to find user and post');
      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) throw new Error('Comment not found!');
      const deletedCommentData = comments.splice(commentIndex, 1);
      return deletedCommentData[0];
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server is running'));
