const express = require("express");
const router = express.Router();

//middleware de validación de usuario
const userValidation = require("../middlewares/userValidation");

//controlador (más pro que como hacía antes)
const userController = require("../controllers/userController");

// middleware de validacion
const auth = require("../middlewares/authMiddleware");

// rutas públicas
router.post("/register", userValidation, userController.register);
router.post("/login", userController.login);

//rutas protegidas
router.get("/profile", auth, userController.getProfile);
router.put("/update", auth, userController.update);
router.delete("/delete", auth, userController.delete);

module.exports = router;
