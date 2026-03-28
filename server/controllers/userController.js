const userRepository = require("../repositories/userRepo");
const bcrypt = require("bcrypt");

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // cifrado de seguridad
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // almacenamos en la database
      const newUser = await userRepository.insert({
        username,
        email,
        password_hash: hashedPassword, //IMMPORTANTE guardar hash y no contraseña
      });

      //respuesta
      res.status(201).json({
        message: "Usuario registrado con éxito en Zaldicash",
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      console.error("Error en el registro", error);
      res.status(500).json({
        error: "Error interno del servidor",
        details: error.message,
      });
    }
  },
};

module.exports = userController;
