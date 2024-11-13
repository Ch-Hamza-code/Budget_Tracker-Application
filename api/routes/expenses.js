const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authenticateJWT = require('../middleware/authMiddleware'); 


router.post('/add', authenticateJWT, async (req, res) => {
    const { title, price, date } = req.body;
    const userEmail = req.user.email; // Get the user email from the authenticated token

    try {
        const newExpense = new Expense({ title, price, date, userEmail });
        await newExpense.save();

        // Verify by querying the latest added expense
        const savedExpense = await Expense.findOne({ _id: newExpense._id });
        if (savedExpense) {
            res.status(201).json({ message: 'Expense added successfully', expense: savedExpense });
        } else {
            res.status(500).json({ error: 'Expense not found in database after save' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add expense' });
    }
});

router.get('/', authenticateJWT, async (req, res) => {
    const userEmail = req.user.email; // Get the user email from the authenticated token
    try {
        const expenses = await Expense.find({ userEmail }, '-__v ');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});


router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
      const { id } = req.params;
      const deletedExpense = await Expense.findByIdAndDelete(id); // Delete expense by ID
      if (!deletedExpense) {
          return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;
