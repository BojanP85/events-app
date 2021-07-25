import { gql } from '@apollo/client';

export default gql`
  mutation cancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      title
    }
  }
`;
