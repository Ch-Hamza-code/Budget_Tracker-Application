const express = require("express");
const Account = require("../models/Account");
const authenticateJWT = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authenticateJWT, async (req, res) => {
  try {
    const email = req.user.email;
    const accountData = { ...req.body, email };

    let account = await Account.findOne({ email });

    if (account) {
      account = await Account.findOneAndUpdate({ email }, accountData, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Account updated successfully", account });
    }

    account = new Account(accountData);
    await account.save();

    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving account data", details: error.message });
  }
});

router.get("/fetch", authenticateJWT, async (req, res) => {
  try {
    const email = req.user.email;

    const account = await Account.findOne({ email });
    if (!account) {
      return res
        .status(404)
        .json({ error: "No account data found for this user" });
    }

    res.json(account);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching account data", details: error.message });
  }
});

module.exports = router;
