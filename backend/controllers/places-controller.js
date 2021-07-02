const { v4: uuid_v4 } = require('uuid');
const {validationResult} = require("express-validator");

const HttpError = require("../models/http-error");

let PLACES = [
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
  console.log("GET all");
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId; //{placeid:"the value"}
  //console.log("GET request in places");
  const places = PLACES.filter((p) => p.ownerId === userId);

  if (!places || places.length === 0) {
    return next(new HttpError("user id is invalid.", 404));
  }

  res.json({ place: places });
};

const addPlace = (req, res, next) => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param, value, nestedErrors }) => {
      // Build your resulting errors however you want! String, object, whatever - it works!
      return `${param} has ${msg} >>> ${value}`;
    }
  );
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    // return res.json({ errors: result.array() });
    let errorMessage = "";
    result.array().forEach((element) => {
      errorMessage += element + "\n";
    });
    throw new HttpError(errorMessage, 422);
  }
  const { title, description, location, address, ownerId } = req.body;  

  const place = {
    id: uuid_v4(),
    title: title,
    description: description,
    location: location,
    address: address,
    ownerId : ownerId,
  }
  PLACES.push(place);

  res.status(201).json({place : place})

  console.log("POST received.");
};

const updatePlaceById = (req, res, next) => {
  const result = validationResult(req).formatWith(
    ({ location, msg, param, value, nestedErrors }) => {
      // Build your resulting errors however you want! String, object, whatever - it works!
      return `${param} has ${msg} >>> ${value}`;
    }
  );
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    // return res.json({ errors: result.array() });
    let errorMessage = "";
    result.array().forEach((element) => {
      errorMessage += element + "\n";
    });
    throw new HttpError(errorMessage, 422);
  }
  
  const { title, description, } = req.body;

  const placeId = req.params.placeId; //{placeid:"the value"}
  const place = PLACES.find((item) => item.id === placeId);

  const updatedPlace = {
    ...place,
    id: placeId,
    title: title,
    description: description,    
  }
  let n = PLACES.findIndex(item=>item.id===placeId);
  // console.log("PATCH received.", n);
  PLACES[n] = updatedPlace;

  // We send 200 code because there were no adding operation, just update
  res.status(200).json({place : updatedPlace});
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.placeId; //{placeid:"the value"}
  if(!PLACES.find(item=>item.id === placeId)){
    throw new HttpError("the placeid you provided not found.", 404);
  }
  PLACES = PLACES.filter(item=>item.id !== placeId);

  res.status(201).json({PLACES});  
}

exports.getAllPlaces = getAllPlaces;
exports.getPlacebyId = getPlacebyId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.addPlace = addPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
