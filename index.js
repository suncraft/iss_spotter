// // const request = require('request');
// const { fetchMyIP, fetchCoordsByIP } = require('./iss');


// // fetchMyIP((error, ip) => {
// //   if (error) {
// //     console.log("It didn't work!" , error);
// //     return;
// //   }
// //   // if (ip) {
// //   // }
// //   console.log('It worked! Returned IP:' , ip);
// // });


// fetchCoordsByIP(('66.183.212.231', (error, callback) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
  
//   console.log('It worked! Returned coordinates:' , myCoords);

// }));

// index.js


// // The code below is temporary and can be commented out.
// const { fetchISSFlyOverTimes } = require('./iss');

// const exampleCoords = { latitude: '49.1963', longitude: '-122.8106' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });

// http://api.open-notify.org/iss-pass.json?lat=49.1963&lon=-122.8106


const { nextISSTimesForMyLocation } = require('./iss');


// ************************** I only added Chan-oon Na's date code to the class code below. 
// **************************

/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    // const datetime = new Date(0);
    // datetime.setUTCSeconds(pass.risetime);
    let riseTime = new Date(pass.risetime * 1000).toLocaleString('en-US', { timeZone: 'America/Vancouver' });
    const duration = pass.duration;
    console.log(`Next pass at ${riseTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});