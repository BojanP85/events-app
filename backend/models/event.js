const mongoose = require('mongoose');
const { transformEvent } = require('../helpers/transform');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// EventSchema.statics.findEvents = async function(userId) {
//   const findParameter = (userId) ? { creator: userId } : {};
//
//   try {
//     const events = await this.find(findParameter);
//     return events.map(event => {
//       return transformEvent(event);
//     });
//   } catch (err) {
//     throw err;
//   }
// }
EventSchema.statics.findEvents = async function() {
  try {
    const events = await this.find({});
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
}

EventSchema.statics.findSingleEvent = async function(eventId, eventLoader) {
  try {
    const singleEvent = await eventLoader.load(eventId.toString());
    // const singleEvent = await this.findById(eventId); // we would write this line of code if we wouldn't make use of DataLoader.
    return transformEvent(singleEvent);
  } catch (err) {
    throw err;
  }
}

EventSchema.statics.createEvent = async function(args, req) {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
  }

  const Event = mongoose.model('Event');
  const User = mongoose.model('User');

  // const result = await (new Event({ title, description, price, date })).save(); - alternativa kodu ispod. u ovom slucaju nam ne treba deklaracija 'const event = new Event({});'.
  const event = new Event({
    title: args.title,
    description: args.description,
    price: +args.price,
    date: new Date(args.date),
    creator: req.userId
  });
  let createdEvent;

  try {
    const result = await event.save();
    createdEvent = transformEvent(result);
    const creator = await User.findById(req.userId);
    if (!creator) {
      throw new Error('User not found.');
    }
    creator.createdEvents.push(event);
    await creator.save();
    return createdEvent;
  } catch (err) {
    throw err;
  }
}

mongoose.model('Event', EventSchema);
