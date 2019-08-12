const { ApolloServer, gql } = require('apollo-server');

const PORT = 4000;

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: function() { return 'world' }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(function({ url }) {
  console.log(`Server listening at ${url}.`);
});
