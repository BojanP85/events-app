const DataLoader = require('dataloader');

exports.loader = modelParameter => new DataLoader(async ids => {
  let results = await modelParameter.find({ _id: { $in: ids } });

  const resultMap = {};
  results.forEach(result => {
    resultMap[result._id] = result;
  });
  // console.log(resultMap); // example of DataLoader at work: consider booking two different events, where first one is booked three times and second one is booked two times. so we have 5 booked events in total. on the other hand, inside console.log we can see only two objects returned from database, because DataLoader grouped together three booked events into one request (object) and two booked events into second request (object).

  return ids.map(id => resultMap[id]);
});
