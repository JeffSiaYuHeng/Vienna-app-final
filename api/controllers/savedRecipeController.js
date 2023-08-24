const SavedRecipe = require("../models/SavedRecipe");

// Create a new SavedRecipe
const createSavedRecipe = async (req, res) => {
  const { RecipeID, userId } = req.body;

  try {
    const newSavedRecipe = new SavedRecipe({
      RecipeID,
      userId,
    });
    await newSavedRecipe.save();

    res.status(201).json({
      message: "SavedRecipe created successfully",
      savedRecipe: newSavedRecipe.toObject(),
    });
  } catch (error) {
    console.log("Error creating SavedRecipe", error);
    res.status(500).json({ message: "Error creating the SavedRecipe!" });
  }
};

// Delete a specific SavedRecipe by UserID and RecipeID
const deleteSavedRecipe = async (req, res) => {
  const userId = req.params.userId;
  const RecipeID = req.params.RecipeID;

  try {
    const deletedSavedRecipe = await SavedRecipe.findOneAndDelete({
      userId,
      RecipeID,
    });

    if (!deletedSavedRecipe) {
      return res.status(404).json({ message: "SavedRecipe not found" });
    }

    res.status(200).json({ message: "SavedRecipe deleted successfully" });
  } catch (error) {
    console.log("Error deleting SavedRecipe", error);
    res.status(500).json({ message: "Error deleting the SavedRecipe!" });
  }
};

// Fetch a specific SavedRecipe by UserID and RecipeID
const getSavedRecipe = async (req, res) => {
  const { RecipeID, userId } = req.query;

  try {
    const savedRecipe = await SavedRecipe.findOne({
      RecipeID,
      userId,
    });

    if (!savedRecipe) {
      return res.status(200).json({ message: "No records found" });
    }

    res.status(200).json(savedRecipe);
  } catch (error) {
    console.log("Error fetching SavedRecipe", error);
    res.status(500).json({ message: "Error fetching the SavedRecipe!" });
  }
};

// Fetch saved recipes by RecipeID
const getSavedRecipesByRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const savedRecipes = await SavedRecipe.find({ RecipeID: recipeId });

    res.status(200).json(savedRecipes);
  } catch (error) {
    console.log("Error fetching SavedRecipes by RecipeID", error);
    res.status(500).json({ message: "Error fetching SavedRecipes!" });
  }
};

// Fetch saved recipes by userId
const getSavedRecipesByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    const savedRecipes = await SavedRecipe.find({ userId });

    if (!savedRecipes || savedRecipes.length === 0) {
      res.status(200).json({ message: "No SavedRecipes found for this user." });
    } else {
      res.status(200).json(savedRecipes);
    }
  } catch (error) {
    console.log("Error fetching SavedRecipes by userId", error);
    res.status(500).json({ message: "Error fetching SavedRecipes!" });
  }
};

module.exports = {
  createSavedRecipe,
  deleteSavedRecipe,
  getSavedRecipe,
  getSavedRecipesByRecipe,
  getSavedRecipesByUser,
};
