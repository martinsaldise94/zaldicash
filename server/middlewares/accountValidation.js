const { body, validationResult } = require("express-validator");

const accountValidation = [
  body("name")
    .notEmpty().withMessage("El nombre de la cuenta es obligatorio")
    .trim(),
  body("type")
    .notEmpty().withMessage("El tipo de cuenta (banco, cripto, etc.) es obligatorio"),
  body("balance")
    .optional()
    .isDecimal().withMessage("El balance debe ser un número válido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = accountValidation;