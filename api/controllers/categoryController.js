const Category = require("../models/RecipeCategory");

// Create a new category
const createCategory = async (req, res) => {
  const { Name } = req.body;

  try {
    // Create a new Category object
    const newCategory = new Category({ Name });

    // Save the category to the database
    await newCategory.save();
    res.status(200).json({ message: "Category added successfully" });
  } catch (error) {
    console.log("Error adding category", error);
    res.status(500).json({ message: "Error adding the category!" });
  }
};

// Fetch all RecipeCategory
const getAllCategories = async (req, res) => {
  try {
    // Fetch all RecipeCategory from the database
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error fetching categories", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Delete a specific category
const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: categoryId,
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("Error deleting category", error);
    res.status(500).json({ message: "Error deleting the category!" });
  }
};

// Fetch a specific category by ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(200).json({ message: "Category not found" });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.log("Error fetching category", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const SearchByName = async (req, res) => {
  try {
    const { q } = req.query;

    // Use a regular expression to perform a case-insensitive search for categories that match the user's input
    const categories = await Category.find({
      Name: { $regex: q, $options: "i" },
    });

    // Extract category names from the query results
    const categoryNames = categories.map((category) => category.Name);

    res.json({ categories: categoryNames });
  } catch (error) {
    console.error("Error fetching suggested categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  SearchByName,
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  SearchByName,
};
