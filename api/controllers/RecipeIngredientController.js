const RecipeIngredient = require("../models/RecipeIngredient");
const Ingredient = require("../models/Ingredient");



// Create a new recipe ingredient
const createRecipeIngredient = async (req, res) => {
  try {
    const recipeIngredients = req.body;

    // Create an array to store the newly created recipe ingredients
    const createdRecipeIngredients = [];

    // Iterate through the recipeIngredients and create new documents
    for (const recipeIngredientData of recipeIngredients) {
      const { RecipeID, IngredientId } = recipeIngredientData;

      // Create a new RecipeIngredient document
      const newRecipeIngredient = new RecipeIngredient({
        RecipeID,
        RecipeIngredientId:IngredientId,
      });

      // Save the new recipe ingredient to the database
      await newRecipeIngredient.save();

      // Push the created recipe ingredient to the result array
      createdRecipeIngredients.push(newRecipeIngredient);
    }

    res.status(201).json({
      message: "Recipe Ingredients added successfully",
      recipeIngredients: createdRecipeIngredients,
    });
  } catch (error) {
    console.error("Error adding Recipe Ingredients", error);
    res.status(500).json({ message: "Error adding the Recipe Ingredients" });
  }
};


// Get all recipe ingredients for a specific recipe
const getRecipeIngredientsByRecipeId = async (req, res) => {
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
const deleteRecipeIngredient = async (req, res) => {
  const RecipeIngredientId = req.params.RecipeIngredientId;

  try {
    const deletedRecipeIngredient = await RecipeIngredient.findByIdAndDelete(
      RecipeIngredientId
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
  createRecipeIngredient,
  getRecipeIngredientsByRecipeId,
  deleteRecipeIngredient,
};
