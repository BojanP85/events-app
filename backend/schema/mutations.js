const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const EventType = require('./types/event_type');
const UserType = require('./types/user_type');
const Event = mongoose.model('Event');
const User = mongoose.model('User');
const BookingType = require('./types/booking_type');
const Booking = mongoose.model('Booking');
const AuthDataType = require('./types/auth_data_type');

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createEvent: {
      type: EventType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) {
        return Event.createEvent(args, req);
      }
    },
    createUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }) {
        return User.signup(email, password);
      }
    },
    refreshToken: {
      type: new GraphQLNonNull(AuthDataType),
      args: {
        refreshJwtToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { refreshJwtToken }, req) {
        return User.refreshToken(refreshJwtToken);
      }
    },
    bookEvent: {
      type: new GraphQLNonNull(BookingType),
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { eventId }, req) {
        return Booking.bookEvent(eventId, req);
      }
    },
    cancelBooking: {
      type: new GraphQLNonNull(EventType),
      args: {
        bookingId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { bookingId }, req) {
        return Booking.cancelBooking(bookingId, req);
      }
    }
  }
});

module.exports = mutation;
