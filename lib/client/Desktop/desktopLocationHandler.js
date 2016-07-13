// Sets up a listener for the location data and expects to receive an object
// with the location data in the form of {cords: {accuracy:21, altitude:null,
// altitudeAccuracy:null, heading:null, latitude:33.9794281, longitude:-118.42238250000001,
// speed:null}, timestamp:time data was pulled}.
// Accepts 1 argument:
// 1. A callback function that will be run every time the location event is triggered.
const desktopLocationHandler = callback => {
  if (imperio.webRTCSupport.support === true) {
    imperio.dataChannel.onmessage = event => {
      if (callback) callback(JSON.parse(event.data).locationObject);
    };
  } else {
    imperio.socket.on('geoLocation', locationObject => {
      if (callback) callback(locationObject);
    });
  }
};

module.exports = desktopLocationHandler;
