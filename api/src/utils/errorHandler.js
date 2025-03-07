const { ValidationError, DatabaseError, UniqueConstraintError } = require('sequelize');

const handleSequelizeError = (error, res) => {
  console.error('Error en operación de base de datos:', error);
  
  if (error instanceof ValidationError) {
    return res.status(400).json({
      message: 'Error de validación',
      errors: error.errors.map(e => e.message),
    });
  }
  
  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      message: 'Conflicto con datos existentes',
      errors: error.errors.map(e => e.message),
    });
  }
  
  if (error instanceof DatabaseError) {
    return res.status(500).json({
      message: 'Error de base de datos',
      error: error.message,
    });
  }
  
  return res.status(500).json({
    message: 'Error interno del servidor',
    error: error.message,
  });
};

module.exports = {
  handleSequelizeError,
};