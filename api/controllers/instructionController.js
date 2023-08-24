const RecipeInstruction = require("../models/RecipeInstruction");

// Create a new recipe instruction
const createInstruction = async (req, res) => {
  const { RecipeID, Description } = req.body;

  try {
    const newInstruction = new RecipeInstruction({ RecipeID, Description });
    await newInstruction.save();

    res.status(201).json({
      message: "Instruction added successfully",
      instruction: newInstruction,
    });
  } catch (error) {
    console.log("Error adding instruction", error);
    res.status(500).json({ message: "Error adding the instruction!" });
  }
};

// Get all instructions for a specific recipe
const getInstructionsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const instructions = await RecipeInstruction.find({ RecipeID: recipeId });

    res.status(200).json({ instructions });
  } catch (error) {
    console.log("Error fetching instructions", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a specific instruction
const updateInstruction = async (req, res) => {
  const instructionId = req.params.instructionId;
  const { Description } = req.body;

  try {
    const updatedInstruction = await RecipeInstruction.findByIdAndUpdate(
      instructionId,
      { Description },
      { new: true }
    );

    if (!updatedInstruction) {
      return res.status(404).json({ message: "Instruction not found" });
    }

    res.status(200).json({
      message: "Instruction updated successfully",
      instruction: updatedInstruction,
    });
  } catch (error) {
    console.log("Error updating instruction", error);
    res.status(500).json({ message: "Error updating the instruction!" });
  }
};

// Delete a specific instruction
const deleteInstruction = async (req, res) => {
  const instructionId = req.params.instructionId;

  try {
    const deletedInstruction = await RecipeInstruction.findByIdAndDelete(
      instructionId
    );

    if (!deletedInstruction) {
      return res.status(404).json({ message: "Instruction not found" });
    }

    res.status(200).json({ message: "Instruction deleted successfully" });
  } catch (error) {
    console.log("Error deleting instruction", error);
    res.status(500).json({ message: "Error deleting the instruction!" });
  }
};

module.exports = {
  createInstruction,
  getInstructionsByRecipeId,
  updateInstruction,
  deleteInstruction,
};
