const dashboardRepo = require("../repositories/dashboardRepo");

const dashboardController = {
  getSummary: async (req, res) => {
    try {
      const userId = req.user.id;
      const summary = await dashboardRepo.getFinancialSummary(userId);

      res.json({
        status: "success",
        username: req.user.username,
        data: summary // El resumen ya viene con netWorth, cash, invested y performance
      });
    } catch (error) {
      res.status(500).json({ 
        error: "Error al calcular el resumen", 
        details: error.message 
      });
    }
  }
};

module.exports = dashboardController;