const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the User schema
const UserSchema = new mongoose.Schema({
    firstName: {   type: String,  required: true, },
    lastName:  {   type: String,  required: true, },
    email:     {  type: String, required: true,  unique: true, },
    password:  {  type: String,  required: true, },
    budgetLimit: { type: Number, required: true, },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    date:        { type: Date,  default: Date.now,},
});

// Pre-save middleware to hash the password before saving to the DB
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare the password (for login purposes)
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// Static login method to authenticate a user
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
};


module.exports = mongoose.model('users', UserSchema);







