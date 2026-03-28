const userRepository = require("../repositories/userRepo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //encontramos el usuario buscándolo por el mail
      const user = await userRepository.getByMail(email);
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      //generamos token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
      );

      //todo bien
      res.json({
        message: "Login exitoso",
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error en el servidor", details: error.message });
    }
  },
};

module.exports = userController;
