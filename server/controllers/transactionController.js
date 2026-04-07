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
        const { amount, type, description, accountId, toAccountId } = req.body;
        const userId = req.user.id;

        //  Validar cuenta origen
        const account = await accountRepo.findById(accountId, userId);
        if (!account) return res.status(404).json({ error: "Cuenta origen no encontrada" });

        //  Lógica según el tipo
        if (type === "transfer") {
            if (!toAccountId) return res.status(400).json({ error: "Falta la cuenta destino para la transferencia" });
            
            const destinationAccount = await accountRepo.findById(toAccountId, userId);
            if (!destinationAccount) return res.status(404).json({ error: "Cuenta destino no encontrada" });

            // Restamos de origen, sumamos en destino
            await account.decrement("balance", { by: amount, transaction: t });
            await destinationAccount.increment("balance", { by: amount, transaction: t });

            // Registramos el movimiento
            await Transaction.create({
                amount, type, description: description || `Transferencia a ${destinationAccount.name}`,
                accountId, userId, date: new Date()
            }, { transaction: t });

        } else if (type === "income") {
            await account.increment("balance", { by: amount, transaction: t });
            await Transaction.create({ amount, type, description, accountId, userId, date: new Date() }, { transaction: t });
        } else if (type === "expense") {
            await account.decrement("balance", { by: amount, transaction: t });
            await Transaction.create({ amount, type, description, accountId, userId, date: new Date() }, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ message: "Operación realizada con éxito" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: "Error al procesar el movimiento", details: error.message });
    }
}
};

module.exports = transactionController;