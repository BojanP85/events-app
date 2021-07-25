import React from 'react';

import { StyledRibbon } from './RibbonCSS';

const Ribbon = props => (
  <StyledRibbon Booked={props.Booked}>
    <span>{props.children}</span>
  </StyledRibbon>
);

export default Ribbon;
