const express = require("express");
const router = express.Router();
const savedRecipeController = require("../controllers/savedRecipeController");

// Create a new SavedRecipe
router.post("/create", savedRecipeController.createSavedRecipe);

// Delete a specific SavedRecipe by UserID and RecipeID
router.delete(
  "/delete/:userId/:RecipeID",
  savedRecipeController.deleteSavedRecipe
);

// Fetch a specific SavedRecipe by UserID and RecipeID
router.get("/", savedRecipeController.getSavedRecipe);

// Fetch saved recipes by RecipeID
router.get(
  "/byRecipe/:recipeId",
  savedRecipeController.getSavedRecipesByRecipe
);

// Fetch saved recipes by userId
router.get("/byUser", savedRecipeController.getSavedRecipesByUser);

module.exports = router;
