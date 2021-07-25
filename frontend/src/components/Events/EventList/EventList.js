import React from 'react';

import { ToggleStore } from '../../../contexts/ToggleContext';
import { StyledList } from '../../../styles/list';
import EventItem from '../EventItem/EventItem';

const EventList = props => {
  const renderList = () => {
    return props.events.map(event => {
      return (
        <ToggleStore key={event._id}>
          <EventItem event={event} />
        </ToggleStore>
      );
    });
  };

  return (
    <StyledList>{renderList()}</StyledList>
  );
};

export default EventList;
