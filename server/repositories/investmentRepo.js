const { Investment, Transaction, Account, sequelize } = require("../models");

module.exports = {
  async insertWithTransaction(data) {
    const t = await sequelize.transaction();
    try {
      // 1. Crear la Inversión
      const newInvestment = await Investment.create(data, { transaction: t });

      // 2. Crear el movimiento de "Gasto" en el historial
      await Transaction.create({
        amount: data.initial_amount,
        type: 'expense',
        description: `Inversión inicial en ${data.name}`,
        userId: data.userId,
        accountId: data.accountId,
        investmentId: newInvestment.id,
        date: new Date()
      }, { transaction: t });

      // 3. Restar el saldo de la cuenta
      const account = await Account.findByPk(data.accountId);
      await account.decrement('balance', { by: data.initial_amount, transaction: t });

      await t.commit();
      return newInvestment;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async getByUserId(userId) {
    return await Investment.findAll({
      where: { userId },
      include: ["account"], // Para ver de qué cuenta vino
      order: [["createdAt", "DESC"]],
    });
  },
};