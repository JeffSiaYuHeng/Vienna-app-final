const express = require("express");
const router = express.Router();
const userDietaryRestrictionController = require("../controllers/userDietaryRestrictionController");

// Get all user dietary restrictions
router.get("/", userDietaryRestrictionController.getAllUserDietaryRestrictions);

// Get user dietary restrictions by userId
router.get(
  "/byUserId/:userId",
  userDietaryRestrictionController.getUserDietaryRestrictionsByUserId
);

// Create user dietary restrictions
router.post(
  "/create",
  userDietaryRestrictionController.createUserDietaryRestrictions
);

// Delete user dietary restriction by RestrictionID
router.delete(
  "/delete/:_id",
  userDietaryRestrictionController.deleteUserDietaryRestriction
);

module.exports = router;
