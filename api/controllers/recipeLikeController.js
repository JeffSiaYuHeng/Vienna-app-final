const RecipeLike = require("../models/RecipeLike");

// Create a new RecipeLike
const createRecipeLike = async (req, res) => {
  const { RecipeID, userId } = req.body;

  try {
    const newRecipeLike = new RecipeLike({
      RecipeID,
      userId,
    });
    await newRecipeLike.save();

    res.status(201).json({
      message: "RecipeLike created successfully",
      recipeLike: newRecipeLike.toObject(),
    });
  } catch (error) {
    console.log("Error creating RecipeLike", error);
    res.status(500).json({ message: "Error creating the RecipeLike!" });
  }
};

// Delete a specific RecipeLike by UserID and RecipeID
const deleteRecipeLike = async (req, res) => {
  const userId = req.params.userId;
  const RecipeID = req.params.RecipeID;

  try {
    const deletedRecipeLike = await RecipeLike.findOneAndDelete({
      userId,
      RecipeID,
    });

    if (!deletedRecipeLike) {
      return res.status(404).json({ message: "RecipeLike not found" });
    }

    res.status(200).json({ message: "RecipeLike deleted successfully" });
  } catch (error) {
    console.log("Error deleting RecipeLike", error);
    res.status(500).json({ message: "Error deleting the RecipeLike!" });
  }
};

// Fetch RecipeLikes by RecipeID
const getRecipeLikesByRecipeId = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipeLikes = await RecipeLike.find({ RecipeID: recipeId });

    res.status(200).json(recipeLikes);
  } catch (error) {
    console.log("Error fetching RecipeLikes by RecipeID", error);
    res.status(500).json({ message: "Error fetching RecipeLikes!" });
  }
};

// Fetch RecipeLikes by userId
const getRecipeLikesByUserId = async (req, res) => {
  const { userId } = req.query;

  try {
    const recipeLikes = await RecipeLike.find({ userId });

    if (!recipeLikes || recipeLikes.length === 0) {
      res.status(200).json({ message: "No RecipeLikes found for this user." });
    } else {
      res.status(200).json(recipeLikes);
    }
  } catch (error) {
    console.log("Error fetching RecipeLikes by userId", error);
    res.status(500).json({ message: "Error fetching RecipeLikes!" });
  }
};
const getRecipeLikesByRecipeIdAndUserId = async (req, res) => {
  const { recipeId, userId } = req.params;
  try {
    // Find a RecipeLike that matches the RecipeID and userId
    const recipeLike = await RecipeLike.findOne({
      RecipeID: recipeId,
      userId,
    });

    if (!recipeLike) {
      // Respond with a message indicating no match was found
    }

    console.log(recipeLike);
    // Respond with the found RecipeLike
    return res.status(200).json(recipeLike);
  } catch (error) {
    console.log("Error fetching RecipeLike", error);
    return res.status(500).json({ message: "Error fetching the RecipeLike!" });
  }
};

module.exports = {
  createRecipeLike,
  deleteRecipeLike,
  getRecipeLikesByRecipeId,
  getRecipeLikesByUserId,
  getRecipeLikesByRecipeIdAndUserId, // Add the new function to the exports
};
