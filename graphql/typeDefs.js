const{ gql } = require('apollo-server'); 

const typeDefs =  gql(` 
type Article { 
  id: ID!
  title: String!
  content: String!
}
input ArticleInput { 
  title: String!
  content: String!
}
type Query { 
  articles: [Article]
  article(id: ID!): Article
}
type Mutation { 
  createArticle(articleInput: ArticleInput): Article
  deleteArticle(id: ID!): Article
  updateArticle(id: ID!, articleInput: ArticleInput): Article!
}
`)

module.exports = typeDefs; 