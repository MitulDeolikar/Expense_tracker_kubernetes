const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(cors({
  origin: '*', // Allow all origins temporarily for testing
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes); // ✅ Mount auth routes
app.use('/api/expenses', expenseRoutes); // ✅ Mount expense routes

app.get('/', (req, res) => {
  res.send('Expense Tracker API running ✅');
});

module.exports = app;
