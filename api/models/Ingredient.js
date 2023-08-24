const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  IngredientId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Group: {
    type: String,
    required: true,
  },
  AllergenId: {
    type: String,
    default: null, // Set the default value to nulla
  },
  DietaryRestrictionId: {
    type: String,
    default: null, // Set the default value to null
  },
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
