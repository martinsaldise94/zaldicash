const transactionRepo = require("../repositories/transactionRepo");
const accountRepo = require("../repositories/accountRepo"); // Importamos tu repo de cuentas
const { Transaction, sequelize } = require("../models");

const transactionController = {
  getMyTransactions: async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await transactionRepo.findAllByUser(userId);
      res.json({ count: transactions.length, transactions });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener movimientos", details: error.message });
    }
  },
// funcion para introducir manualmente una cantidad
  createManual: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { amount, type, description, accountId } = req.body;
      const userId = req.user.id;

      // 1. Usamos accountRepo para validar la propiedad de la cuenta
      const account = await accountRepo.findById(accountId, userId);
      if (!account) {
        return res.status(404).json({ error: "Cuenta no encontrada" });
      }

      // 2. nuevo movimiento
      const newTx = await Transaction.create({
        amount,
        type,
        description,
        accountId,
        userId,
        date: new Date(),
      }, { transaction: t });

      // 3. Actualizar saldo usando métodos atómicos de Sequelize (esto lo he sacado de la ia)
      if (type === "income") {
        await account.increment("balance", { by: amount, transaction: t });
      } else {
        await account.decrement("balance", { by: amount, transaction: t });
      }

      await t.commit();
      res.status(201).json({ message: "Movimiento registrado con éxito", transaction: newTx });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error al procesar el movimiento", details: error.message });
    }
  },
};

module.exports = transactionController;