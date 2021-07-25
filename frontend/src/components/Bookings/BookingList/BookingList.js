import React from 'react';

import { StyledList } from '../../../styles/list';
import BookingItem from '../BookingItem/BookingItem';

const BookingList = props => {
  const renderList = () => {
    return props.bookings.map(booking => {
      return (
        <BookingItem
          key={booking._id}
          booking={booking}
          onCancelHandler={props.onCancelHandler}
        />
      );
    });
  };

  return (
    <StyledList>{renderList()}</StyledList>
  );
};

export default BookingList;
