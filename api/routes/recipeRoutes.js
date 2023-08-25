const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Define your recipe routes here
const upload = multer({ storage: storage });

router.post("/create", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Handle Multer-related errors
      console.error("Multer Error:", err);
      return res.status(400).json({ message: "File upload failed" });
    }
    // Continue to your createRecipe controller
    recipeController.createRecipe(req, res);
  });
});router.put("/:recipeId", recipeController.updateRecipe);
router.get("/home", recipeController.getAllRecipes);
router.get("/find/:recipeId", recipeController.getRecipeById);
router.get("/user/:userId", recipeController.getRecipesByUserId);
router.delete("/delete/:recipeId", recipeController.deleteRecipe);

module.exports = router;
