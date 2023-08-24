const mongoose = require('mongoose');

const userDietaryRestrictionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  RestrictionID: {
    type: String,
    required: true,
  },
});

const userDietaryRestriction = mongoose.model(
  "userDietaryRestriction",
  userDietaryRestrictionSchema
);

module.exports = userDietaryRestriction;
