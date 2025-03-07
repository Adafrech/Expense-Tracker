const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');
const { validateExpenseData } = require('../utils/validator');

router.get('/', expenseController.getAllExpenses);
router.get('/:id', expenseController.getExpenseById);
router.post('/', validateExpenseData, expenseController.createExpense);
router.put('/:id', validateExpenseData, expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
