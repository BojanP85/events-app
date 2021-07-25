import React, { useContext, useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import { expirationMsgVar } from '../../cache';

const CheckToken = ChildComponent => {
  const ComposedComponent = props => {
    const { logout } = useContext(AuthContext);

    const IS_TOKEN_EXPIRED = gql`
      query IsTokenExpired {
        tokenExpirationData @client
      }
    `;

    const { data } = useQuery(IS_TOKEN_EXPIRED, {
      fetchPolicy: "cache-only" // this enables 'logout' function to be called (line 44).
    });

    function usePrevious(value) {
      const ref = useRef();

      useEffect(() => {
        ref.current = value;
      });

      return ref.current;
    }

    const { pathname } = props.location;
    const prevPathname = usePrevious(pathname);
    const { isTokenExpired, expirationMsg } = data.tokenExpirationData;

    useEffect(() => {
      // console.log('tokenExpirationData', data);

      if (prevPathname === '/auth') {
        expirationMsgVar('');
      }

      if (isTokenExpired) {
        logout();
      }
    }, [prevPathname, isTokenExpired, logout]);

    return <ChildComponent {...props} expirationMsg={expirationMsg} />;
  };

  return withRouter(ComposedComponent);
};

export default CheckToken;
