import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import AuthContext from '../../../contexts/AuthContext';
import ToggleContext from '../../../contexts/ToggleContext';
// import ErrorContext from '../../../contexts/ErrorContext'; // 'ErrorContext' alternative.

import fetchBookingsQuery from '../../../queries/fetchBookings';
import bookEventMutation from '../../../mutations/bookEvent';

import errorHandling from '../../../helpers/errorHandling';

import { StyledEvent, SpinnerWrapper } from './EventItemCSS';
import { StyledListItem } from '../../../styles/list';

import Ribbon from '../../Ribbon/Ribbon';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import Spinner from '../../Spinner/Spinner';
import Messages from '../../Messages/Messages';

const EventItem = props => {
  const { _id, title, price, date, description, creator, booking } = props.event;
  const { userId } = useContext(AuthContext);
  const { toggleClickHandler, toggledOn } = useContext(ToggleContext);
  // const { messages, handleErrors, cleanMessages } = useContext(ErrorContext); // 'ErrorContext' alternative.

  useEffect(() => {
    setMessages([]);
  }, [toggledOn]);
  // 'ErrorContext' alternative.
  /*
  useEffect(() => {
    cleanMessages();
  }, [toggledOn, cleanMessages]);
  */

  /*
  const [fetchBookings] = useLazyQuery(fetchBookingsQuery, {
    fetchPolicy: "cache-and-network",
    context: {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  });
  */
  const [bookEvent, { loading }] = useMutation(bookEventMutation, {
    onError: error => {
      const message = errorHandling(error);
      setMessages(message);

      // 'ErrorContext' alternative.
      // handleErrors(error);
    },
    onCompleted: data => {
      setIsBooked(true);
      toggleClickHandler();
    }
  });

  const [isBooked, setIsBooked] = useState(false);
  const [messages, setMessages] = useState([]);

  const onConfirmHandler = async () => {
    await bookEvent({
      variables: { eventId: _id },
      refetchQueries: [{ query: fetchBookingsQuery }]
    });

    /* Next two approaches (first with 'async await' syntax and second with 'then' syntax) are both based on 'useLazyQuery' hook, and in certain situations (when we have slow network and try to go to the Bookings page while 'bookEvent' and 'fetchBookings' requests are still pending) will produce following warning:
    'Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.' */

    // 'async await' syntax:
    /*
    await bookEvent({ variables: { eventId } });
    fetchBookings();
    */

    // alternative 'then' syntax:
    /*
    bookEvent({
      variables: { eventId: eventId }
    }).then(
      () => fetchBookings()
      // fetchBookings() // this line will trigger both 'bookEvent' and 'fetchBookings' requests at the same time, and we don't want that.
    );
    */
  };

  return (
    <>
      <Modal
        title={title}
        creatorId={creator._id}
        confirmText="Book event"
        onCancel={toggleClickHandler}
        onConfirm={onConfirmHandler}
        loading={loading}
      >
        <StyledEvent Loading={loading ? true : false}>
          <Messages messages={messages} />
          <h3>Price:<span>&#8364; {price.toFixed(2)}</span></h3>
          <h3>Date: <span>{new Date(date).toLocaleString('en-GB', { timeZone: 'CET' })} CET</span></h3>
          <h3>About:</h3>
          <p>{description}</p>
        </StyledEvent>
        {loading ? <SpinnerWrapper><Spinner BookEvent /></SpinnerWrapper> : ''}
      </Modal>
      <StyledListItem Event>
        <div>
          {userId === creator._id ? <Ribbon>created</Ribbon> : ''}
          {userId && (booking !== null || isBooked) ? <Ribbon Booked>booked</Ribbon> : ''}
          <h1>{title}</h1>
          <h2>&#8364; {price.toFixed(2)}</h2>
          <h2>{new Date(date).toLocaleString('en-GB', { timeZone: 'CET' })} CET</h2>
        </div>
        <hr />
        <div>
          <Button buttonClickHandler={toggleClickHandler}>View details</Button>
        </div>
      </StyledListItem>
    </>
  );
};

export default EventItem;
