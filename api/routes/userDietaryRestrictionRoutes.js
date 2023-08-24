const express = require("express");
const router = express.Router();
const userDietaryRestrictionController = require("../controllers/userDietaryRestrictionController");

// Create user dietary restrictions
router.post(
  "/create",
  userDietaryRestrictionController.createUserDietaryRestrictions
);

module.exports = router;
