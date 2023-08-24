const RecipeReview = require("../models/RecipeReview");

// Fetch reviews by Recipe ID
const getReviewsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    // Find all RecipeReviews for the specified recipe ID
    const reviews = await RecipeReview.find({ RecipeID: recipeId });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews by recipe ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    // Get data from the request body
    const { RecipeID, UserID, Rates, Comment } = req.body;

    // Validate the data (e.g., ensure required fields are provided)

    // Create a new review instance
    const newReview = new RecipeReview({
      RecipeID,
      UserID,
      Rates,
      Comment,
    });

    // Save the review to the database
    await newReview.save();

    // Return a success response
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the review" });
  }
};

// Delete a specific review
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;

  try {
    // Find and delete the review by its ID
    const deletedReview = await RecipeReview.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting the review!" });
  }
};

module.exports = {
  getReviewsByRecipeId,
  createReview,
  deleteReview,
};
