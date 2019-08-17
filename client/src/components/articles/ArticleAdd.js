import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { CREATE_ARTICLE, GET_ARTICLES } from '../../graphql/articleQueries'; 

function ArticleAdd(props) {
  let title, content;

  return (
    <Mutation mutation={CREATE_ARTICLE}> 
      {function(createArticle, { data }) { 
        return( 
          <div>
            <h4>Add Article</h4><hr/>
            <form
              onSubmit={function(event) { 
                event.preventDefault(); 
                createArticle({ variables: { title: title.value, content: content.value }, 
                  refetchQueries: [{query: GET_ARTICLES}]
                  // Alternative to above, updates cache w/o new query:
                  // update(cache, { data: { createArticle } }) {
                  //   const { articles } = cache.readQuery({ query: GET_ARTICLES });
                  //   cache.writeQuery({
                  //     query: GET_ARTICLES,
                  //     data: { articles: articles.concat([createArticle]) },
                  //   });
                  // }
                });
                props.history.push("/articles"); 
              }}
            >
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" 
                  ref={function(node) { return title = node; }} 
                />              
              </div>
              <div className="form-group">
                <label>Content:</label>
                <textarea rows="5" className="form-control"
                  ref={function(node) { return content = node; }} 
                />
              </div>
              <p className="btn-group">
                <button type="submit" className="btn btn-primary">Submit</button>
               <Link to="/articles" className="btn btn-secondary">Cancel</Link>
              </p>
            </form>
          </div>
        )}
      }
    </Mutation>
  );
};

export default ArticleAdd;