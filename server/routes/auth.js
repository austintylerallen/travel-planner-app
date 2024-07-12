// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username: username || null, // Handle optional username
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
