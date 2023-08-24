const mongoose = require("mongoose");

// Define the UserShoppingList schema
const userShoppingListSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

// Create a UserShoppingList model
const UserShoppingList = mongoose.model(
  "UserShoppingList",
  userShoppingListSchema
);

module.exports = UserShoppingList;
