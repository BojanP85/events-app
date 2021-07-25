import { InMemoryCache, makeVar } from '@apollo/client';

export const isTokenExpiredVar = makeVar(!!localStorage.getItem("x-refresh-token"));
export const expirationMsgVar = makeVar('');

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        bookings: {
          merge: false
        },
        tokenExpirationData: {
          read() {
            return {
              isTokenExpired: isTokenExpiredVar(),
              expirationMsg: expirationMsgVar()
            };
          }
        }
      }
    }
  }
});
