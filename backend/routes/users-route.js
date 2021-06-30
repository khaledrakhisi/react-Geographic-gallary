const express = require("express");

const userController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post("/signin", userController.getUserByName);
router.post("/signup", userController.addUser);

module.exports = router;