const dashboardRepo = require("../repositories/dashboardRepo");

const dashboardController = {
  getSummary: async (req, res) => {
    try {
      const userId = req.user.id;
      const summary = await dashboardRepo.getFinancialSummary(userId);

      res.json({
        status: "success",
        username: req.user.username,
        data: {
          total_patrimonio: summary.netWorth.toFixed(2),
          dinero_en_cuentas: summary.cash.toFixed(2),
          dinero_invertido: summary.invested.toFixed(2),
          distribucion: {
            efectivo: ((summary.cash / summary.netWorth) * 100).toFixed(1) + "%",
            inversiones: ((summary.invested / summary.netWorth) * 100).toFixed(1) + "%"
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Error al calcular el resumen", details: error.message });
    }
  }
};

module.exports = dashboardController;