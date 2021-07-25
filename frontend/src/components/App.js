import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';

import AuthContext from '../contexts/AuthContext';
import { ToggleStore } from '../contexts/ToggleContext';
// import { ErrorStore } from '../contexts/ErrorContext'; // 'ErrorContext' alternative.
import Auth from './Auth/Auth';
import Events from './Events/Events';
import Bookings from './Bookings/Bookings';
import MainNavigation from './MainNavigation/MainNavigation';
import SideDrawer from './SideDrawer/SideDrawer';
import CheckToken from './hoc/CheckToken';

const Main = styled.main`
  margin: 8rem 2.5rem;
`;

class App extends React.Component {
  static contextType = AuthContext;

  render() {
    const { token } = this.context;

    return (
      <>
        <ToggleStore>
          <SideDrawer />
          <MainNavigation />
        </ToggleStore>
        <Main>
          <Switch>
            {token && <Redirect from="/" to="/events" exact />}
            {token && <Redirect from="/auth" to="/events" exact />}
            {!token && <Route path="/auth" render={() => <Auth expirationMsg={this.props.expirationMsg} />} />}
            <Route
              path='/events'
              render={props => (
                <ToggleStore>
                  {/* <ErrorStore> 'ErrorContext' alternative. */}
                  <Events {...props} />
                  {/* </ErrorStore> 'ErrorContext' alternative. */}
                </ToggleStore>
              )}
            />
            {token && <Route path="/bookings" component={Bookings} />}
            {!token && <Redirect to="/auth" exact />}
          </Switch>
        </Main>
      </>
    );
  }
}

export default CheckToken(App);
