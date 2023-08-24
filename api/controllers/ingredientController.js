const Ingredient = require("../models/Ingredient");



// Create a new recipe ingredient
const getAllIngredient = async (req, res) => {
  try {
    // Fetch all ingredients from the database
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    console.log("Error fetching ingredients", error);
    res.status(500).json({ message: "Error fetching ingredients" });
  }
};



module.exports = {
  getAllIngredient,
};
