const express = require('express');
const Account = require('../models/Account'); // MongoDB model for accounts
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// Save account data
router.post('/add', authenticateJWT, async (req, res) => {
  try {
    const email = req.user.email; // Extract email from token
    const accountData = { ...req.body, email }; // Add email to the payload

    // Check if the account already exists
    let account = await Account.findOne({ email });

    if (account) {
      // Update existing account
      account = await Account.findOneAndUpdate({ email }, accountData, { new: true });
      return res.status(200).json({ message: 'Account updated successfully', account });
    }

    // Create new account
    account = new Account(accountData);
    await account.save();

    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    res.status(500).json({ error: 'Error saving account data', details: error.message });
  }
});


// Fetch account data for logged-in user
router.get('/fetch', authenticateJWT, async (req, res) => {
  try {
    const email = req.user.email; // Get the logged-in user's email

    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(404).json({ error: 'No account data found for this user' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching account data', details: error.message });
  }
});

module.exports = router;
