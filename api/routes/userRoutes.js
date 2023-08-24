const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define your routes here
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user/:userId", userController.getUserById);
router.put(
  "/updateProfile/:userId",
  upload.single("userImage"), // Use the upload middleware here
  userController.updateUserProfile
);
router.put("/user/:userId/activate", userController.activateUser);

module.exports = router;
