const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, budgetLimit } = req.body;
    // Validate request data
    if (!firstName|| !lastName ||!email || !password ) {
        return res.status(400).json({ message: 'Please provide all required fields: name, email, password.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password do not match.' });
    }

    try {
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with that email.' });
        }

        const newUser = new User({  firstName,  lastName,   email,  password,   confirmPassword,   budgetLimit  });
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully.',
            user: {
                firstName: newUser.firstName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        
        const user = await User.findOne({ email });
        
        console.log()
        if (!user) {
            return res.status(400).json({ message: 'User not found with that email.' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Please check your password.' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload (user info)
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiry time
        );
        console.log(token)
        res.status(200).json({
            message: 'Login successful',
            token, // Send the token to the client
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude the password field
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// In your userRoutes.js file
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
  
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  });
  

module.exports = router;






