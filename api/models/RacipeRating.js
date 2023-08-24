const mongoose = require("mongoose");

// Define the RecipeRating schema
const recipeRatingSchema = new mongoose.Schema({
  recipeID: {
    type: String, // Changed to string
    required: true,
  },
  userID: {
    type: String, // Changed to string
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Assuming a minimum rating of 1
    max: 5, // Assuming a maximum rating of 5
  },
  comment: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a RecipeRating model
const RecipeRating = mongoose.model("RecipeRating", recipeRatingSchema);

module.exports = RecipeRating;
