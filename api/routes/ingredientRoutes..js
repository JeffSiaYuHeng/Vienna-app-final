const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");

//get all the Ingredient
router.get("/", ingredientController.getAllIngredient);



module.exports = router;
