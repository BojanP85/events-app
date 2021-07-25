const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt } = graphql;

const AuthDataType = new GraphQLObjectType({
  name: 'AuthDataType',
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLID) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: new GraphQLNonNull(GraphQLString) }
  })
});

module.exports = AuthDataType;
