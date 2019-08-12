import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_ARTICLES } from '../../graphql/articleQueries';

function ArticleList() {
  return(
    <div>
      <h2>
        Articles
        <Link to="/articles/new" className="btn btn-primary float-right"> 
          Create Article
        </Link> 
      </h2>
      <Query query={GET_ARTICLES}> 
        {function({ loading, error, data }) {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { articles } = data; 
          return (
            articles.map(function(article) { 
              return(
                <div key={article.id}> 
                  <hr/>
                  <h4><Link to={`/articles/${article.id}`}>{article.title}</Link></h4>
                  <small>id: {article.id}</small>
                </div>
              )     
            })
          );
        }}
      </Query>
    </div>
  )
}

export default ArticleList;