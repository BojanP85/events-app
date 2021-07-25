import { gql } from '@apollo/client';

export default gql`
  mutation bookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      createdAt
      updatedAt
    }
  }
`;
