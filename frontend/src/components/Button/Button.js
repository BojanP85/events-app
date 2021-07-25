import React from 'react';

import { StyledButton } from './ButtonCSS';

const Button = props => (
  <StyledButton
    type={props.type}
    onClick={props.buttonClickHandler}
    Logout={props.Logout}
    disabled={props.disabled}
  >
    {props.children}
  </StyledButton>
);

export default Button;
