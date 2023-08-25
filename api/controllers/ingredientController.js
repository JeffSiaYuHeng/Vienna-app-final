const Ingredient = require('../models/Ingredient'); // Make sure to adjust the path as needed

// Controller to create a new ingredient
const createIngredient = async (req, res) => {
  try {
    const { Name, Group, AllergenId, DietaryRestrictionId } = req.body;

    // Create a new ingredient instance
    const ingredient = new Ingredient({
      Name,
      Group,
      AllergenId: AllergenId || null, // Set to null if not provided
      DietaryRestrictionId: DietaryRestrictionId || null, // Set to null if not provided
    });

    // Save the ingredient to the database
    await ingredient.save();

    res.status(201).json(ingredient);
  } catch (error) {
    console.error('Error creating ingredient:', error);
    res.status(500).json({ message: 'Error creating ingredient' });
  }
};

// Controller to fetch all ingredients
const getAllIngredients = async (req, res) => {
  try {
    // Fetch all ingredients from the database
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ message: 'Error fetching ingredients' });
  }
};

// Controller to fetch a single ingredient by ID
const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json(ingredient);
  } catch (error) {
    console.error('Error fetching ingredient:', error);
    res.status(500).json({ message: 'Error fetching ingredient' });
  }
};

// Controller to update an ingredient by ID
const updateIngredientById = async (req, res) => {
  try {
    const { Name, Group, AllergenId, DietaryRestrictionId } = req.body;

    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      {
        Name,
        Group,
        AllergenId: AllergenId || null,
        DietaryRestrictionId: DietaryRestrictionId || null,
      },
      { new: true } // Return the updated ingredient
    );

    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json(updatedIngredient);
  } catch (error) {
    console.error('Error updating ingredient:', error);
    res.status(500).json({ message: 'Error updating ingredient' });
  }
};

// Controller to delete an ingredient by ID
const deleteIngredientById = async (req, res) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);

    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(204).send(); // No content to send for successful deletion
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ message: 'Error deleting ingredient' });
  }
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredientById,
  deleteIngredientById,
};
