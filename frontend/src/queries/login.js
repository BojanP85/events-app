import { gql } from '@apollo/client';

export default gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      refreshToken
    }
  }
`;
