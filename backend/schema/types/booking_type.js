const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = graphql;
const { loader } = require('../../helpers/dataloader');
const EventType = require('./event_type');
const UserType = require('./user_type');
const Event = mongoose.model('Event');
const User = mongoose.model('User');

const eventLoader = loader(Event);

const BookingType = new GraphQLObjectType({
  name: 'BookingType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    event: {
      type: new GraphQLNonNull(EventType),
      resolve(parentValue) { // 'parentValue' is BookingType.
        return Event.findSingleEvent(parentValue.event.toString(), eventLoader);
        // return Event.findSingleEvent(parentValue.event); // we would write this line of code if we wouldn't make use of DataLoader.
      }
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve(parentValue) { // 'parentValue' is BookingType.
        // we are not making use of DataLoader inside this resolve function, because we are currently not making any requests regarding the creator of the booking (look at the 'src/queries/fetchBookings.js'). if we would like to query the creator of the booking (for example, 'user { _id email }'), then we would add DataLoader logic here as well.
        return User.findById(parentValue.user);
      }
    },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) }
  })
});

module.exports = BookingType;
