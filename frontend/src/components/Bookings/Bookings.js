import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import fetchBookingsQuery from '../../queries/fetchBookings';
import cancelBookingMutation from '../../mutations/cancelBooking';

import { Wrapper } from '../../styles/message';

import scrollToTop from '../hoc/ScrollToTop';
import BookingList from './BookingList/BookingList';
import BookingControls from './BookingControls/BookingControls';
import BookingChart from './BookingChart/BookingChart';
import Spinner from '../Spinner/Spinner';

const Bookings = () => {
  const { loading, error, data } = useQuery(fetchBookingsQuery, {
    onCompleted: data => {
      console.log(data);
    }
  });
  const [cancelBooking] = useMutation(cancelBookingMutation, {
    onCompleted: data => {
      console.log(data);
    }
  });
  const [outputType, setOutputType] = useState('list');

  const onCancelHandler = bookingId => {
    cancelBooking({
      variables: { bookingId: bookingId },
      optimisticResponse: {
        __typename: 'Mutation',
        cancelBooking: {
          __typename: 'EventType',
          _id: bookingId
        }
      },
      update: (proxy, { data: { cancelBooking } }) => {
        const data = proxy.readQuery({ query: fetchBookingsQuery });
        proxy.writeQuery({
          query: fetchBookingsQuery,
          data: {
            ...data,
            bookings: data.bookings.filter(
              booking => booking._id !== bookingId
            )
          }
        });
      }
    });
  };

  const changeOutputTypeHandler = outputTypeInput => {
    if (outputTypeInput === 'list') {
      setOutputType('list');
    } else {
      setOutputType('chart');
    }
  };

  const renderBookings = () => {
    if (loading) return <Spinner />;

    if (data.bookings.length === 0) {
      return (
        <Wrapper Bookings>
          <p>You don't have any bookings yet.</p>
          <p><Link to="/events">Let's start booking!</Link></p>
        </Wrapper>
      );
    }

    return (
      <>
        <BookingControls activeOutputType={outputType} changeOutputType={changeOutputTypeHandler} />
        {outputType === 'list' ? (
          <BookingList bookings={data.bookings} onCancelHandler={onCancelHandler} />
        ) : (
          <BookingChart bookings={data.bookings} />
        )}
      </>
    );
  };

  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }

  return (
    <>
      {renderBookings()}
    </>
  );
};

export default scrollToTop(Bookings);
