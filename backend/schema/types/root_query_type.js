const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } = graphql;
const EventType = require('./event_type');
const BookingType = require('./booking_type');
const AuthDataType = require('./auth_data_type');
const Event = mongoose.model('Event');
const Booking = mongoose.model('Booking');
const User = mongoose.model('User');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    events: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EventType))),
      resolve() {
        return Event.findEvents();
      }
    },
    bookings: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BookingType))),
      resolve(parentValue, args, req) {
        return Booking.findBookedEvents(req);
      }
    },
    login: {
      type: new GraphQLNonNull(AuthDataType),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }) {
        return User.login(email, password);
      }
    }
  }
});

module.exports = RootQueryType;
