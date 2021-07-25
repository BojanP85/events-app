import React from 'react';

import { Wrapper } from './BookingControlsCSS';

const BookingControls = props => {
  const classNameList = props.activeOutputType === 'list' ? 'active' : '';
  const classNameChart = props.activeOutputType === 'chart' ? 'active' : '';

  return (
    <Wrapper>
      <div className={classNameList}>
        <button className={classNameList} onClick={() => props.changeOutputType('list')}>
          List
        </button>
      </div>
      <div className={classNameChart}>
        <button className={classNameChart} onClick={() => props.changeOutputType('chart')}>
          Chart
        </button>
      </div>
      <hr />
    </Wrapper>
  );
};

export default BookingControls;
