const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Income = sequelize.define('Income', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.REAL, 
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE, 
    allowNull: false,
  },
}, {
  tableName: 'incomes', 
  timestamps: true,
});

module.exports = Income;