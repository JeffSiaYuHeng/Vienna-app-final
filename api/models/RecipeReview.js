const mongoose = require("mongoose");

const recipeReviewSchema = new mongoose.Schema({
  RecipeID: {
    type: String,
    required: true,
  },
  UserID: {
    type: String,
    required: true,
  },
  Rates: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  Comment: {
    type: String,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});

const RecipeReview = mongoose.model("RecipeReview", recipeReviewSchema);

module.exports = RecipeReview;
