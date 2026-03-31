const transactionRepo = require("../repositories/transactionRepo");

const transactionController = {
  getMyTransactions: async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await transactionRepo.findAllByUser(userId);

      res.json({
        count: transactions.length,
        transactions: transactions
      });
    } catch (error) {
      res.status(500).json({ 
        error: "Error al obtener el historial de movimientos",
        details: error.message 
      });
    }
  }
};

module.exports = transactionController;