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
  async updateAccount(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const updated = await accountRepo.update(id, userId, req.body);

      if (!updated)
        return res.status(404).json({ error: "Cuenta no encontrada" });

      res.json({ message: "Cuenta actualizada con éxito", account: updated });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cuenta" });
    }
  },
 async deleteAccount(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    
    const account = await accountRepo.findByIdWithActiveInvestments(id, userId);

    if (!account) {
      return res.status(404).json({ error: "Cuenta no encontrada" });
    }

    // Regla 1: Saldo 0
    if (parseFloat(account.balance) !== 0) {
      return res.status(400).json({ 
        error: "No puedes borrar una cuenta con saldo positivo o negativo." 
      });
    }

    // Regla 2: Sin inversiones vivas
    if (account.investments && account.investments.length > 0) {
      return res.status(400).json({ 
        error: "No puedes borrar la cuenta porque tiene inversiones activas vinculadas." 
      });
    }

    // Si todo OK, borramos
    await accountRepo.delete(id, userId);
    res.json({ message: "Cuenta eliminada con éxito." });

  } catch (error) {
    res.status(500).json({ error: "Error al borrar cuenta", details: error.message });
  }
}
};

module.exports = accountController;
