const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authenticateJWT = require("../middleware/authMiddleware");

router.post("/add/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { title, price, date, userEmail } = req.body;

  try {
    const newExpense = new Expense({
      title,
      price,
      date,
      userEmail,
      accountId: id,
    });
    await newExpense.save();

    // Verify by querying the latest added expense
    const savedExpense = await Expense.findOne({ _id: newExpense._id });
    if (savedExpense) {
      res
        .status(201)
        .json({ message: "Expense added successfully", expense: savedExpense });
    } else {
      res
        .status(500)
        .json({ error: "Expense not found in database after save" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

router.get("/analytics", authenticateJWT, async (req, res) => {
  const userId = req.user.userId;
  console.log("User", req.user);
  try {
    const expenses = await Expense.find({ accountId: userId }, "-__v ");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});
router.get("/", authenticateJWT, async (req, res) => {
  const userId = req.user.userId;
  console.log("User", req.user);
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const rowsPerPage = Math.max(1, parseInt(req.query.rowsPerPage, 10) || 5);
    const totalExpenses = await Expense.countDocuments();
    const totalPages = Math.ceil(totalExpenses / rowsPerPage);
    if (totalExpenses === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    if (page > totalPages) {
      return res.status(404).json({ message: "No users found for this page" });
    }

    const skipValue = (page - 1) * rowsPerPage;

    const expenses = await Expense.find({ accountId: userId }, "-__v ")
      .skip(skipValue)
      .limit(rowsPerPage)
      .exec();
    res.status(200).json({
      expenses,
      pagination: {
        totalExpenses,
        totalPages,
        currentPage: page,
        rowsPerPage,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
