const investmentRepo = require("../repositories/investmentRepo");

const investmentController = {
  create: async (req, res) => {
    try {
      const { name, category, initial_amount, accountId } = req.body;
      const userId = req.user.id;

      const newInvestment = await investmentRepo.insertWithTransaction({
        name,
        category,
        initial_amount,
        current_amount: initial_amount, // Al inicio son iguales
        userId,
        accountId
      });

      res.status(201).json({
        message: "Inversión registrada, saldo actualizado y movimiento guardado",
        investment: newInvestment,
      });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo procesar la inversión",
        details: error.message,
      });
    }
  },
  
  listMyInvestments: async (req, res) => {
    try {
      const investments = await investmentRepo.getByUserId(req.user.id);
      res.json(investments);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener inversiones" });
    }
  },
};

module.exports = investmentController;