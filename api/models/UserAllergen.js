const mongoose = require("mongoose");

const userAllergenSchema = new mongoose.Schema({
  userId: {
    type: String, // Change the data type to String if it's a string
    required: true,
  },
  AllergenId: {
    type: String, // Change the data type to String if it's a string
    required: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const UserAllergen = mongoose.model("UserAllergen", userAllergenSchema);

module.exports = UserAllergen;
