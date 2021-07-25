import React from 'react';

import { Wrapper, Loading } from './SpinnerCSS';

const Spinner = props => {
  return (
    <Wrapper BookEvent={props.BookEvent}>
      <Loading>
        <div></div>
        <div></div>
      </Loading>
    </Wrapper>
  );
};

export default Spinner;
