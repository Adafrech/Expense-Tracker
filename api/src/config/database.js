const { Sequelize } = require('sequelize');
const path = require('path'); 
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite', 
  storage: path.resolve(__dirname, process.env.DB_NAME), 
  logging: (msg) => {
    if (msg.includes('ERROR')) {
      console.error(msg); 
    }
  },
});

module.exports = sequelize;