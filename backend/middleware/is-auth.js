const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authToken = req.headers["x-access-token"];

  if (!authToken || authToken === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(authToken, 'somesupersecretkey', { ignoreExpiration: true });
    console.log('decodedToken', decodedToken);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
}
