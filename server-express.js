/* 
To use Apollo-server with an existing Express app install the following packages:
  npm install express apollo-server-express
*/

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers'); 

const PORT = 4000; 
const MONGODB_URI = "mongodb://localhost:27017/my_local_db";   

const app = express();

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

server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});
 