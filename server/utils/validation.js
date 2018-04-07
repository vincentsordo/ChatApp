let isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

let isValidCoordinates = (latitude, longitude) => {
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude >= 180;
}

module.exports = {
  isRealString,
  isValidCoordinates
};
