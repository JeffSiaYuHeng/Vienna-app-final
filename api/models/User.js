const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  UserImage: String,
  firstName: String,
  lastName: String,
  notificationPreferences: [String],
  initialStatus: {
    type: String,
    default: "Inactive",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
