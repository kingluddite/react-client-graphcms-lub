import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export class EditMode extends Component {
  render() {
    const { isEditMode } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <button
            className="button"
            onClick={() => {
              client.writeData({ data: { isEditMode: !isEditMode } });
            }}
          >
            Toggle Edit Mode
          </button>
        )}
      </ApolloConsumer>
    );
  }
}

export default EditMode;
