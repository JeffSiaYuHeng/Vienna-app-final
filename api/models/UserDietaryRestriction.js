const mongoose = require('mongoose');

const userAllergenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  RestrictionID: {
    type: String,
    required: true,
  },
});

const userAllergen = mongoose.model('userAllergen', userAllergenSchema);

module.exports = userAllergen;
