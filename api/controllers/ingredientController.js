const RecipeIngredient = require("../models/RecipeIngredient");
const Ingredient = require("./models/Ingredient");

// Create a new recipe ingredient
const createIngredient = async (req, res) => {
  const { RecipeID, IngredientName } = req.body;
  try {
    // First, let's find the RecipeIngredient by name
    const recipeIngredient = await Ingredient.findOne({ IngredientName });

    if (!recipeIngredient) {
      // If the recipe ingredient doesn't exist, you might want to handle this case
      return res.status(404).json({ message: "RecipeIngredient not found" });
    }

    // Now, create a new RecipeIngredient using the found RecipeIngredient's ID
    const newRecipeIngredient = new RecipeIngredient({
      RecipeID,
      IngredientId: recipeIngredient.IngredientId, // Assuming this is the correct property name
    });

    await newRecipeIngredient.save();

    res.status(201).json({
      message: "Recipe Ingredient added successfully",
      recipeIngredient: newRecipeIngredient,
    });
  } catch (error) {
    console.error("Error adding Recipe Ingredient", error);
    res.status(500).json({ message: "Error adding the Recipe Ingredient" });
  }
};

// Get all recipe ingredients for a specific recipe
const getIngredientsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const recipeIngredients = await RecipeIngredient.find({
      RecipeID: recipeId,
    });

    res.status(200).json({ recipeIngredients });
  } catch (error) {
    console.log("Error fetching Recipe Ingredient", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a specific recipe ingredient
const deleteIngredient = async (req, res) => {
  const ingredientId = req.params.ingredientId;

  try {
    const deletedRecipeIngredient = await RecipeIngredient.findByIdAndDelete(
      ingredientId
    );

    if (!deletedRecipeIngredient) {
      return res.status(404).json({ message: "RecipeIngredient not found" });
    }

    res.status(200).json({ message: "Recipe Ingredient deleted successfully" });
  } catch (error) {
    console.log("Error deleting Recipe Ingredient", error);
    res.status(500).json({ message: "Error deleting the Recipe Ingredient!" });
  }
};

module.exports = {
  createIngredient,
  getIngredientsByRecipeId,
  deleteIngredient,
};
