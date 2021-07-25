import React, { useContext } from 'react';

import AuthContext from '../../contexts/AuthContext';
import ToggleContext from '../../contexts/ToggleContext';
import { Wrapper } from './ModalCSS';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const Modal = props => {
  const { token, userId } = useContext(AuthContext);
  const { toggledOn } = useContext(ToggleContext);

  const disableButton = () => {
    return props.loading ? true : false;
  };

  const renderButtons = () => {
    return token && userId !== props.creatorId ? (
      <>
        <Button buttonClickHandler={props.onConfirm} disabled={disableButton()}>{props.confirmText}</Button>
        <Button buttonClickHandler={props.onCancel} disabled={disableButton()}>Cancel</Button>
      </>
    ) : (
      <Button buttonClickHandler={props.onCancel}>Close</Button>
    )
  };

  return (
    <Backdrop Modal>
      <Wrapper showModal={toggledOn}>
        <header>
          <h1>{props.title}</h1>
        </header>
        <section>
          {props.children}
        </section>
        <section>
          {renderButtons()}
        </section>
      </Wrapper>
    </Backdrop>
  );
};

export default Modal;
