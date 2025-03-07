const { Report, Income, Expense, sequelize } = require('../models');
const { Op } = require('sequelize');
const { handleSequelizeError } = require('../utils/errorHandler');


const getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.status(200).json(report);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const generateMonthlyReport = async (req, res) => {
  const { month, year } = req.body;
  

  if (!month || month < 1 || month > 12 || !year) {
    return res.status(400).json({ message: 'Mes y año son requeridos y deben ser válidos' });
  }
  
  try {
  
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    

    const totalIncome = await Income.sum('amount', {
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    }) || 0;
    
    const totalExpense = await Expense.sum('amount', {
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    }) || 0;
    
    const balance = totalIncome - totalExpense;
    

    let [report, created] = await Report.findOrCreate({
      where: { month, year },
      defaults: {
        total_income: totalIncome,
        total_expense: totalExpense,
        balance: balance,
      },
    });
    

    if (!created) {
      await report.update({
        total_income: totalIncome,
        total_expense: totalExpense,
        balance: balance,
      });
    }
    
    res.status(created ? 201 : 200).json(report);
  } catch (error) {
    handleSequelizeError(error, res);
  }
};


const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    await report.destroy();
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    handleSequelizeError(error, res);
  }
};

module.exports = {
  getAllReports,
  getReportById,
  generateMonthlyReport,
  deleteReport,
};
