import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, createHttpLink, ApolloProvider, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';
// next two 'import' statements are important in case we want to include 'onError' link inside of our link chain.
/*
import { ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
*/

import { getAccessToken, getRefreshToken } from './helpers/tokenHandling';
import customFetch from './helpers/customFetch';
import { AuthStore } from './contexts/AuthContext';
import './styles/index.css';
import App from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  fetch: customFetch
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return {
    headers: {
      ...headers,
      'x-access-token': accessToken,
      'x-refresh-token': refreshToken
    }
  }
});

/*
const errorLink = onError(error => {
  console.log({error});
  if (error.graphQLErrors)
    error.graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (error.networkError) console.log(`[Network error]: ${error.networkError}`);
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);
*/

const typeDefs = gql`
  extend type Query {
    isTokenExpired: Boolean!
    tokenExpirationMsg: String!
  }
`;

const client = new ApolloClient({
  // link: link,
  link: authLink.concat(httpLink),
  cache: cache,
  typeDefs: typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthStore>
        <App />
      </AuthStore>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
