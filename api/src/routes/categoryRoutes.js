const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { validateCategoryData } = require('../utils/validator');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', validateCategoryData, categoryController.createCategory);
router.put('/:id', validateCategoryData, categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;