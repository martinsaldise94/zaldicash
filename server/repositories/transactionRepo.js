const { Transaction, Account, Investment } = require("../models");

module.exports = {
  // Obtener todas las transacciones de un usuario
  async findAllByUser(userId) {
    return await Transaction.findAll({
      where: { userId },
      include: [
        { model: Account, as: 'account', attributes: ['name', 'type'] },
        { model: Investment, as: 'investment', attributes: ['name', 'category'] }
      ],
      order: [['date', 'DESC']]
    });
  },

  // Obtener transacciones de una cuenta específica 
  async findByAccount(accountId, userId) {
    return await Transaction.findAll({
      where: { accountId, userId },
      order: [['date', 'DESC']]
    });
  }
};