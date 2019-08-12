const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
// const cors = require('cors');
// const graphqlHTTP = require('express-graphql');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers'); 

const PORT = 4000; 
const MONGODB_URI = "mongodb://localhost:27017/my_local_db";   

// app.use(cors());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server listening at ${url}.`);
});
/*
const { ApolloServer, gql } = require('apollo-server');

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

server.listen().then(function({ url }) {
  console.log(`Server listening at ${url}.`);
});
*/