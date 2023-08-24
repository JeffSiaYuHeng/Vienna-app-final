// controllers/userController.js

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User object
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Error registering the user!" });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check for that user in the database
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Password is correct, generate and send the token
    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error finding the user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get The UserProfile by refer its ID
const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user information
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      // Add more fields as needed
    });
  } catch (error) {
    console.log("Error fetching user information", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided in the request body
    if (req.file) {
      user.UserImage = req.file.path;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error updating user profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

const activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Update the user's initialStatus to "Active"
    await User.findByIdAndUpdate(userId, { initialStatus: "Active" });

    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.error("Error activating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  activateUser,
};
