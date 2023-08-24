const mongoose = require("mongoose");

const recipeLikeSchema = new mongoose.Schema({
  RecipeID: {
    type: String, // Change the data type to String
    required: true,
  },
  userId: {
    type: String, // Change the data type to String
    required: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const RecipeLike = mongoose.model("RecipeLike", recipeLikeSchema);

module.exports = RecipeLike;
