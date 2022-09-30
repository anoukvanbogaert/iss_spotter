// this will run our main fetch function

const {fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes,ip,coords} = require('./iss');

fetchMyIP((error,ip) => {
  if (error) {
    console.log("it didn't work!",error);
    return;
  }
  console.log("it worked! Returned IP: ",ip);

  fetchCoordsByIP(ip,(error,coords) => {
    if (error) {
      console.log("The IP address isn't valid",error);
      return;
    }
    console.log(coords);
    fetchISSFlyOverTimes(coords,(error,data) => {
      if (error) {
        console.log('error: ');
        return;
      }
      console.log(data);
    });
  });
});

