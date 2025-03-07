const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12,
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_income: {
    type: DataTypes.REAL, 
    defaultValue: 0,
  },
  total_expense: {
    type: DataTypes.REAL, 
    defaultValue: 0,
  },
  balance: {
    type: DataTypes.REAL, 
    defaultValue: 0,
  },
}, {
  tableName: 'reports', 
  timestamps: true,
});

module.exports = Report;