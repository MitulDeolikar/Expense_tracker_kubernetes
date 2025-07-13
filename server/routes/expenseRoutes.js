const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const verifyToken = require('../middleware/auth'); // 🔒 JWT Middleware

router.post('/', verifyToken, addExpense);     // ➕ Add expense
router.get('/', verifyToken, getExpenses);     // 📄 Get expenses

module.exports = router;
