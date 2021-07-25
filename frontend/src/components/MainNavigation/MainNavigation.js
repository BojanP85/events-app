import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import ToggleContext from '../../contexts/ToggleContext';
import { Header, Logo, Navigation, MobileNavToggle } from './MainNavigationCSS';
import Button from '../Button/Button';

const MainNavigation = () => {
  const { token, logout } = useContext(AuthContext);
  const { toggledOn, toggleClickHandler } = useContext(ToggleContext);

  return (
    <Header>
      <Logo>
        <h1>EasyEvent</h1>
      </Logo>
      <Navigation>
        <ul>
          {!token && <li><NavLink to="/auth">Authenticate</NavLink></li>}
          <li><NavLink to="/events">Events</NavLink></li>
          {token && (
            <>
              <li><NavLink to="/bookings">Bookings</NavLink></li>
              <li><Button buttonClickHandler={logout} Logout>Logout</Button></li>
            </>
          )}
        </ul>
      </Navigation>
      <MobileNavToggle showSideDrawer={toggledOn} onClick={toggleClickHandler}>
        <span />
        <span />
        <span />
      </MobileNavToggle>
    </Header>
  );
};

export default MainNavigation;
