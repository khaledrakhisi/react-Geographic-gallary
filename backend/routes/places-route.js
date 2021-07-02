const express = require("express");
const { check } = require("express-validator");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/", placesController.getAllPlaces);
router.get("/:placeId", placesController.getPlacebyId);
router.get("/user/:userId", placesController.getPlacesByUserId);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.addPlace
);
router.patch(
  "/:placeId",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  placesController.updatePlaceById
);
router.delete("/:placeId", placesController.deletePlaceById);

module.exports = router;
