const express = require("express");
const router = express.Router();
const recipeIngredientController = require("../controllers/recipeIngredientController");

// Create a new recipe ingredient
router.post("/create", recipeIngredientController.createRecipeIngredient);

// Get all recipe ingredients for a specific recipe
router.get("/:recipeId", recipeIngredientController.getRecipeIngredientsByRecipeId);

// Delete a specific recipe ingredient
router.delete(
  "/delete/:RecipeIngredientId",
  recipeIngredientController.deleteRecipeIngredient
);

module.exports = router;
