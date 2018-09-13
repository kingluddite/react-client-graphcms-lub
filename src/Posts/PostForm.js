import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object,
  };

  static defaultProps = {
    post: {},
    onSuccess: () => null,
  };

  state = {
    title: this.props.post.title || '',
    body: this.props.post.body || '',
    id: this.props.post.id || '',
  };

  handleInput = event => {
    const formData = [];
    formData[event.target.name] = event.target.value;
    this.setState({ ...formData });
  };

  render() {
    const { onSubmit, onSuccess } = this.props;
    const { title, body, id } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
              id,
            },
          })
            .then(() => {
              onSuccess();
            })
            .catch(error => console.log(error));
        }}
      >
        <input
          type="text"
          name="title"
          onChange={this.handleInput}
          value={title}
          placeholder="title"
        />
        <textarea
          type="text"
          name="body"
          onChange={this.handleInput}
          value={body}
          placeholder="body"
        />
        <button className="button">Submit</button>
      </form>
    );
  }
}

export default PostForm;
