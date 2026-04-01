const { Investment, Transaction, Account, sequelize, Sequelize } = require("../models");
const { Op } = Sequelize; 
const priceService = require("../services/priceServices");

module.exports = {
  // 1. FUNCIÓN DE INSERTAR
  async insertWithTransaction(data) {
    const t = await sequelize.transaction();
    try {
      const newInvestment = await Investment.create(data, { transaction: t });

      await Transaction.create(
        {
          amount: data.initial_amount,
          type: "expense",
          description: `Inversión inicial en ${data.name}`,
          userId: data.userId,
          accountId: data.accountId,
          investmentId: newInvestment.id,
          date: new Date(),
        },
        { transaction: t },
      );

      const account = await Account.findByPk(data.accountId);
      await account.decrement("balance", {
        by: data.initial_amount,
        transaction: t,
      });

      await t.commit();
      return newInvestment;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  // 2. FUNCIÓN DE LISTAR
  async getByUserId(userId) {
    return await Investment.findAll({
      where: { userId },
      include: ["account"],
      order: [["createdAt", "DESC"]],
    });
  },

  // 3. FUNCIÓN DE REFRESCAR (La nueva)
  async updateLivePrices(userId) {
  const investments = await Investment.findAll({
    where: {
      userId,
      status: "active",
      ticker: { [Op.ne]: null },
    },
  });

  const results = [];
  for (const inv of investments) {
    const data = await priceService.getLivePrice(inv.ticker);
    
    if (data && data.price) {
      // LÓGICA CLAVE: Multiplicamos el precio por la cantidad
      // Usamos parseFloat para asegurar que son números
      const quantity = parseFloat(inv.quantity || 0);
      const marketPrice = parseFloat(data.price);
      const newCurrentAmount = quantity * marketPrice;

      // Actualizamos el registro con el valor total de la posición
      await inv.update({ current_amount: newCurrentAmount });

      results.push({
        name: inv.name,
        ticker: inv.ticker,
        precio_unidad: marketPrice.toFixed(2),
        cantidad: quantity,
        valor_total: newCurrentAmount.toFixed(2),
      });
    }
  }
  return results;
},
}; // <--- IMPORTANTE: Todo debe estar dentro de estas llaves
