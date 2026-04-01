const { Account, Investment } = require("../models");

module.exports = {
  async getFinancialSummary(userId) {
    const [totalCash, totalInvested] = await Promise.all([
      Account.sum("balance", { where: { userId } }),
      Investment.sum("current_amount", { where: { userId } }),
    ]);

    const cash = parseFloat(totalCash) || 0;
    const invested = parseFloat(totalInvested) || 0;

    return {
      cash,
      invested,
      netWorth: cash + invested,
    };
  },
};
