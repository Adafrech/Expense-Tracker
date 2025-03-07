const { Expense, Category } = require('../models');
const { handleSequelizeError } = require('../utils/errorHandler');


const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [{ model: Category, attributes: ['name', 'type'] }],
    });
    res.status(200).json(expenses);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};

// Obtener un gasto por ID
const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id, {
      include: [{ model: Category, attributes: ['name', 'type'] }],
    });
    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.status(200).json(expense);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const createExpense = async (req, res) => {
  const { amount, description, category_id, date } = req.body;
  try {

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    if (category.type !== 'expense') {
      return res.status(400).json({ message: 'La categoría debe ser de tipo gasto' });
    }
    
    const newExpense = await Expense.create({
      amount,
      description,
      category_id,
      date,
    });
    
    res.status(201).json(newExpense);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category_id, date } = req.body;
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    
    
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      if (category.type !== 'expense') {
        return res.status(400).json({ message: 'La categoría debe ser de tipo gasto' });
      }
    }
    
    await expense.update({
      amount,
      description,
      category_id,
      date,
    });
    
    res.status(200).json(expense);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    await expense.destroy();
    res.status(200).json({ message: 'Gasto eliminado correctamente' });
  } catch (error) {
    handleSequelizeError(error, res);
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};