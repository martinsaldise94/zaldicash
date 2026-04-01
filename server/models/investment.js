"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // una inversión pertenece a un usuario
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      //no se si esta es necesaria
      this.hasMany(models.Transaction, {
        foreignKey: "investmentId",
        as: "transactions",
      });
      this.belongsTo(models.Account, {
        foreignKey: "accountId",
        as: "account",
      });
    }
  }
  Investment.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      ticker: DataTypes.STRING,
      initial_amount: DataTypes.DECIMAL,
      current_amount: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Investment",
      tableName: "investments",
    },
  );
  return Investment;
};
