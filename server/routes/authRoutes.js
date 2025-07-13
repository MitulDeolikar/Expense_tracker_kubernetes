const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authenticate = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route to get current user
router.get('/me', authenticate, async (req, res) => {
  const user = req.user; // this comes from the authMiddleware
  res.json({ name: user.name, email: user.email });
});

module.exports = router;
