const DietaryRestriction = require("../models/DietaryRestriction");

// Get all dietary restrictions
const getAllDietaryRestrictions = async (req, res) => {
  try {
    // Find all dietary restrictions
    const dietaryRestrictions = await DietaryRestriction.find();

    if (!dietaryRestrictions || dietaryRestrictions.length === 0) {
      // Ignore the error when there are no dietary restrictions found
      return res.status(200).json({ dietaryRestrictions: [] });
    }

    // Return the dietary restrictions
    res.status(200).json({ dietaryRestrictions });
  } catch (error) {
    console.error("Error fetching Dietary Restriction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a dietary restriction by its ID
const getDietaryRestrictionById = async (req, res) => {
  try {
    const dietaryRestrictionId = req.params.id;
    // Find the dietary restriction by ID
    const dietaryRestriction = await DietaryRestriction.findOne({DietaryRestrictionId:dietaryRestrictionId});

    if (!dietaryRestriction) {
      return res.status(404).json({ message: "Dietary Restriction not found" });
    }

    // Return the dietary restriction
    res.status(200).json({ dietaryRestriction });
  } catch (error) {
    console.error("Error fetching Dietary Restriction by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllDietaryRestrictions,
  getDietaryRestrictionById, // Add this line to export the new function
};