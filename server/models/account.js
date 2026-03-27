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
      // define association here
    }
  }
  Account.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      balance: DataTypes.DECIMAL(15,2),
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    },
  );
  return Account;
};
