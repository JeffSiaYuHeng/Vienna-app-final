const express = require("express");
const router = express.Router();
const allergenController = require("../controllers/allergenController");

// Endpoint to get all allergens
router.get("/", allergenController.getAllAllergens);

module.exports = router;
