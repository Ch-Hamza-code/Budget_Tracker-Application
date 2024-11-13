const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  userEmail: { type: String, required: true },
  accountId: {type: String, required: true}
  
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
