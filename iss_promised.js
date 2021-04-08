const request = require('request-promise-native');

const urlIP = 'https://api.ipify.org';
const urlGEO = 'https://freegeoip.app/json/'
const urlISSPos = 'http://api.open-notify.org/iss-pass.json?';

const fetchMyIP = function() { 
  return request(urlIP);
}

const fetchCoordsByIP = function(ip){
  return request(urlGEO + ip);
}


const fetchISSFlyOverTimes = function(data) {
  const { latitude, longitude } = JSON.parse(data)
  const urlWithCoordQuery = `${urlISSPos}lat=${latitude}&lon=${longitude}`;
  return request(urlWithCoordQuery);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };