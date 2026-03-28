const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //sacamos el header, donde va el token
  const authHeader = req.headers["authorization"];

  //Hay que sacar el token del header que hemos quitado
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Acceso denegado. Se requiere un token de autenticación.",
    });
  }

  try {
    //verifico el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //PASO IMPORTANTE
    //metemos los datos en el objeto req en el futuro. cuando llegue una peticion
    // al controlador de inversiones, verá que el id es por ejemplo el 1
    //y solo enseñará los de ese user
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o caducado" });
  }
};

module.exports = authMiddleware;
