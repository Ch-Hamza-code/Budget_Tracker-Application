const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  budgetLimit: { type: String },
  jobTitle: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  phoneNumber: { type: String },
  dob: { type: String },
  education: { type: String },
  gender: { type: String },
});

module.exports = mongoose.model('Account', accountSchema);
