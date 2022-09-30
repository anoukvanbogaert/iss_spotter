// this will run our main fetch function

const {nextISSTimesForMyLocation} = require('./iss');


const printPasstimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error,passTimes) => {
  if (error) {
    return console.log("It didn't work!",error);
  }
  printPasstimes(passTimes);
});
// fetchMyIP((error,ip) => {
//   if (error) {
//     console.log("it didn't work!",error);
//     return;
//   }
//   console.log("it worked! Returned IP: ",ip);

//   fetchCoordsByIP(ip,(error,coords) => {
//     if (error) {
//       console.log("The IP address isn't valid",error);
//       return;
//     }
//     console.log(coords);
//     fetchISSFlyOverTimes(coords,(error,data) => {
//       if (error) {
//         console.log('error: ');
//         return;
//       }
//       console.log(data);
//     });
//   });
// });

