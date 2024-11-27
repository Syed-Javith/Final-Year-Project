// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the User model is in /models/User
const Patient = require('../models/Patient');

// Register controller
const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    let id;
    if(role==="patient"){
      id = Date.now();
      const patient = new Patient({ patient_id : id })
      await patient.save();
    }
    const hashedPassword = password;
    
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
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
    let patient = null;
    if(user.role==="patient"){
      patient = await Patient.findOne({ patient_name : username})
    }
    // Generate a JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role , patient_id : patient?.patient_id }, 
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
