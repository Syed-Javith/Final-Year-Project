// routes/authRouter.js
const express = require('express');
const { register, login, verifyToken } = require('../controllers/authController');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected route (example route that requires authentication)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

module.exports = router;
