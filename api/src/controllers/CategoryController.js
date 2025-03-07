const { Category } = require('../models');
const { handleSequelizeError } = require('../utils/errorHandler');


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const createCategory = async (req, res) => {
  const { name, type } = req.body;
  try {
    const newCategory = await Category.create({ name, type });
    res.status(201).json(newCategory);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    await category.update({ name, type });
    res.status(200).json(category);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};



const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    handleSequelizeError(error, res);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};