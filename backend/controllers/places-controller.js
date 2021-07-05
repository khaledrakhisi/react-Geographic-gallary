const { v4: uuid_v4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const geocoding = require("../util/geocoding");
const Place = require("../models/Place");

// let PLACES = [
//   {
//     id: "p1",
//     title: "TAJ MAHAL",
//     description: "The most famous traditional islamic palace in india.",
//     location: {
//       lat: 33242423,
//       lng: 65645464,
//     },
//     address: "India ,..............",
//     ownerId: "u1",
//   },
//   {
//     id: "p2",
//     title: "Brandenbutger Tor",
//     description: "The most famous traditional islamic palace in india.",
//     location: {
//       lat: 33242423,
//       lng: 65645464,
//     },
//     address: "Germany ,..............",
//     ownerId: "u1",
//   },
// ];

const getAllPlaces = async (req, res, next) => {
  let places = null;
  try {
    places = await Place.find();
  } catch (err) {
    return next(new HttpError("something wrong with the database!", 500));
  }
  //const place = PLACES.find((p) => p.id === placeId);

  if (!places) {
    return next(new HttpError("no place found.", 404));
  }

  res.json({ places: places });
};

const getPlacebyId = async (req, res, next) => {
  const placeId = req.params.placeId; //{placeid:"the value"}

  let place = null;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("something wrong with the database!", 500));
  }
  //const place = PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(new HttpError("place id is invalid.", 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId; //{placeid:"the value"}
  let places = null;
  try {
    places = await Place.find({ userId: userId });
  } catch (err) {
    return next(new HttpError("something's wrong with the database!", 500));
  }
  //const place = PLACES.find((p) => p.id === placeId);

  if (!places || places.length === 0) {
    return next(new HttpError("no place found.", 404));
  }

  res.json({ places: places.map((item) => item.toObject({ getters: true })) });
};

const addPlace = async (req, res, next) => {
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
    return next(HttpError(errorMessage, 422));
  }
  const { title, description, address, userId } = req.body;

  let coordinates = null;
  try {
    coordinates = await geocoding.geocode(address);
    // console.log(coordinates);
  } catch (err) {
    return next(err);
  }

  const place = new Place({
    // id: uuid_v4(),
    title,
    description,
    location: coordinates,
    imageUrl:
      "https://lp-cms-production.imgix.net/image_browser/NYC%20skyline%20-%20free%20things.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=75&dpr=1",
    address,
    userId,
  });
  // PLACES.push(place);

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("adding new place was failed.", err, 500);
    return next(error);
  }

  res.status(201).json({ place });
};

const updatePlaceById = async (req, res, next) => {
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

  const { title, description } = req.body;

  const placeId = req.params.placeId; //{placeid:"the value"}
  let place = null;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("something's wrong with the database!", 500));
  }

  if (!place) {
    return next(new HttpError("place with specified id not found.", 404));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("adding new place was failed.", err, 500);
    return next(error);
  }

  // const filter = { _id: placeId };
  // const update = { title, description };
  // let place_updated = null;
  // try {
  //   place_updated = await Place.findOneAndUpdate(filter, update, {
  //     new: true,
  //   });
  // } catch (err) {
  //   return next(new HttpError("something's wrong with the database!", 500));
  // }
  // if (!place_updated) {
  //   return next(new HttpError("place has not been updated.", 402));
  // }

  // We send 200 code because there were no adding operation, just update
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.placeId; //{placeid:"the value"}

  let place = null;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("something's wrong with the database!", 500));
  }

  if (!place) {
    return next(new HttpError("place with specified id not found.", 404));
  }

  try {
    Place.remove();
  } catch (err) {
    return next(new HttpError("something's wrong with the database!", 402));
  }

  res.status(200).json({ msg: "place deleted." });
};

exports.getAllPlaces = getAllPlaces;
exports.getPlacebyId = getPlacebyId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.addPlace = addPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
