const { body, validationResult } = require("express-validator");
const userRepository = require("../repositories/userRepo.js");

const userValidation = [
  //nombre
  body("username")
    .exists()
    .withMessage("Se requiere nombre de usuario")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío")
    .trim(), // por si hay espacio final

  //email
  body("email")
    .exists()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Email inválido. Proporciona uno adecuado")
    .normalizeEmail()
    .custom(async (email) => {
      //conectar con userRepo.js y utilizar la función de buscar por email para ver si está repetido
      const user = await userRepository.getByMail(email);
      if (user) {
        throw new Error("Este email ya está registrado en Zaldicash");
      }
      return true;
    }),

  // contraseña
  body("password")
    .exists()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula"),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors
          .array()
          .map((err) => ({ field: err.path, message: err.msg })),
      });
    }
    next();
  },
];

module.exports= userValidation
