const investementRepository = require("../repositories/investmentRepo");

const investmentController = {
  create: async (req, res) => {
    try {
      const { name, category, initialamount } = req.body;

      //el userid viene del middleware
      const userId = req.user.id;

      const newInvestment = await investementRepository.insert({
        name,
        category,
        initial_amount,
        current_amount: initialamount,
        userId,
      });

      res.status(201).json({
        message: "Inversión registrada con éxito",
        investment: newInvestment,
      });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo crear la inversión",
        details: error.message,
      });
    }
  },
  listMyInvestments: async (req, res) => {
    try {
      const userId = req.user.id;
      const investments = await investementRepository.getByUserId(userId);
      res.json(investments);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener tus inversiones" });
    }
  },
};

module.exports = investmentController;
