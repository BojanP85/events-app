const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } = graphql;
const EventType = require('./event_type');
const Event = mongoose.model('Event');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    createdEvents: {
      type: new GraphQLList(new GraphQLNonNull(EventType)),
      resolve(parentValue) { // 'parentValue' is UserType.
        // we are not making use of DataLoader inside this resolve function, because we are currently not making any requests regarding all created events of the particular user (look at the 'src/queries/fetchEvents.js' and 'src/queries/fetchBookings.js'). if we would like to query all created events of the particular user (for example, 'creator { _id createdEvents { title } }' inside 'fetchEvents.js' or 'user { createdEvents { title } }' inside 'fetchBookings.js'), then we would add DataLoader logic here as well. in that case 'return' statement would look like: return eventLoader.loadMany(parentValue.createdEvents);
        return Event.findEvents(parentValue.id);
      }
    }
  })
});

module.exports = UserType;
