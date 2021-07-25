export const setAccessToken = value => {
  localStorage.setItem('accessToken', value);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setRefreshToken = value => {
  localStorage.setItem('refreshToken', value);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};
