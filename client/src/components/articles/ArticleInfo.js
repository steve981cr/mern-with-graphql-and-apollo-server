import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_ARTICLE, DELETE_ARTICLE, GET_ARTICLES } from '../../graphql/articleQueries';

function ArticleInfo(props) {
  return (
    <Query query={GET_ARTICLE} variables={{ id: props.match.params._id }}>  
      {function({ loading, error, data }) {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const { article } = data;
        return (
          <div>
            <h2>{article.title}</h2>
            <small>id: {article.id}</small>
            <p>{article.content}</p>
            <p className="btn-group">
              <Link to={`/articles/${article.id}/edit`} className="btn btn-info">Edit</Link> 
              <Mutation mutation={DELETE_ARTICLE} > 
                {function(deleteArticle, { data }) { 
                  return(
                    <button className="btn btn-danger"
                      onClick={() => { 
                        deleteArticle({ 
                          variables: { id: article.id }, 
                          refetchQueries: [{query: GET_ARTICLES}] 
                        });
                        props.history.push("/articles"); 
                      }}
                    >
                      Delete
                    </button> 
                  )
                }}
              </Mutation>
              <Link to="/articles" className="btn btn-secondary">Close</Link>
            </p>
            <hr/>
          </div>
        );
      }}
    </Query>
  )
}

export default ArticleInfo