const mongoose = require("mongoose");

const AllergenSchema = new mongoose.Schema({
  AllergenId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

const Allergen = mongoose.model("Allergen", AllergenSchema);

module.exports = Allergen;
