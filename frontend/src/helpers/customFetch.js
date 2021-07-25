import jwt_decode from 'jwt-decode';
import { getAccessToken, getRefreshToken, setAccessToken } from './tokenHandling';
import { refreshTokenMutation } from '../mutations/refreshToken';
import { isTokenExpiredVar, expirationMsgVar } from '../cache';

const isTokenValidOrUndefined = () => {
  const token = getAccessToken();
  console.log('customFetch', token);

  if (!token) return true;
  try {
    const { exp } = jwt_decode(token);
    if (Date.now() >= exp * 1000) {
      // token has expired.
      console.log('token expired');
      return false;
    } else {
      return true;
    }
  } catch {
    return false; // token is invalid.
  }
};

export default async (uri, options) => {
  // const initialRequest = await fetch(uri, options); // running initial request before 'refreshTokenMutation' request.

  if (!isTokenValidOrUndefined()) {
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();

    try {
      const response = await fetch('http://localhost:8000/graphql', {
        headers: {
          'content-type': 'application/json',
          'x-access-token': accessToken
        },
        method: 'POST',
        body: refreshTokenMutation(refreshToken)
      });
      // console.log('RESPONSE', response);

      const responseText = await response.text();
      // console.log('RESPONSE_TEXT', responseText);
      const responseTextParsed = await JSON.parse(responseText);
      // console.log('RESPONSE_TEXT_PARSED', responseTextParsed);

      if (responseTextParsed.errors && responseTextParsed.errors.length !== 0) {
        throw new Error(responseTextParsed.errors[0].message);
      }

      const {
        data: {
          refreshToken: { token }
        }
      } = responseTextParsed;

      // console.log('RESPONSE_TOKEN', token);
      setAccessToken(token);
    } catch (err) {
      console.log('session expired');
      console.error(err.message);
      isTokenExpiredVar(true);
      expirationMsgVar(err.message);
      throw err;
    }
  }

  const initialRequest = await fetch(uri, options); // running initial request after 'refreshTokenMutation' request.
  return initialRequest;
};
