const HttpError = require("../models/http-error");

const PLACES = [
  {
    id: "p1",
    title: "TAJ MAHAL",
    description: "The most famous traditional islamic palace in india.",
    location: {
      lat: 33242423,
      lng: 65645464,
    },
    address: "India ,..............",
    ownerId: "u1",
  },
  {
    id: "p2",
    title: "Brandenbutger Tor",
    description: "The most famous traditional islamic palace in india.",
    location: {
      lat: 33242423,
      lng: 65645464,
    },
    address: "Germany ,..............",
    ownerId: "u1",
  },
];

const getAllPlaces = (req, res, next) => {
  //console.log("GET request in places");
  res.json(PLACES);
};

const getPlacebyId = (req, res, next) => {
  const placeId = req.params.placeId; //{placeid:"the value"}
  //console.log("GET request in places");
  const place = PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("place id is invalid.", 404);
  }

  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.userId; //{placeid:"the value"}
  //console.log("GET request in places");
  const place = PLACES.find((p) => p.ownerId === userId);

  if (!place) {
    return next(new HttpError("user id is invalid.", 404));
  }

  res.json({ place });
};

exports.getAllPlaces = getAllPlaces;
exports.getPlacebyId = getPlacebyId;
exports.getPlaceByUserId = getPlaceByUserId;
