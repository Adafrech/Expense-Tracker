const validateCategoryData = (req, res, next) => {
    const { name, type } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
    }
    
    if (!type || typeof type !== 'string' || !['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'El tipo debe ser "income" o "expense"' });
    }
    
    next();
  };
  
  const validateIncomeData = (req, res, next) => {
    const { amount, category_id, date } = req.body;
    
    if (amount === undefined || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ message: 'El monto debe ser un número positivo' });
    }
    
    if (!category_id || isNaN(parseInt(category_id))) {
      return res.status(400).json({ message: 'Se requiere un ID de categoría válido' });
    }
    
    if (!date || !isValidDate(date)) {
      return res.status(400).json({ message: 'Se requiere una fecha válida (YYYY-MM-DD)' });
    }
    
    next();
  };
  
  const validateExpenseData = (req, res, next) => {
    const { amount, category_id, date } = req.body;
    
    if (amount === undefined || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ message: 'El monto debe ser un número positivo' });
    }
    
    if (!category_id || isNaN(parseInt(category_id))) {
      return res.status(400).json({ message: 'Se requiere un ID de categoría válido' });
    }
    
    if (!date || !isValidDate(date)) {
      return res.status(400).json({ message: 'Se requiere una fecha válida (YYYY-MM-DD)' });
    }
    
    next();
  };
  
  const validateReportData = (req, res, next) => {
    const { month, year } = req.body;
    
    if (!month || isNaN(parseInt(month)) || month < 1 || month > 12) {
      return res.status(400).json({ message: 'Se requiere un mes válido (1-12)' });
    }
    
    if (!year || isNaN(parseInt(year))) {
      return res.status(400).json({ message: 'Se requiere un año válido' });
    }
    
    next();
  };
  
  // Función auxiliar para validar formato de fecha
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };
  
  module.exports = {
    validateCategoryData,
    validateIncomeData,
    validateExpenseData,
    validateReportData,
  };