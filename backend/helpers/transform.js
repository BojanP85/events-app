const { dateToString } = require('./date');

exports.transformBooking = booking => {
  return {
    ...booking._doc,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date)
  };
};
