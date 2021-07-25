import React from 'react';
import { withRouter } from 'react-router-dom';

import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../helpers/tokenHandling';
import { isTokenExpiredVar } from '../cache';

const Context = React.createContext({
  userId: null,
  token: null,
  refreshToken: null,
  login: (token, userId, refreshToken) => {},
  logout: () => {}
});

class AuthStore extends React.Component {
  state = {
    userId: localStorage.getItem('userId'),
    token: getAccessToken(),
    refreshToken: getRefreshToken()
  };

  login = (token, userId, refreshToken) => {
    localStorage.setItem('userId', userId);
    setAccessToken(token);
    setRefreshToken(refreshToken);
    this.setState({ userId, token, refreshToken });
  };

  logout = () => {
    this.props.history.push('/');
    isTokenExpiredVar(false);
    localStorage.clear();
    this.setState({ userId: null, token: null, refreshToken: null });
  };

  render() {
    return (
      <Context.Provider value={{ ...this.state, login: this.login, logout: this.logout }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const AuthStoreWithRouter = withRouter(AuthStore);

export { AuthStoreWithRouter as AuthStore };
export default Context;
