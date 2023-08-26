const express = require("express");
const router = express.Router();
const allergenController = require("../controllers/allergenController");

// Endpoint to get all allergens
router.get("/", allergenController.getAllAllergens);


router.get("/:id", allergenController.getAllergenById); // Add this route

module.exports = router;
