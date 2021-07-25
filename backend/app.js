const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token, x-refresh-token');
  res.setHeader('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

// app.get('/', (req, res, next) => {
//   res.send('Hello World!!!');
// });

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@event-booking-graphql-87h5k.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  app.listen(8000, () => {
    console.log('Listening...');
  });
}).catch(err => {
  console.log(err);
});
