const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//ruta de estado
app.get("/api/status", (req, res) => {
  res.json({ message: "Servidor de ZaldiCash funcionando correctamente " });
});

//declaración de rutas
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

//-------------------------------------------------------------------------------------------------
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

//rutas
