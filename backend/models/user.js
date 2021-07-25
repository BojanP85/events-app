const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { ApolloError } = require('apollo-server'); // 'ApolloError' version (no need for 'CustomError' class)
const CustomError = require('../helpers/CustomError');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

// let refreshTokens = [];

function generateAccessToken(userId) {
  return jwt.sign(userId, 'somesupersecretkey', { expiresIn: '15m' });
}

UserSchema.statics.signup = async function(email, password) {
  const User = mongoose.model('User');

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('E-mail in use.', 'email');

      // 'ApolloError' version (no need for 'CustomError' class)
      // throw new ApolloError('E-mail in use.', '', { type: 'email' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword
    });
    const result = await user.save();
    return {
      ...result._doc,
      password: null
    };
  } catch (err) {
    console.error(err);
    err.message = {
      type: err.type,
      description: err.message
    };
    throw err;

    // 'ApolloError' version (no need for 'CustomError' class)
    /*
    console.error(err);
    throw err;
    */
  }
}

UserSchema.statics.login = async function(email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new CustomError('Invalid e-mail.', 'email');

      // 'ApolloError' version (no need for 'CustomError' class)
      // throw new ApolloError('Invalid e-mail.', '', { type: 'email' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new CustomError('Invalid password.', 'password');

      // 'ApolloError' version (no need for 'CustomError' class)
      // throw new ApolloError('Invalid password.', '', { type: 'password' });
    }

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = jwt.sign(
      { userId: user.id },
      'somesupersecretrefreshtokenkey',
      { expiresIn: '7d' }
    );
    // refreshTokens.push(refreshToken);

    return {
      userId: user.id,
      token: accessToken,
      refreshToken: refreshToken
    };
  } catch (err) {
    console.error(err);
    err.message = {
      type: err.type,
      description: err.message
    };
    throw err;

    // 'ApolloError' version (no need for 'CustomError' class)
    /*
    console.error(err);
    throw err;
    */
  }
}

/*
UserSchema.statics.logout = async function(accessToken) {
  refreshTokens = refreshTokens.filter(token => token !== accessToken);

  return {
    userId: '',
    token: '',
    refreshToken: ''
  };
}
*/

UserSchema.statics.refreshToken = async function(refreshJwtToken) {
  if (refreshJwtToken === null) {
    throw new CustomError('Unauthorized.');
  };

  /*
  if (!refreshTokens.includes(refreshJwtToken)) {
    throw new CustomError('Forbidden.');
  };
  */

  try {
    const decodedToken = jwt.verify(refreshJwtToken, 'somesupersecretrefreshtokenkey');
    const accessToken = generateAccessToken({ userId: decodedToken.userId });
    return {
      token: accessToken
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new CustomError('Session expired. Please log in to continue.');
    }

    throw err;
  }
}

mongoose.model('User', UserSchema);
