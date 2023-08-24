// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define your routes here
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user/:userId", userController.getUserById);
router.put("/updateProfile/:userId", userController.updateUserProfile);
router.put("/user/:userId/activate", userController.activateUser);

module.exports = router;
