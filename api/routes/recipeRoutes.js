const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Define your recipe routes here
router.post("/", recipeController.createRecipe);
router.put("/:recipeId", recipeController.updateRecipe);
router.get("/home", recipeController.getAllRecipes);
router.get("/find/:recipeId", recipeController.getRecipeById);
router.get("/user/:userId", recipeController.getRecipesByUserId);
router.delete("/delete/:recipeId", recipeController.deleteRecipe);

module.exports = router;
