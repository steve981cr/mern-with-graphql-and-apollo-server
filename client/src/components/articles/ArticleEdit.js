import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_ARTICLE, UPDATE_ARTICLE } from '../../graphql/articleQueries';

function ArticleEdit(props) {
  function handleCancel(id) {
    props.history.push(`/articles/${id}`);
  }

  let title, content;
  return (
    <Query query={GET_ARTICLE} variables={{ id: props.match.params._id }}>
      {function({ loading, error, data }) {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const { article } = data;
        return (
          <div>
            <h1>Edit {article.title}</h1>
            <Mutation mutation={UPDATE_ARTICLE}>
              {function(updateArticle, { loading, error }) { 
                return( 
                  <div>
                    <form
                      onSubmit={function(event) {
                        event.preventDefault();
                        updateArticle({ 
                          variables: {
                            id: article.id,
                            title: title.value,
                            content: content.value
                          }
                        });
                        props.history.push(`/articles/${article.id}`);
                      }}
                    >
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control"
                          defaultValue={article.title} 
                          ref={function(node) { return title = node; }} />
                      </div>
                      <div className="form-group">
                        <label>Content</label>
                        <textarea rows="5" className="form-control"
                          defaultValue={article.content} 
                          ref={function(node) { return content = node; }} />
                      </div>
                      <div className="btn-group">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" className="btn btn-secondary" 
                          onClick={function() { handleCancel(article.id) }}>Cancel</button>
                      </div>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error : {error.message}</p>}
                  </div>
                )
              }}
            </Mutation>
          </div>
        );
      }}
    </Query>      
  )
}

export default ArticleEdit;