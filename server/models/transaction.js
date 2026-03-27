"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // una transacción a un usuario y a una cuenta en concretoo
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Account, {
        foreignKey: "accountId",
        as: "account",
      });
    }
  }
  Transaction.init(
    {
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      date: DataTypes.DATE,
      type: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
