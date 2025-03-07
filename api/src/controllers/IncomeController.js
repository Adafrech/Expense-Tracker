const { Income, Category } = require('../models');
const { handleSequelizeError } = require('../utils/errorHandler');


const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({
      include: [{ model: Category, attributes: ['name', 'type'] }],
    });
    res.status(200).json(incomes);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const getIncomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByPk(id, {
      include: [{ model: Category, attributes: ['name', 'type'] }],
    });
    if (!income) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }
    res.status(200).json(income);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const createIncome = async (req, res) => {
  const { amount, description, category_id, date } = req.body;
  try {
  
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    if (category.type !== 'income') {
      return res.status(400).json({ message: 'La categoría debe ser de tipo ingreso' });
    }
    
    const newIncome = await Income.create({
      amount,
      description,
      category_id,
      date,
    });
    
    res.status(201).json(newIncome);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category_id, date } = req.body;
  try {
    const income = await Income.findByPk(id);
    if (!income) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }
    
   
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      if (category.type !== 'income') {
        return res.status(400).json({ message: 'La categoría debe ser de tipo ingreso' });
      }
    }
    
    await income.update({
      amount,
      description,
      category_id,
      date,
    });
    
    res.status(200).json(income);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByPk(id);
    if (!income) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }
    await income.destroy();
    res.status(200).json({ message: 'Ingreso eliminado correctamente' });
  } catch (error) {
    handleSequelizeError(error, res);
  }
};

module.exports = {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};