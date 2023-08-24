const mongoose = require("mongoose");

const recipeInstructionSchema = new mongoose.Schema({
  RecipeID: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  Description: { type: String, required: true },
});

const RecipeInstruction = mongoose.model(
  "RecipeInstruction",
  recipeInstructionSchema
);

module.exports = RecipeInstruction;
