import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// graphql
import POSTS_QUERY from '../queries/Posts.graphql';

export class Posts extends Component {
  render() {
    return (
      <Fragment>
        <Link className="button" to={'/post/new'}>
          New Post
        </Link>
        <ol className="posts-listing">
          {/* How to write Apollo queries in React */}
          <Query query={POSTS_QUERY}>
            {({ data, loading, error, fetchMore }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error</div>;
              // console.log(fetchMore);
              const { posts } = data;
              return (
                <Fragment>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        fetchMore({
                          variables: {
                            skip: posts.length,
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            // if there is nothing else give us what
                            // is already there
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              // inside this object will be what we
                              // are actually assigning
                              // remember posts is an array of all the posts
                              posts: [...prev.posts, ...fetchMoreResult.posts],
                            });
                          },
                        })
                      }
                    >
                      Load More
                    </button>
                  </li>
                </Fragment>
              );
            }}
          </Query>
        </ol>
      </Fragment>
    );
  }
}

export default Posts;
