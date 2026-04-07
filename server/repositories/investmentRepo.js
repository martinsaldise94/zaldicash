const {
  Investment,
  Transaction,
  Account,
  sequelize,
  Sequelize,
} = require("../models");
const { Op } = Sequelize;
const priceService = require("../services/priceServices");

module.exports = {
  //  FUNCIÓN DE INSERTAR
  async insertWithTransaction(data) {
  const t = await sequelize.transaction();
  try {
    const { accountId, initial_amount, name, userId } = data;

    // Buscamos la cuenta para validar saldo 
    const account = await Account.findByPk(accountId, { transaction: t });
    if (!account) throw new Error("Cuenta no encontrada");

    // VALIDACIÓN DE SALDO
    const currentBalance = parseFloat(account.balance);
    const cost = parseFloat(initial_amount);

    if (currentBalance < cost) {
      throw new Error(`Saldo insuficiente: Tienes ${currentBalance}€ y la inversión requiere ${cost}€`);
    }

    //  Crear la inversión
    const newInvestment = await Investment.create(data, { transaction: t });

    //  Crear el movimiento en el historial (Gasto)
    await Transaction.create({
      amount: cost,
      type: "expense",
      description: `Inversión inicial en ${name}`,
      userId: userId,
      accountId: accountId,
      investmentId: newInvestment.id, // Enlazamos para el historial
      date: new Date(),
    }, { transaction: t });

    // Restar el dinero de la cuenta
    await account.decrement("balance", {
      by: cost,
      transaction: t,
    });

    await t.commit();
    return newInvestment;
  } catch (error) {
    await t.rollback();
    throw error;
  }
},

  //  FUNCIÓN DE LISTAR
  async getByUserId(userId, status = null) {
    const whereClause = { userId };
    if (status) {
      whereClause.status = status; // Ej: 'active' o 'closed'
    }

    const investments = await Investment.findAll({
      where: whereClause,
      include: ["account"],
      order: [["createdAt", "DESC"]],
    });

    return investments.map((inv) => {
      const current = parseFloat(inv.current_amount) || 0;
      const initial = parseFloat(inv.initial_amount) || 0;
      const profit = current - initial;
      const pct = initial > 0 ? (profit / initial) * 100 : 0;

      return {
        ...inv.toJSON(),
        profit: profit.toFixed(2),
        profit_percentage: pct.toFixed(2),
      };
    });
  },

  //  FUNCIÓN DE REFRESCAR
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
        const initial = parseFloat(inv.initial_amount);
        const profit = newCurrentAmount - initial;

        results.push({
          name: inv.name,
          ticker: inv.ticker,
          precio_unidad: marketPrice.toFixed(2),
          cantidad: quantity,
          valor_total: newCurrentAmount.toFixed(2),
          ganancia: profit.toFixed(2),
        });
      }
    }
    return results;
  },
  //vender
  async sell(investmentId, userId) {
    const t = await sequelize.transaction();
    try {
      const inv = await Investment.findOne({
        where: { id: investmentId, userId, status: "active" },
        include: ["account"],
      });

      if (!inv) throw new Error("Inversión no encontrada o ya cerrada");

      const sellAmount = parseFloat(inv.current_amount);

      //  Devolver el dinero a la cuenta vinculada
      await Account.increment("balance", {
        by: sellAmount,
        where: { id: inv.accountId },
        transaction: t,
      });

      //  Crear la transacción de historial
      await Transaction.create(
        {
          amount: sellAmount,
          type: "income",
          description: `Venta total de ${inv.name} (Cierre de posición)`,
          userId,
          accountId: inv.accountId,
          investmentId: inv.id,
          date: new Date(),
        },
        { transaction: t },
      );

      //  Marcar inversión como cerrada
      inv.status = "closed";

      await inv.save({ transaction: t });

      await t.commit();
      return inv;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
