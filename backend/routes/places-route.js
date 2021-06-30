const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/", placesController.getAllPlaces);
router.get("/:placeId", placesController.getPlacebyId);
router.get("/user/:userId", placesController.getPlacesByUserId);
router.post("/", placesController.addPlace);
router.patch("/:placeId", placesController.updatePlaceById)
router.delete("/:placeId", placesController.deletePlaceById)

module.exports = router;
