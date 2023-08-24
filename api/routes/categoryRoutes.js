const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Create a new category
router.post("/add", categoryController.createCategory);

// Fetch all RecipeCategory
router.get("/", categoryController.getAllCategories);

// Delete a specific category
router.delete("/delete/:categoryId", categoryController.deleteCategory);

// Fetch a specific category by ID
router.get("/find/:categoryId", categoryController.getCategoryById);

module.exports = router;
