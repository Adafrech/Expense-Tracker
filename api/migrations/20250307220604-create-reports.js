'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 12,
        },
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_income: {
        type: Sequelize.REAL, 
        defaultValue: 0,
      },
      total_expense: {
        type: Sequelize.REAL, 
        defaultValue: 0,
      },
      balance: {
        type: Sequelize.REAL,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reports');
  },
};