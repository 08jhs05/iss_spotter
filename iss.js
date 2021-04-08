const request = require('request');

const urlIP = 'https://api.ipify.org';
const urlGEO = 'https://freegeoip.app/json/'
const urlISSPos = 'http://api.open-notify.org/iss-pass.json?';


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);;
    }

    fetchCoordsByIP(ip, (err, data) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(data, (err2, data2) => {
        if (err2) {
          return callback(err2, null);
        }

        callback(null, data2);
      });
    })
  });
}


const fetchMyIP = function(callback) { 
  request(urlIP, (error, response, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, ip);
  });
}

const fetchCoordsByIP = function(ip, callback){
  request(urlGEO + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body)
    callback(null, { latitude, longitude });
  });
}

const fetchISSFlyOverTimes = function(coords, callback) {
  const urlWithCoordQuery = `${urlISSPos}lat=${coords.latitude}&lon=${coords.longitude}`;

  request(urlWithCoordQuery, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const issResponse = JSON.parse(body).response;
    callback(null, issResponse);
  });
};


module.exports = { nextISSTimesForMyLocation };
