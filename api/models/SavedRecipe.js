const mongoose = require("mongoose");

const savedRecipeSchema = new mongoose.Schema({
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

const SaveDRecipe = mongoose.model("SaveDRecipe", savedRecipeSchema);

module.exports = SaveDRecipe;
