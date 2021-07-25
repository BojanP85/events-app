import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import ToggleContext from '../../contexts/ToggleContext';
import { Wrapper } from './BackdropCSS';

const Backdrop = props => {
  const { toggledOn } = useContext(ToggleContext);

  return ReactDOM.createPortal(
    <Wrapper showBackdrop={toggledOn} Modal={props.Modal}>
      {props.children}
    </Wrapper>,
    document.getElementById('backdrop')
  );
};

export default Backdrop;
