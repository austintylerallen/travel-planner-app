// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: { // Add this if you have a username field
    type: String,
    unique: true,
    sparse: true, // Allow null values but enforce uniqueness on non-null values
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
