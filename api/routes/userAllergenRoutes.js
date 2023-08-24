const express = require("express");
const router = express.Router();
const userAllergenController = require("../controllers/userAllergenController");

// Endpoint to create user allergens
router.post("/create", userAllergenController.createUserAllergens);

module.exports = router;
