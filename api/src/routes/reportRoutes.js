const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');
const { validateReportData } = require('../utils/validator');

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/generate', validateReportData, reportController.generateMonthlyReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
