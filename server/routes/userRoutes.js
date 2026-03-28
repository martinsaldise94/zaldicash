const express = require("express");
const router = express.Router();

//middleware de validación de usuario
const userValidation = require("../middlewares/userValidation");

//controlador (más pro que como hacía antes)
const userController = require("../controllers/userController");

// POST a /api/users/register
router.post("/register", userValidation, userController.register);

//POST a /api/users/login
router.post('/login', userController.login);

module.exports = router;
