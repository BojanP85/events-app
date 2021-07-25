const mongoose = require('mongoose');
const graphql = require('graphql');
const { loader } = require('../../helpers/dataloader');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat } = graphql;
const User = mongoose.model('User');
const Booking = mongoose.model('Booking');

const userLoader = loader(User);

const EventType = new GraphQLObjectType({
  name: 'EventType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    creator: {
      type: new GraphQLNonNull(require('./user_type')),
      resolve(parentValue) { // 'parentValue' is EventType.
        return userLoader.load(parentValue.creator.toString());
        // return User.findById(parentValue.creator); // we would write this line of code if we wouldn't make use of DataLoader.
      }
    },
    booking: {
      type: require('./booking_type'),
      resolve(parentValue, args, req) { // 'parentValue' is EventType.
        return Booking.findOne({ user: req.userId, event: parentValue._id });
      }
    }
  })
});

module.exports = EventType;
