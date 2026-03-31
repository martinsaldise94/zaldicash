const { body, validationResult } = require("express-validator");

const transactionValidation = [
  body("amount").isFloat({ min: 0.01 }).withMessage("La cantidad debe ser mayor a 0"),
  body("type").isIn(["income", "expense"]).withMessage("El tipo debe ser 'income' o 'expense'"),
  body("accountId").isInt().withMessage("ID de cuenta inválido"),
  body("description").optional().isString().trim(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = transactionValidation;