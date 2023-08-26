const Recipe = require("../models/Recipe");
const RecipeIngredient = require("../models/RecipeIngredient");

const searchIngredients = async (req, res) => {
  try {
    const { ingredientIds } = req.body;
    console.log(ingredientIds);
    // Create an array to store unique recipe IDs
    const uniqueRecipeIds = [];

    // Iterate over each ingredient ID
    for (const ingredientId of ingredientIds) {
      // Find recipe Ingredients that contain the current ingredient ID using RecipeIngredient
      const RecipeIngredients = await RecipeIngredient.find({
        RecipeIngredientId: ingredientId,
      });

      // Extract unique recipe IDs from the RecipeIngredients and add them to the uniqueRecipeIds array
      RecipeIngredients.forEach((ri) => {
        if (!uniqueRecipeIds.includes(ri.RecipeID)) {
          uniqueRecipeIds.push(ri.RecipeID);
        }
      });
    }

    // Find recipes with matching recipeIds
    const recipes = await Recipe.find({ _id: { $in: uniqueRecipeIds } });

    res.json({ recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  searchIngredients,
};
