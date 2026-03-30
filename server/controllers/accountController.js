const accountRepo = require("../repositories/accountRepo");

const accountController = {
  async insert(req, res) {
    try {
      const { name, type, balance } = req.body;
      const userId = req.user.id; // Del token

      const newAccount = await accountRepo.insert({
        name,
        type,
        balance: balance || 0.0,
        userId,
      });

      res
        .status(201)
        .json({ message: "Cuenta generada con éxito", account: newAccount });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear la cuenta", detail: error.message });
    }
  },

  async getMyAccounts(req, res) {
    try {
      const accounts = await accountRepo.findAllByUser(req.user.id);
      res.json({ count: accounts.length, accounts: accounts });
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener las cuentas",
        details: error.message,
      });
    }
  },
};

module.exports = accountController;
