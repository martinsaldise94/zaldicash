const { body, validationResult } = require("express-validator");

const investmentValidation = [
  // 1. Nombre de la inversión
  body("name")
    .exists()
    .withMessage("El nombre de la inversión es requerido")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .trim(),

  // 2. Categoría
  body("category")
    .exists()
    .withMessage("La categoría es requerida")
    .notEmpty()
    .withMessage("Debes especificar una categoría (Cripto, Acciones, etc.)")
    .trim(),

    //ticker
  body("ticker")
    .exists()
    .withMessage("El ticker es obligatorio")
    .notEmpty()
    .withMessage("El ticker no puede estar vacío")
    .isLength({ min: 1, max: 10 })
    .withMessage("Ticker no válido")
    .trim()
    .toUpperCase(), 

  //cuenta de la que proviene
  body("accountId")
    .exists()
    .withMessage("Debes especificar la cuenta de origen")
    .isInt()
    .withMessage("El ID de la cuenta debe ser un número válido"),

  // 3. Cantidad Inicial
  body("initial_amount")
    .exists()
    .withMessage("La cantidad inicial es requerida")
    .isFloat({ min: 0.01 })
    .withMessage("La cantidad debe ser un número mayor a 0")
    .custom((value) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        throw new Error("La cantidad solo puede tener hasta 2 decimales");
      }
      return true;
    }),

  // 4. Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

module.exports = investmentValidation;
