const investmentRepo = require("../repositories/investmentRepo");

const investmentController = {
  create: async (req, res) => {
    try {
      const { name, category, ticker, initial_amount, accountId, quantity } =
        req.body;
      const userId = req.user.id;

      const newInvestment = await investmentRepo.insertWithTransaction({
        name,
        category,
        ticker,
        initial_amount,
        current_amount: initial_amount, // Al inicio son iguales
        quantity: quantity || 0,
        userId,
        accountId,
      });

      res.status(201).json({
        message:
          "Inversión registrada, saldo actualizado y movimiento guardado",
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
  refreshPrices: async (req, res) => {
    try {
      const userId = req.user.id;
      const updates = await investmentRepo.updateLivePrices(userId);

      res.json({
        message: "Precios actualizados con éxito",
        updates: updates,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar precios", details: error.message });
    }
  },
  sell: async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const closedInv = await investmentRepo.sell(id, userId);
    
    res.json({ 
      message: "Inversión cerrada con éxito. El capital ha vuelto a tu cuenta.", 
      investment: closedInv 
    });
  } catch (error) {
    res.status(500).json({ error: "Error al vender", details: error.message });
  }
}
};

module.exports = investmentController;
