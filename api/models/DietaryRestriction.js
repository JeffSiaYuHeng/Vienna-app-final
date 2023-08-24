const mongoose = require("mongoose");

const DietaryRestrictionSchema = new mongoose.Schema({
  DietaryRestrictionId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

const DietaryRestriction = mongoose.model(
  "DietaryRestriction",
  DietaryRestrictionSchema
);

module.exports = DietaryRestriction;
