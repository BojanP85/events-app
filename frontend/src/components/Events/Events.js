import React, { useContext, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import AuthContext from '../../contexts/AuthContext';
import ToggleContext from '../../contexts/ToggleContext';

import fetchEventsQuery from '../../queries/fetchEvents';
import createEventMutation from '../../mutations/createEvent';

import { Wrapper } from '../../styles/message';
import { StyledForm } from '../Auth/AuthCSS';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import EventList from './EventList/EventList';
import Spinner from '../Spinner/Spinner';

const Events = () => {
  const { token, userId } = useContext(AuthContext);
  const { toggleClickHandler } = useContext(ToggleContext);

  const { loading, error, data } = useQuery(fetchEventsQuery, {
    // fetchPolicy: "network-only" // 'optimisticResponse' won't trigger with this 'fetchPolicy'.
    fetchPolicy: "cache-and-network"
  });
  const [createEvent] = useMutation(createEventMutation);

  const formRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const onConfirmHandler = () => {
    const title = titleRef.current.value;
    const price = +priceRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;

    if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
      return;
    }

    createEvent({
      variables: { title, description, price, date },
      optimisticResponse: {
        __typename: 'Mutation',
        createEvent: {
          __typename: 'EventType',
          _id: Math.round(Math.random() * -1000000),
          title: title,
          price: price,
          date: date,
          description: description,
          creator: {
            __typename: 'UserType',
            _id: userId
          },
          booking: null
        }
      },
      update: (proxy, { data: { createEvent } }) => {
        const data = proxy.readQuery({ query: fetchEventsQuery });
        // console.log(createEvent);
        proxy.writeQuery({
          query: fetchEventsQuery,
          data: {
            ...data,
            events: [...data.events, createEvent]
          }
        });
      }
    });

    toggleClickHandler();
    formRef.current.reset();
  };

  const renderEvents = () => {
    if (loading) return <Spinner />;

    return <EventList events={data.events} />;
  };

  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }

  return (
    <>
      <Modal
        title="Add Event"
        confirmText="Confirm"
        onCancel={() => { toggleClickHandler(); formRef.current.reset() }}
        onConfirm={onConfirmHandler}
      >
        <StyledForm addEvent ref={formRef}>
          <div>
            <label htmlFor="title">Title <span>(max 35 characters)</span></label>
            <input type="text" id="title" maxLength="35" ref={titleRef} />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" ref={priceRef} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="datetime-local" id="date" ref={dateRef} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="5" ref={descriptionRef} />
          </div>
        </StyledForm>
      </Modal>
      {token && (
        <Wrapper>
          <p>Share your own Events!</p>
          <Button buttonClickHandler={toggleClickHandler}>Create Event</Button>
        </Wrapper>
      )}
      {renderEvents()}
    </>
  );
};

export default Events;
