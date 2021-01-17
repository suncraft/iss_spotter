const request = require('request');

// // https://freegeoip.app/json/

// // const fetchMyIP = function(callback) {
// //   request('https://api.ipify.org?format=json', (error, response, body) => {
// //     if (error) return callback(error, null);

// //     if (response.statusCode !== 200) {
// //       callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
// //       return;
// //     }

// //     const ip = JSON.parse(body).ip;
// //     callback(null, ip);
// //   });
// // };

// ******************************* included code below!  *** NOT MINE

// const fetchCoordsByIP = function(ip, callback) {
//   request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     // if (response.statusCode !== 200) {
//     //   callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
//     //   // const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
//     //   // callback(Error(msg), null);
//     //   return;
//     // }

//     const neededThis = JSON.parse(body);
//     const myCoords = { lat: neededThis.latitude, long: neededThis.longitude}
//     // const { latitude, longitude } = JSON.parse(body);
//     // const coords = JSON.parse(body).latitude

//     callback(null, myCoords);

//   });
// }

// module.exports = { fetchCoordsByIP };


// *****  my code below, it worked, but my error responses were weird *************

// /**
//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"
//  */
// // const fetchMyIP = function(callback) {
// //   // use request to fetch IP address from JSON API
// //   // https://api.ipify.org?format=json
// //   request('https://api.ipify.org?format=json', (error, response, body) => {
// //     const data = JSON.parse(body);
    
// //     // console.log(typeof data);
// //     if (!error && data) {
// //       console.log(data.ip);
// //       return;
// //     } else {
// //       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// //       console.log('error:', error); // Print the error if one occurred
// //       callback(error, null);
// //       return;
// //     }
// //   });
// // };

// const fetchISSFlyOverTimes = function(coords, callback) {
//   const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//       return;
//     }

//     const passes = JSON.parse(body).response;
   // // let riseTime = new Date(timestamp.risetime * 1000).toLocaleString('en-US', { timeZone: 'America/Vancouver' })
//     callback(null, passes);
//   });
// };

// // Don't need to export the other functions since we are not testing them right now.
// module.exports = { fetchISSFlyOverTimes };

// iss.js


// ************************** This is the class's code, not really mine.  
// **************************


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    // console.log('lat/lng data:', { latitude, longitude });

    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { nextISSTimesForMyLocation };