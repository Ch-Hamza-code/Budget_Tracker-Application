const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  jobTitle: String,
  streetAddress: String,
  budgetlimit: String,
  city: String,
  state: String,
  zipCode: String,
  phoneNumber: String,
  dob: String,
  education: String,
  gender: String,
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Account", accountSchema);
