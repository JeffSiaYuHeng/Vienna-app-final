const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingListController");

// Fetch shopping lists by UserID
router.get("/find/:userId", shoppingListController.findShoppingListsByUser);

// Create shopping list items
router.post("/create", shoppingListController.createShoppingListItems);

// Delete a specific shopping list item
router.delete("/delete/:itemId", shoppingListController.deleteShoppingListItem);

module.exports = router;
