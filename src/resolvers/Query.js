const Query = {
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
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) return db.posts;
    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export default Query;
