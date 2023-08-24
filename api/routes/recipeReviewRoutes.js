const express = require("express");
const router = express.Router();
const recipeReviewController = require("../controllers/recipeReviewController");

// Fetch reviews by Recipe ID
router.get("/:recipeId", recipeReviewController.getReviewsByRecipeId);

// Create a new review
router.post("/", recipeReviewController.createReview);

// Delete a specific review
router.delete("/delete/:reviewId", recipeReviewController.deleteReview);

module.exports = router;
