import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

// components
import PostForm from './PostForm';

// graphql
import UPDATE_POST from '../mutations/UpdatePost.graphql';

export class UpdatePost extends Component {
  render() {
    const { post } = this.props;

    return (
      <Mutation mutation={UPDATE_POST}>
        {(updatePost, result) => {
          const onSuccess = () =>
            result.client.writeData({ data: { isEditMode: false } });
          return (
            <PostForm post={post} onSubmit={updatePost} onSuccess={onSuccess} />
          );
        }}
      </Mutation>
    );
  }
}

export default UpdatePost;
