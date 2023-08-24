const express = require("express");
const router = express.Router();
const recipeLikeController = require("../controllers/recipeLikeController");

// Create a new RecipeLike
router.post("/create", recipeLikeController.createRecipeLike);

// Delete a specific RecipeLike by UserID and RecipeID
router.delete(
  "/delete/:userId/:RecipeID",
  recipeLikeController.deleteRecipeLike
);

// Fetch RecipeLikes by RecipeID
router.get(
  "/byRecipe/:recipeId",
  recipeLikeController.getRecipeLikesByRecipeId
);

// Fetch RecipeLikes by userId
router.get("/byUser", recipeLikeController.getRecipeLikesByUserId);

module.exports = router;
