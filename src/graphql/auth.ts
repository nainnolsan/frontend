import { gql } from '@apollo/client';

// Mutation: Register
export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      success
      message
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;

// Mutation: Login
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;

// Mutation: Logout
export const LOGOUT_MUTATION = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      success
      message
    }
  }
`;

// Mutation: Refresh Token
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      success
      message
      accessToken
      refreshToken
    }
  }
`;

// Query: Get Profile
export const GET_PROFILE_QUERY = gql`
  query GetProfile {
    me {
      success
      message
      data {
        id
        name
        email
        createdAt
      }
    }
  }
`;
