export const refreshTokenMutation = refreshToken => {
  return JSON.stringify({
    variables: { refreshJwtToken: refreshToken },
    query: `mutation refreshToken($refreshJwtToken: String!) {
      refreshToken(refreshJwtToken: $refreshJwtToken) {
        token
      }
    }`
  });
};
