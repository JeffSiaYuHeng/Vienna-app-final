const express = require("express");
const router = express.Router();
const userFollowController = require("../controllers/userFollowController");

// Create a new UserFollow
router.post("/create", userFollowController.createUserFollow);

// Delete a specific UserFollow by UserID and FollowedUserID
router.delete(
  "/delete/:userId/:followedId",
  userFollowController.deleteUserFollow
);

// Fetch a specific UserFollow by UserID and FollowedUserID
router.get("/", userFollowController.getUserFollow);

// Fetch users followed by a specific user by their UserID
router.get("/followed", userFollowController.getUsersFollowed);

// Fetch followers of a specific user by their UserID
router.get("/follower", userFollowController.getFollowers);



module.exports = router;
