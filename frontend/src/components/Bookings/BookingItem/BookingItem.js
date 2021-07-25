import React from 'react';

import { StyledListItem } from '../../../styles/list';
import Button from '../../Button/Button';

const BookingItem = props => {
  const { _id, createdAt, event: { title } } = props.booking;

  return (
    <StyledListItem Bookings>
      <div>
        <h1>{title}</h1>
        <h2>
          <div>
            <span>booked at: </span>
            {new Date(createdAt).toLocaleString('en-GB', { timeZone: 'CET' })} CET
          </div>
        </h2>
      </div>
      <hr />
      <div>
        <Button buttonClickHandler={() => props.onCancelHandler(_id)}>Cancel</Button>
      </div>
    </StyledListItem>
  );
};

export default BookingItem;
