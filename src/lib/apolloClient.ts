import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// URL del API Gateway
const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql';

// HTTP Link
const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

// Auth Link - Agregar token a cada request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Apollo Client
export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
