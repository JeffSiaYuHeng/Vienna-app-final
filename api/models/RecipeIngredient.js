const mongoose = require("mongoose");

const recipeIIngredientSchema = new mongoose.Schema({
  RecipeID: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  IngredientId: { type: String, required: true },
});

const RecipeIIngredient = mongoose.model(
  "RecipeIIngredient",
  recipeIIngredientSchema
);

module.exports = RecipeIIngredient;
