import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const defaultState = {
  isEditMode: false,
};

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage,
}).then(() => {
  // Connecting our site to the GraphQL API
  const client = new ApolloClient({
    cache,
    uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
    clientState: {
      defaults: defaultState,
      resolvers: {},
    },
  });

  // client
  //   .query({
  //     query: testQuery,
  //   })
  //   .then(res => console.log(res));

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
});
