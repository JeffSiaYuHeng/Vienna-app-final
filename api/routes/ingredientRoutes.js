const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');


// Get all ingredients
router.get('/', ingredientController.getAllIngredients);


// Create a new ingredient
router.post('/', ingredientController.createIngredient);

// Get all ingredients
router.get('/', ingredientController.getAllIngredients);

// Get a single ingredient by ID
router.get('/:id', ingredientController.getIngredientById);

// Update an ingredient by ID
router.put('/:id', ingredientController.updateIngredientById);

// Delete an ingredient by ID
router.delete('/:id', ingredientController.deleteIngredientById);

module.exports = router;


