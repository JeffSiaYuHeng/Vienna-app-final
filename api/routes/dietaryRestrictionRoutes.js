const express = require("express");
const router = express.Router();
const dietaryRestrictionController = require("../controllers/dietaryRestrictionController");

// Get all dietary restrictions
router.get("/", dietaryRestrictionController.getAllDietaryRestrictions);


router.get("/:id", dietaryRestrictionController.getDietaryRestrictionById);

module.exports = router;


