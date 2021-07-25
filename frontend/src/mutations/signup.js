import { gql } from '@apollo/client';

export default gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      _id
      email
    }
  }
`;
