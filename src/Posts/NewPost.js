import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

// components
import PostForm from './PostForm';

// Graphql
import NEW_POST from '../mutations/NewPost.graphql';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST}>
          {createPost => <PostForm onSubmit={createPost} />}
        </Mutation>
      </div>
    );
  }
}

export default NewPost;
