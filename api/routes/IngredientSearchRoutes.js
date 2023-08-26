const express = require("express");
const router = express.Router();
const ingredientSearchController = require("../controllers/IngredientSearchController");

// Endpoint for ingredient search
router.post("/search", ingredientSearchController.searchIngredients);

module.exports = router;
