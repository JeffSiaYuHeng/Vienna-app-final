const UserFollow = require("../models/UserFollow");

// Create a new UserFollow
const createUserFollow = async (req, res) => {
  const { userId, followedId } = req.body;

  try {
    const newUserFollow = new UserFollow({
      FollowerUserID: userId,
      FollowedUserID: followedId,
    });
    await newUserFollow.save();

    res.status(201).json({
      message: "Follow successfully",
    });
  } catch (error) {
    console.log("Error Follow User", error);
    res.status(500).json({ message: "Error Follow the User!" });
  }
};

// Delete a specific UserFollow by UserID and FollowedUserID
const deleteUserFollow = async (req, res) => {
  const userId = req.params.userId;
  const followedId = req.params.followedId;

  try {
    const deleteResult = await UserFollow.deleteOne({
      FollowerUserID: userId,
      FollowedUserID: followedId,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "User follow not found" });
    }

    res.status(200).json({ message: "User follow deleted successfully" });
  } catch (error) {
    console.log("Error deleting UserFollow", error);
    res.status(500).json({ message: "Error deleting the User follow!" });
  }
};

// Fetch a specific UserFollow by UserID and FollowedUserID
const getUserFollow = async (req, res) => {
  const { userId, followedId } = req.query;

  try {
    const userFollow = await UserFollow.findOne({
      FollowerUserID: userId,
      FollowedUserID: followedId,
    });

    if (!userFollow) {
      return res.status(404).json({ message: "User follow not found" });
    }

    res.status(200).json(userFollow);
  } catch (error) {
    console.log("Error fetching follow", error);
    res.status(500).json({ message: "Error fetching the follow!" });
  }
};

// Fetch users followed by a specific user by their UserID
const getUsersFollowed = async (req, res) => {
  const userId = req.query.userId;

  try {
    const followed = await UserFollow.find({ FollowerUserID: userId });

    res.status(200).json(followed);
  } catch (error) {
    console.log("Error fetching users followed", error);
    res.status(500).json({ message: "Error fetching users followed!" });
  }
};

// Fetch followers of a specific user by their UserID
const getFollowers = async (req, res) => {
  const userId = req.query.userId;

  try {
    const followers = await UserFollow.find({ FollowedUserID: userId });

    res.status(200).json(followers);
  } catch (error) {
    console.log("Error fetching followers", error);
    res.status(500).json({ message: "Error fetching followers!" });
  }
};

module.exports = {
  createUserFollow,
  deleteUserFollow,
  getUserFollow,
  getUsersFollowed,
  getFollowers,
};
