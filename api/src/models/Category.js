const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['income', 'expense']],
    },
  },
}, {
  tableName: 'categories', 
  timestamps: true,
});

module.exports = Category;