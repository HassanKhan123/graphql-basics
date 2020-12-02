const users = [
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

const posts = [
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

const comments = [
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

const db = {
  users,
  posts,
  comments,
};

export default db;
