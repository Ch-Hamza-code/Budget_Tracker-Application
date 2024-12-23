const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    budgetLimit,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields: name, email, password.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password do not match." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with that email." });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      budgetLimit,
      role: role || "user",
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        firstName: newUser.firstName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with that email." });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please check your password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // Payload (user info)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Expiry time
    );

    res.status(200).json({
      message: "Login successful",
      token, // Send the token to the client
      profile: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v");

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.put("/:email", async (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, email: newEmail } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = newEmail || user.email;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.delete("/_id/:_id", verifyAdmin, async (req, res) => {
  const { _id } = req.params;
  console.log("Received delete request for email:", _id); // Debugging log
  try {
    const user = await User.findOneAndDelete({ _id: _id });
    if (!user) {
      console.log("User not found for id:", _id); // Debugging log
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
