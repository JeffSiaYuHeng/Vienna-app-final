// routes/filteredRecipes.js

const express = require("express");
const router = express.Router();
const filteredRecipeController = require("../controllers/filteredRecipeController");

// Define a route to fetch filtered recipes
router.get("/", filteredRecipeController.getFilteredRecipes);

module.exports = router;
