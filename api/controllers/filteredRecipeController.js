const Recipe = require("../models/Recipe");
const RecipeIngredient = require("../models/RecipeIngredient");
const UserDietaryRestriction = require("../models/UserDietaryRestriction");
const UserAllergen = require("../models/UserAllergen");
const Ingredient = require("../models/Ingredient");

// Helper function to check if an ingredient matches user restrictions/allergens
const ingredientMatchesUser = async (
  ingredientId,
  userDietaryRestrictions,
  userAllergens
) => {
  // Retrieve the RecipeIngredient document for this ingredient
  const recipeIngredient = await RecipeIngredient.findOne({
    RecipeIngredientId: ingredientId,
  });

  if (!recipeIngredient) {
    // Ingredient not found in any recipe, it's considered a match
    return false;
  }

  const ingredientIdString = ingredientId.toString();

  // Fetch the corresponding Ingredient document
  const ingredient = await Ingredient.findOne({
    IngredientId: ingredientIdString,
  });

  if (!ingredient) {
    // Ingredient not found, it's considered a match
    return false;
  }

  // Check if the ingredient matches the user's dietary restrictions or allergens
  return (
    userDietaryRestrictions.some(
      (restriction) =>
        restriction.RestrictionID === ingredient.DietaryRestrictionId
    ) ||
    userAllergens.some(
      (allergen) => allergen.AllergenId === ingredient.AllergenId
    )
  );
};

const getFilteredRecipes = async (req, res) => {
  const userId = req.query.userId; // Assuming you pass the user's ID as a query parameter

  try {
    // Fetch user's dietary restrictions
    const userDietaryRestrictions = await UserDietaryRestriction.find({
      userId,
    });

    // Fetch user's allergens
    const userAllergens = await UserAllergen.find({ userId });

    // Fetch all unique ingredient IDs from RecipeIngredient
    const ingredientIds = await RecipeIngredient.distinct("RecipeIngredientId");

    // Filter recipes based on ingredients that match user restrictions/allergens

    const filteredRecipeIds = [];

    for (const ingredientId of ingredientIds) {
      if (
        await ingredientMatchesUser(
          ingredientId,
          userDietaryRestrictions,
          userAllergens
        )
      ) {
        // Find all recipes that use this ingredient
        const recipesUsingIngredient = await RecipeIngredient.find({
          RecipeIngredientId: ingredientId,
        });

        // Add unique recipe IDs to the result array
        for (const recipeIngredient of recipesUsingIngredient) {
          if (!filteredRecipeIds.includes(recipeIngredient.RecipeID)) {
            filteredRecipeIds.push(recipeIngredient.RecipeID);
          }
        }
      }
    }

    // Fetch the actual recipe documents based on the filteredRecipeIds
    const filteredRecipes = await Recipe.find({
      _id: { $in: filteredRecipeIds },
    });

    // Fetch all recipes
    const allRecipes = await Recipe.find();

    // Filter out recipes that are not in filteredRecipes
    const suitableRecipes = allRecipes.filter((recipe) => {
      return !filteredRecipes.some((filteredRecipe) => {
        return filteredRecipe._id.equals(recipe._id);
      });
    });

    res.status(200).json({ suitableRecipes });
  } catch (error) {
    console.error("Error fetching filtered recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFilteredRecipes,
};
