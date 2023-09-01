const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  image: {
    type: String, // You can adjust this to the appropriate data type based on your storage approach
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecipeCategory",
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  creatorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  calorie: {
    type: Number, // You can adjust this to the appropriate data type based on your requirements
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
