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
const recipeLikeRoutes = require("./routes/recipeLikeRoutes"); // Add this line to load recipeLikeRoutes
const userFollowRoutes = require("./routes/userFollowRoutes"); // Add this line to load userFollowRoutes
const savedRecipeRoutes = require("./routes/savedRecipeRoutes"); // Add this line to load savedRecipeRoutes
const shoppingListRoutes = require("./routes/shoppingListRoutes"); // Add this line to load shoppingListRoutes
const recipeReviewRoutes = require("./routes/recipeReviewRoutes"); // Add this line to load recipeReviewRoutes
const dietaryRestrictionRoutes = require("./routes/dietaryRestrictionRoutes"); // Add this line to load dietaryRestrictionRoutes
const userDietaryRestrictionRoutes = require("./routes/userDietaryRestrictionRoutes");
const allergenRoutes = require("./routes/allergenRoutes"); // Import the new allergen route
const userAllergenRoutes = require("./routes/userAllergenRoutes"); // Import the new userAllergen route

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/instruction", instructionRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipeLikes", recipeLikeRoutes); // Use recipeLikeRoutes under "/recipeLikes" endpoint
app.use("/api/userFollow", userFollowRoutes); // Use userFollowRoutes under "/userFollow" endpoint
app.use("/savedRecipes", savedRecipeRoutes); // Use savedRecipeRoutes under "/savedRecipes" endpoint
app.use("/shoppingList", shoppingListRoutes); // Use shoppingListRoutes under "/shoppingList" endpoint
app.use("/recipeReviews", recipeReviewRoutes); // Use recipeReviewRoutes under "/recipeReviews" endpoint
app.use("/dietaryRestrictions", dietaryRestrictionRoutes); // Use dietaryRestrictionRoutes under "/dietaryRestrictions" endpoint
app.use("/api/userDietaryRestriction", userDietaryRestrictionRoutes);
app.use("/api/allergen", allergenRoutes); // Use the new allergen route
app.use("/api/userAllergen", userAllergenRoutes); // Use the new userAllergen route




app.listen(port, () => {
  console.log("Server running on port 8000");
});
