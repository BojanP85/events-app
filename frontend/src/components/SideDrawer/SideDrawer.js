import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import ToggleContext from '../../contexts/ToggleContext';
import { Navigation } from './SideDrawerCSS';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

const SideDrawer = () => {
  const { token, logout } = useContext(AuthContext);
  const { toggledOn, toggleClickHandler } = useContext(ToggleContext);

  return (
    <Backdrop>
      <Navigation showSideDrawer={toggledOn}>
        <ul>
          {!token && (
            <li><NavLink to="/auth" onClick={toggleClickHandler}>Authenticate</NavLink></li>
          )}
          <li><NavLink to="/events" onClick={toggleClickHandler}>Events</NavLink></li>
          {token && (
            <>
              <li><NavLink to="/bookings" onClick={toggleClickHandler}>Bookings</NavLink></li>
              <li><Button buttonClickHandler={() => { logout(); toggleClickHandler() }} Logout>Logout</Button></li>
            </>
          )}
        </ul>
      </Navigation>
    </Backdrop>
  );
};

export default SideDrawer;
