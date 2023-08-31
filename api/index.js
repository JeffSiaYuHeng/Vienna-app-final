const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path"); // Add this line to import the 'path' module

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/files", express.static(path.join(__dirname, "files")));
mongoose
  .connect(
    // "mongodb+srv://JeffSia:f4aJC4yp5sdcutPv@viennafinal.a0edcrj.mongodb.net/?retryWrites=true&w=majority",
    "mongodb+srv://JeffSia:hJ4YkeMI521zjtfH@viennaapp.beqbheu.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

// Load routes
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const instructionRoutes = require("./routes/instructionRoutes");
const recipeLikeRoutes = require("./routes/recipeLikeRoutes");
const userFollowRoutes = require("./routes/userFollowRoutes");
const savedRecipeRoutes = require("./routes/savedRecipeRoutes");
const shoppingListRoutes = require("./routes/shoppingListRoutes");
const recipeReviewRoutes = require("./routes/recipeReviewRoutes");
const dietaryRestrictionRoutes = require("./routes/dietaryRestrictionRoutes");
const userDietaryRestrictionRoutes = require("./routes/userDietaryRestrictionRoutes");
const allergenRoutes = require("./routes/allergenRoutes");
const userAllergenRoutes = require("./routes/userAllergenRoutes");
const recipeIngredientRoutes = require("./routes/recipeIngredientRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const IngredientSearchRoutes = require("./routes/IngredientSearchRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/instructions", instructionRoutes);
app.use("/api/recipeLikes", recipeLikeRoutes);
app.use("/api/userFollow", userFollowRoutes);
app.use("/api/savedRecipes", savedRecipeRoutes);
app.use("/api/shoppingList", shoppingListRoutes);
app.use("/api/recipeReviews", recipeReviewRoutes);
app.use("/api/dietaryRestrictions", dietaryRestrictionRoutes);
app.use("/api/userDietaryRestriction", userDietaryRestrictionRoutes);
app.use("/api/allergen", allergenRoutes);
app.use("/api/userAllergen", userAllergenRoutes);
app.use("/api/recipeIngredients", recipeIngredientRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/IngredientSearch", IngredientSearchRoutes);
app.use("/api/notifications", notificationRoutes);







app.listen(port, () => {
  console.log("Server running on port 8000");
});
