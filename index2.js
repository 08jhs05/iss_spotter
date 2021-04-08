const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(body => fetchISSFlyOverTimes(body))
//   .then(body => {
//         for(passTime of JSON.parse(body).response){
//           console.log('Next pass at ' + new Date(passTime.risetime * 1000) + ' for ' + passTime.duration + ' seconds!');
//         }
//       }
//   );
//console.log(typeof prom);

nextISSTimesForMyLocation().then(body => {
    for(passTime of body){
      console.log('Next pass at ' + new Date(passTime.risetime * 1000) + ' for ' + passTime.duration + ' seconds!');
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });