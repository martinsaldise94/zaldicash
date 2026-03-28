const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ message: "Servidor de ZaldiCash funcionando correctamente " });
});

const PORT = process.env.PORT || 5000;

db.sequelize
  .authenticate() 
  .then(() => {
    console.log("✅ Conexión a Postgres establecida con éxito.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
