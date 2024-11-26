// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the User model is in /models/User

// Register controller
const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;
    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      role, // 'admin', 'doctor', 'patient'
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handle errors (e.g., server errors)
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log("No User");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) {
      console.log("Pwd Mismatch");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role }, 
      process.env.JWT_SECRET,  // Ensure you have a JWT secret stored in .env file
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Attach the user info to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { register, login, verifyToken };
