import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// components
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

// graphql
import POST_QUERY from '../queries/Post.graphql';

export class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          const { post, isEditMode } = data;
          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              <section>
                {isEditMode ? (
                  <Fragment>
                    <h1>Edit Post</h1>
                    <UpdatePost post={post} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1>{post.title}</h1>
                    <Mutation
                      mutation={UPDATE_POST}
                      variables={{ id: post.id, check: !post.check }}
                      optimisticResponse={{
                        __typename: 'Mutation',
                        updatePost: {
                          __typename: 'Post',
                          check: !post.check,
                        },
                      }}
                      update={(cache, { data: { updatePost } }) => {
                        const data = cache.readQuery({
                          query: POST_QUERY,
                          variables: {
                            id: post.id,
                          },
                        });
                        data.post.check = updatePost.check;
                        cache.writeQuery({
                          query: POST_QUERY,
                          data: {
                            ...data,
                            post: data.post,
                          },
                        });
                      }}
                    >
                      {updatePost => (
                        <input
                          style={{ height: '100px' }}
                          type="checkbox"
                          onChange={updatePost}
                          checked={post.check}
                        />
                      )}
                    </Mutation>
                  </Fragment>
                )}
              </section>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Post;

const UPDATE_POST = gql`
  mutation updatePost($check: Boolean, $id: ID!) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      check
    }
  }
`;
