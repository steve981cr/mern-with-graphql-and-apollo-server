import { gql } from 'apollo-boost';

const GET_ARTICLES = gql`
  {
    articles {
      title
      content
      id
    }
  }
`;

const GET_ARTICLE = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      title
      content
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation createArticle($title: String!, $content: String!) {
    createArticle(articleInput: { title: $title, content: $content }) {
      title
      content
      id
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      title
      content
      id
    }
  }
`;

const UPDATE_ARTICLE = gql` 
  mutation updateArticle($id: ID!, $title: String!, $content: String!) {     
    updateArticle(id: $id, articleInput: { title: $title, content: $content }) { 
      id
      title
      content
    }
  }
`;

export { GET_ARTICLES, GET_ARTICLE, CREATE_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE };
