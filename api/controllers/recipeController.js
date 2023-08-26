const Recipe = require("../models/Recipe");
const RecipeCategory = require("../models/RecipeCategory");

// Create a new recipe
const createRecipe = async (req, res) => {
  const {
    title,
    description,
    cookingTime,
    difficultyLevel,
    category,
    cuisine,
    calorie,
    creatorUser,
  } = req.body;

  try {
    const foundCategory = await RecipeCategory.findOne({ Name: category });

    if (!foundCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    const newRecipe = new Recipe({
      title,
      description,
      cookingTime,
      difficultyLevel,
      category: foundCategory._id,
      cuisine,
      calorie,
      creatorUser,
      image: req.file ? req.file.path : null,
    });

    await newRecipe.save();

    res
      .status(200)
      .json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    console.log("Error adding recipe", error);
    res.status(500).json({ message: "Error adding the recipe!" });
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  const {
    title,
    description,
    cookingTime,
    difficultyLevel,
    category,
    cuisine,
    calorie,
    creatorUser,
  } = req.body;

  try {
    // Check if the recipe exists
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find the category
    const foundCategory = await RecipeCategory.findOne({ Name: category });

    if (!foundCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Update the recipe properties
    recipe.title = title;
    recipe.description = description;
    recipe.cookingTime = cookingTime;
    recipe.difficultyLevel = difficultyLevel;
    recipe.category = foundCategory._id;
    recipe.cuisine = cuisine;
    recipe.calorie = calorie;
    recipe.creatorUser = creatorUser;

    // If a new image is provided, update it
    if (req.file) {
      recipe.image = req.file.path;
    }

    // Save the updated recipe
    await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully" });
  } catch (error) {
    console.error("Error updating recipe", error);
    res.status(500).json({ message: "Error updating recipe" });
  }
};


// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    if (!recipes || recipes.length === 0) {
      return res.status(200).json({ recipes: [] });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    console.log("Error fetching recipes", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const recipe = await Recipe.findOne({ _id: recipeId });

    if (!recipe) {
      return res.status(200).json({ message: "Recipe not found" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    console.log("Error fetching recipe", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get recipes by user ID
const getRecipesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const recipes = await Recipe.find({ creatorUser: userId });

    if (!recipes || recipes.length === 0) {
      return res.status(200).json({ recipes: [] });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    console.log("Error fetching recipes", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Delete related data (instructions, ingredients, likes, saved recipes) here

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log("Error deleting recipe", error);
    res.status(200).json({ message: "Recipe deleted successfully" });
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  deleteRecipe,
};
