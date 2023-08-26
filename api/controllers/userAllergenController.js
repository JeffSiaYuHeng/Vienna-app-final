const UserAllergen = require("../models/UserAllergen");

// Controller function to create user allergens
const createUserAllergens = async (req, res) => {
  try {
    // Extract the data from the request body
    const userAllergens = req.body;

    // Initialize an array to store created user allergens
    const createdUserAllergens = [];

    // Loop through each user allergen object
    for (const allergen of userAllergens) {
      // Create a new user allergen document
      const newUserAllergen = new UserAllergen({
        AllergenId: allergen.AllergenId, // Adjust the property names based on your model
        userId: allergen.userId, // Adjust the property names based on your model
      });

      // Save the document to the database
      await newUserAllergen.save();

      // Push the created user allergen to the array
      createdUserAllergens.push(newUserAllergen);
    }

    // Respond with a success message and the created objects
    res.status(201).json({
      message: "User Allergens created successfully",
      userAllergens: createdUserAllergens,
    });
  } catch (error) {
    // Handle errors, such as validation errors or database errors
    console.error("User Allergen Creation Error", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the User Allergens" });
  }
};
// Controller function to get all user allergens
const getAllUserAllergens = async (req, res) => {
  try {
    // Use the find method to retrieve all user allergens from the database
    const allUserAllergens = await UserAllergen.find();

    // Respond with the retrieved user allergens
    res.status(200).json({
      userAllergens: allUserAllergens,
    });
  } catch (error) {
    // Handle errors, such as database errors
    console.error("Get All User Allergens Error", error);
    res.status(500).json({
      error: "An error occurred while retrieving user allergens",
    });
  }
};

// Controller function to get user allergens by userId
const getUserAllergensByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Use the find method to retrieve user allergens for the specified userId
    const userAllergens = await UserAllergen.find({
      userId: userId,
    });

    if (userAllergens.length === 0) {
      // If no user allergens are found for the userId, respond with a 404 status
      res.status(404).json({
        message: "No user allergens found for the specified userId",
      });
    } else {
      // Respond with the retrieved user allergens
      res.status(200).json({
        userAllergens: userAllergens,
      });
    }
  } catch (error) {
    // Handle errors, such as database errors
    console.error("Get User Allergens by UserId Error", error);
    res.status(500).json({
      error: "An error occurred while retrieving user allergens",
    });
  }
};

// Controller function to delete user allergen by AllergenID
const deleteUserAllergen = async (req, res) => {
  try {
    const { _id } = req.params;

    // Use the deleteOne method to delete the user allergen by _id
    const result = await UserAllergen.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User allergen not found with the specified _id",
      });
    }

    // Respond with a success message
    res.status(200).json({
      message: "User allergen deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user allergen", error);
    res.status(500).json({
      message: "An error occurred while deleting the user allergen",
    });
  }
};

module.exports = {
  getUserAllergensByUserId,
  createUserAllergens,
  getAllUserAllergens,
  deleteUserAllergen,
};
