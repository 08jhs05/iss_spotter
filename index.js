const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for(passTime of passTimes){
    console.log('Next pass at ' + new Date(passTime.risetime * 1000) + ' for ' + passTime.duration + ' seconds!');
  }
});