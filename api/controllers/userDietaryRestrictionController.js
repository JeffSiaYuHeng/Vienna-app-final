const UserDietaryRestriction = require("../models/UserDietaryRestriction");

// Controller function to create user dietary restrictions
const createUserDietaryRestrictions = async (req, res) => {
  try {
    // Extract the data from the request body
    const userDietaryRestrictions = req.body;

    // Use Array.map to create new user dietary restrictions documents and save them
    const createdUserDietaryRestrictions = await Promise.all(
      userDietaryRestrictions.map(async (restriction) => {
        const newUserDietaryRestriction = new UserDietaryRestriction({
          RestrictionID: restriction.RestrictionID,
          userId: restriction.userId,
        });

        await newUserDietaryRestriction.save();
        return newUserDietaryRestriction;
      })
    );

    // Respond with a success message and the created objects
    res.status(201).json({
      message: "User Dietary Restrictions created successfully",
      userDietaryRestrictions: createdUserDietaryRestrictions,
    });
  } catch (error) {
    // Handle errors, such as validation errors or database errors
    console.error("User Dietary Restriction Creation Error", error);
    res.status(500).json({
      error: "An error occurred while creating the User Dietary Restrictions",
    });
  }
};

// Controller function to get all user dietary restrictions
const getAllUserDietaryRestrictions = async (req, res) => {
  try {
    // Use the find method to retrieve all user dietary restrictions from the database
    const allUserDietaryRestrictions = await UserDietaryRestriction.find();

    // Respond with the retrieved user dietary restrictions
    res.status(200).json({
      userDietaryRestrictions: allUserDietaryRestrictions,
    });
  } catch (error) {
    // Handle errors, such as database errors
    console.error("Get All User Dietary Restrictions Error", error);
    res.status(500).json({
      error: "An error occurred while retrieving user dietary restrictions",
    });
  }
};


// Controller function to get user dietary restrictions by userId
const getUserDietaryRestrictionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;


    // Use the find method to retrieve user dietary restrictions for the specified userId
    const userDietaryRestrictions = await UserDietaryRestriction.find({
      userId: userId,
    });

    if (userDietaryRestrictions.length === 0) {
      // If no user dietary restrictions are found for the userId, respond with a 404 status

    } else {
      // Respond with the retrieved user dietary restrictions
      res.status(200).json({
        userDietaryRestrictions: userDietaryRestrictions,
      });
    }
  } catch (error) {
    // Handle errors, such as database errors
    console.error("Get User Dietary Restrictions by UserId Error", error);
    res.status(500).json({
      error: "An error occurred while retrieving user dietary restrictions",
    });
  }
};



const deleteUserDietaryRestriction = async (req, res) => {
  try {
    const { _id } = req.params;

    // Use the deleteOne method to delete the user dietary restriction by _id
    const result = await UserDietaryRestriction.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User dietary restriction not found with the specified _id",
      });
    }

    // Respond with a success message
    res.status(200).json({
      message: "User dietary restriction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user dietary restriction", error);
    res.status(500).json({
      message: "An error occurred while deleting the user dietary restriction",
    });
  }
};





module.exports = {
  getUserDietaryRestrictionsByUserId,
  createUserDietaryRestrictions,
  getAllUserDietaryRestrictions,
  deleteUserDietaryRestriction,
};


