const express = require("express");
const router = express.Router();
const userAllergenController = require("../controllers/userAllergenController");

// Get all user allergens
router.get("/", userAllergenController.getAllUserAllergens);

// Get user allergens by userId
router.get(
  "/byUserId/:userId",
  userAllergenController.getUserAllergensByUserId
);

// Create user allergens
router.post("/create", userAllergenController.createUserAllergens);

// Delete user allergen by AllergenID
router.delete("/delete/:_id", userAllergenController.deleteUserAllergen);

module.exports = router;
