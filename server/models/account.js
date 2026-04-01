"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //una cuenta pertenece a un usuario y hace varias transacciones
      this.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
      this.hasMany(models.Transaction, {
        foreignKey: "accountId",
        as: "transactions",
      });
      this.hasMany(models.Investment, {
        foreignKey: "accountId",
        as: "investments",
      });
    }
  }
  Account.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      balance: DataTypes.DECIMAL(15, 2),
      userId: DataTypes.INTEGER,
      currency: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    },
  );
  return Account;
};
