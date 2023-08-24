const mongoose = require("mongoose");

const userFollowSchema = new mongoose.Schema({
  FollowerUserID : {
    type: String, // Change the data type to String
    required: true,
  },
  FollowedUserID : {
    type: String, // Change the data type to String
    required: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const UserFollow = mongoose.model("UserFollow", userFollowSchema);

module.exports = UserFollow;
