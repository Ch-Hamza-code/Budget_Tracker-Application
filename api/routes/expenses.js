const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authenticateJWT = require("../middleware/authMiddleware");

//ADD EXPENSES ROUTE

router.post("/add/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { title, price, date, userEmail } = req.body;

  try {
    const parsedDate = new Date(date.split("-").reverse().join("-"));

    const newExpense = new Expense({
      title,
      price,
      date: parsedDate,
      userEmail,
      accountId: id,
    });
    await newExpense.save();

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

//ANALYTICS  ROUTE

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

//GET EXPENSES ROUTE
router.get("/", authenticateJWT, async (req, res) => {
  const userId = req.user.userId;
  const sortField = req.query.sortField || "date";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const rowsPerPage = Math.max(1, parseInt(req.query.rowsPerPage, 10) || 5);
    const totalExpenses = await Expense.countDocuments();
    const totalPages = Math.ceil(totalExpenses / rowsPerPage);

    if (totalExpenses === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "No expenses found for this page" });
    }
    const skipValue = (page - 1) * rowsPerPage;
    const expenses = await Expense.find({ accountId: userId }, "-__v ")
      .sort({ [sortField]: sortOrder })
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

//DELETE ROUTE

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

//EDIT EXPENSE ROUTE
router.put("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { title, price, date } = req.body;

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    if (expense.userEmail !== req.user.email) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this expense" });
    }

    expense.title = title;
    expense.price = price;
    expense.date = date;
    await expense.save();

    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.error("Update Expense Error:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
});
