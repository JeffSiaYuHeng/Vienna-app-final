const Allergen = require("../models/Allergen");

// Controller function to get all allergens
const getAllAllergens = async (req, res) => {
  try {
    const allergens = await Allergen.find();

    if (!allergens || allergens.length === 0) {
      return res.status(200).json({ allergens: [] });
    }

    res.status(200).json({ allergens });
  } catch (error) {
    console.error("Error fetching allergen", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get an allergen by its ID
const getAllergenById = async (req, res) => {
  try {
    const allergenId = req.params.id;
    // Find the allergen by ID
    const allergen = await Allergen.findOne({ AllergenId: allergenId });

    if (!allergen) {
      return res.status(404).json({ message: "Allergen not found" });
    }

    // Return the allergen
    res.status(200).json({ allergen });
  } catch (error) {
    console.error("Error fetching Allergen by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllAllergens,
  getAllergenById,
};
