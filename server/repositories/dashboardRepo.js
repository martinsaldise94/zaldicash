const { Account, Investment } = require("../models");

module.exports = {
  async getFinancialSummary(userId) {
    const [totalCash, totalCurrentInvested, totalInitialInvested] = await Promise.all([
      Account.sum("balance", { where: { userId } }),
      Investment.sum("current_amount", { where: { userId, status: 'active' } }),
      Investment.sum("initial_amount", { where: { userId, status: 'active' } }),
    ]);

    // 1. Aseguramos que son números (importante: parseFloat)
    const cash = parseFloat(totalCash || 0);
    const invested = parseFloat(totalCurrentInvested || 0);
    const initial = parseFloat(totalInitialInvested || 0);

    // 2. Cálculos numéricos
    const netWorth = cash + invested;
    const totalProfit = invested - initial;
    const profitPercentage = initial > 0 ? (totalProfit / initial) * 100 : 0;

    // 3. Devolvemos el objeto ya formateado como strings para el JSON
    return {
      cash: cash.toFixed(2),
      invested: invested.toFixed(2),
      netWorth: netWorth.toFixed(2), // <--- Aquí es donde fallaba
      performance: {
        abs_profit: totalProfit.toFixed(2),
        relative_profit: profitPercentage.toFixed(2) + "%",
        is_positive: totalProfit >= 0
      }
    };
  },
};