// will contain most of the logic for fetching the data from each API endpoint
const request = require("request");

let ip = "";
let coords = {};

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json',(error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};


const fetchCoordsByIP = function(ip,callback) {
  request(`http://ipwho.is/${ip}`,(error,response,body) => {
    const ipCheck = JSON.parse(body).success;
    const ipMsg = JSON.parse(body).message;
    console.log(ipCheck);
    if (!ipCheck) {
      const message = `Success status was ${ipCheck}. Server message says: ${ipMsg} when fetching for IP ${ip}`;
      callback(Error(message),null);
      return;
    }
    coords.latitude = JSON.parse(body).latitude;
    coords.longitude = JSON.parse(body).longitude;
    callback(null,coords);
  });
};

const fetchISSFlyOverTimes = function(coords,callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,(error,response,body) => {
    if (error) {
      const msg = `invalid coordinates`;
      callback(Error(msg),null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `statuscode = 200`;
      callback(Error(msg),null);
      return;
    }
    callback(null,body);
  });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  ip
};