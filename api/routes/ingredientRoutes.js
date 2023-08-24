const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");

// Create a new recipe ingredient
router.post("/", ingredientController.createIngredient);

// Get all recipe ingredients for a specific recipe
router.get("/:recipeId", ingredientController.getIngredientsByRecipeId);

// Delete a specific recipe ingredient
router.delete("/delete/:ingredientId", ingredientController.deleteIngredient);

module.exports = router;
