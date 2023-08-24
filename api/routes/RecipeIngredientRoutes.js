const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/RecipeIngredientController");

// Create a new recipe ingredient
router.post("/", ingredientController.createRecipeIngredient);

// Get all recipe ingredients for a specific recipe
router.get("/:recipeId", ingredientController.getRecipeIngredientsByRecipeId);

// Delete a specific recipe ingredient
router.delete(
  "/delete/:ingredientId",
  ingredientController.deleteRecipeIngredient
);

module.exports = router;
