const UserAllergen = require("./models/UserAllergen");

// Controller function to create user allergens
exports.createUserAllergens = async (req, res) => {
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
