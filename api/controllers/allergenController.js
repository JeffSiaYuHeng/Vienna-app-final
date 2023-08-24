const Allergen = require("./models/Allergen");

// Controller function to get all allergens
exports.getAllAllergens = async (req, res) => {
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
