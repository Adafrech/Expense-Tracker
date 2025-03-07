const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('../src/models/index');


const categoryRoutes = require('./routes/categoryRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportRoutes = require('./routes/reportRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/categories', categoryRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API de Finanzas funcionando correctamente' });
});


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


const startServer = async () => {
  try {
   
    await syncDatabase();
  

    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); 
  }
};


startServer();

process.on('SIGINT', () => {
  console.log('Servidor detenido');
  process.exit(0);
});

module.exports = app;