const axios = require("axios");

const HttpError = require("../models/http-error");

const ACCESS_TOKEN =
  "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg";

const geocode = async (s_address) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${s_address}.json?access_token=${ACCESS_TOKEN}`
  );
  const data = response.data;
  console.log(response.data);
  if (!data || data.features.length <= 0) {
    throw new HttpError("address not found.", 422);
  }

  const coordinates = {
    lat: data.features[0].geometry.coordinates[1],
    lng: data.features[0].geometry.coordinates[0],
  };
  return coordinates;
};

exports.geocode = geocode;

// var geo = require("mapbox-geocoding");

// geo.setAccessToken(
//   "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg"
// );

// const geoCode = async (s_address) => {
//   // Geocode an address to coordinates
//   geo.geocode("mapbox.places", s_address, function (err, geoData) {
//     console.log(geoData.features[0].geometry.coordinates[0]);
//     if (!err) {
//       const coordinates = {
//         lat: geoData.features[0].geometry.coordinates[0],
//         lng: geoData.features[0].geometry.coordinates[1],
//       };
//       return coordinates;
//     }
//   });
// };

// // Reverse geocode coordinates to address.
// const geoCodeReverse = (o_coordinates) => {
//   geo.reverseGeocode(
//     "mapbox.places",
//     o_coordinates.lat,
//     o_coordinates.lng,
//     function (err, geoData) {
//       // console.log(geoData);
//     }
//   );
// };

// exports.geoCode = geoCode;
