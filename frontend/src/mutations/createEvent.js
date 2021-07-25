import { gql } from '@apollo/client';

export default gql`
  mutation createEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
    createEvent(title: $title, description: $description, price: $price, date: $date) {
      _id
      title
      description
      price
      date
    }
  }
`;
