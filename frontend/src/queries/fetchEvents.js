import { gql } from '@apollo/client';

export default gql`
  {
    events {
      _id
      title
      description
      price
      date
      creator {
        _id
      }
      booking {
        _id
      }
    }
  }
`;
