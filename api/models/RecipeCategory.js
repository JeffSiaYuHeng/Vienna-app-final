const mongoose = require('mongoose');

const recipeCategorySchema = new mongoose.Schema({
  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

const RecipeCategory = mongoose.model('RecipeCategory', recipeCategorySchema);

module.exports = RecipeCategory;
