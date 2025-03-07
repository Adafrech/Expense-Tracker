const sequelize = require('../config/database');
const Category = require('./Category');
const Income = require('./Income');
const Expense = require('./Expense');
const Report = require('./Report');

// Relaciones
Category.hasMany(Income, { foreignKey: 'category_id' });
Income.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasMany(Expense, { foreignKey: 'category_id' });
Expense.belongsTo(Category, { foreignKey: 'category_id' });


const syncDatabase = async () => {
  try {
    // Usar { force: true } para eliminar y recrear las tablas (¡warning in prod!)
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

module.exports = {
  sequelize,
  Category,
  Income,
  Expense,
  Report,
  syncDatabase,
};