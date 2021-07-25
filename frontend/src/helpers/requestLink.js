import { ApolloLink, Observable } from '@apollo/client';
import { getAccessToken, getRefreshToken } from './tokenHandling';

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();
          const refreshToken = getRefreshToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                // Authorization: `Bearer ${accessToken}`,
                'x-access-token': accessToken,
                'x-refresh-token': refreshToken
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);
