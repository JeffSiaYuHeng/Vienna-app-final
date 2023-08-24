const ShoppingList = require("../models/ShoppingList");

// Fetch shopping lists by UserID
const findShoppingListsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const shoppingLists = await ShoppingList.find({ userID: userId });

    res.status(200).json({ shoppingLists });
  } catch (error) {
    console.log("Error fetching shopping lists", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create shopping list items
const createShoppingListItems = async (req, res) => {
  try {
    // Extract the shopping list items from the request body
    const userShoppingList = req.body;

    // Create an array to store the created shopping list items
    const createdItems = [];

    for (const item of userShoppingList) {
      // Create a new shopping list item based on the ShoppingList schema
      const newShoppingListItem = new ShoppingList({
        userID: item.userID,
        itemName: item.itemName,
      });

      // Save the shopping list item to the database
      const savedItem = await newShoppingListItem.save();
      createdItems.push(savedItem);
    }

    // Respond with a 201 status (Created) and a JSON array containing the created shopping list items
    res.status(201).json(createdItems);
  } catch (error) {
    // If there's an error during the creation process, log the error and respond with a 500 status (Internal Server Error) and an error message
    console.error("Error creating shopping list items:", error);
    res.status(500).json({ error: "Unable to create shopping list items" });
  }
};

// Delete a specific shopping list item
const deleteShoppingListItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deleteItem = await ShoppingList.findByIdAndDelete(itemId);

    if (!deleteItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error deleting item", error);
    res.status(500).json({ message: "Error deleting the item!" });
  }
};

module.exports = {
  findShoppingListsByUser,
  createShoppingListItems,
  deleteShoppingListItem,
};
