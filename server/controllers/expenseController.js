const pool = require('../config/db');

// Add new expense
const addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      'INSERT INTO expenses (user_id, amount, category, date, description) VALUES (?, ?, ?, ?, ?)',
      [userId, amount, category, date, description]
    );

    res.status(201).json({ message: 'Expense added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get expenses (optionally filtered by date)
const getExpenses = async (req, res) => {
  const userId = req.user.id;
  const { range } = req.query;

  let dateCondition = '';
  if (range === '7d') {
    dateCondition = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
  } else if (range === '1m') {
    dateCondition = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)';
  } else if (range === '3m') {
    dateCondition = 'AND date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)';
  }

  try {
    const [expenses] = await pool.query(
      `SELECT * FROM expenses WHERE user_id = ? ${dateCondition} ORDER BY date DESC`,
      [userId]
    );
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addExpense,
  getExpenses,
};
