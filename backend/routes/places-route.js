const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/", placesController.getAllPlaces);
router.get("/:placeId", placesController.getPlacebyId);
router.get("/user/:userId", placesController.getPlaceByUserId);

module.exports = router;
