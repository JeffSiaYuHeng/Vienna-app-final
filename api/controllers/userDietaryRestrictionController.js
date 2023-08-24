const UserDietaryRestriction = require("../models/UserDietaryRestriction");

// Controller function to create user dietary restrictions
exports.createUserDietaryRestrictions = async (req, res) => {
  try {
    // Extract the data from the request body
    const userDietaryRestrictions = req.body;

    // Initialize an array to store created user dietary restrictions
    const createdUserDietaryRestrictions = [];

    // Loop through each user dietary restriction object
    for (const restriction of userDietaryRestrictions) {
      // Create a new user dietary restriction document
      const newUserDietaryRestriction = new UserDietaryRestriction({
        RestrictionID: restriction.RestrictionID,
        userId: restriction.userId,
      });

      // Save the document to the database
      await newUserDietaryRestriction.save();

      // Push the created user dietary restriction to the array
      createdUserDietaryRestrictions.push(newUserDietaryRestriction);
    }

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
