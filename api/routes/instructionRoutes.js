const express = require("express");
const router = express.Router();
const instructionController = require("../controllers/instructionController");

// Define your instruction routes here
router.post("/", instructionController.createInstruction);
router.get("/:recipeId", instructionController.getInstructionsByRecipeId);
router.put("/:instructionId", instructionController.updateInstruction);
router.delete(
  "/delete/:instructionId",
  instructionController.deleteInstruction
);

module.exports = router;
