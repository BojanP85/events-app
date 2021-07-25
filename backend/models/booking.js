const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const { transformBooking, transformEvent } = require('../helpers/transform');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

BookingSchema.statics.findBookedEvents = async function(req) {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
  }

  try {
    const bookings = await this.find({ user: req.userId });
    return bookings.map(booking => {
      return transformBooking(booking);
    });
  } catch (err) {
    throw err;
  }
}

BookingSchema.statics.bookEvent = async function(eventId, req) {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
  }

  const Booking = mongoose.model('Booking');

  try {
    const fetchedEvent = await Event.findOne({ _id: eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  } catch (err) {
    throw err;
  }
}

BookingSchema.statics.cancelBooking = async function(bookingId, req) {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
  }

  try {
    const booking = await this.findById(bookingId);
    const unbookedEvent = await Event.findOne({ _id: booking._doc.event });
    await this.deleteOne({ _id: bookingId });
    return transformEvent(unbookedEvent);
  } catch (err) {
    throw err;
  }

  /* alternativa sa '.then' statement-om:
  let bookedEventId;
  return Booking.findById(bookingId)
    .then(booking => {
      bookedEventId = booking._doc.event;
      return Booking.deleteOne({ _id: bookingId });
    })
    .then(booking => {
      return Event.findOne({ _id: bookedEventId })
    })
    .then(unbookedEvent => {
      return transformEvent(unbookedEvent);
    })
    .catch(err => {
      console.log(err);
      throw err;
    }); */
}

mongoose.model('Booking', BookingSchema);
