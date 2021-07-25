import { gql } from '@apollo/client';

export default gql`
  {
    bookings {
      _id
      createdAt
      event {
        _id
        title
        date
        price
      }
    }
  }
`;
