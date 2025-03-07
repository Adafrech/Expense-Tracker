const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/IncomeController');
const { validateIncomeData } = require('../utils/validator');

router.get('/', incomeController.getAllIncomes);
router.get('/:id', incomeController.getIncomeById);
router.post('/', validateIncomeData, incomeController.createIncome);
router.put('/:id', validateIncomeData, incomeController.updateIncome);
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;