const { nextISSTimesForMyLocation } = require('./iss_promised');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    let riseTime = new Date(pass.risetime * 1000).toLocaleString('en-US', { timeZone: 'America/Vancouver' });
    const duration = pass.duration;
    console.log(`Next pass at ${riseTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


// .then(body => console.log(JSON.parse(body).ip));



// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   printPassTimes(passTimes);
// });