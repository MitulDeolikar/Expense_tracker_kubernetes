const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 🔐 Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const insertedId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { id: insertedId, email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return token and user
    const user = { id: insertedId, name, email };
    res.status(201).json({ token, user });

  } catch (err) {
    console.error('[Register Error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔐 Login existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return token and user
    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error('[Login Error]', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
