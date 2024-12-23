const User = require("../models/user"); // Ensure "User" is correctly cased
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword, budgetlimit } =
    req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });
    await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const rowsPerPage = Math.max(1, parseInt(req.query.rowsPerPage, 10) || 5);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    if (totalUsers === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    if (page > totalPages) {
      return res.status(404).json({ message: "No users found for this page" });
    }

    const skipValue = (page - 1) * rowsPerPage;
    const users = await User.find({}, "-password -budgetLimit -date")
      .skip(skipValue)
      .limit(rowsPerPage)
      .exec();

    res.status(200).json({
      users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page,
        rowsPerPage,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
