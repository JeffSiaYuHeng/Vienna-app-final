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

module.exports = {
  createUserDietaryRestrictions,
};
