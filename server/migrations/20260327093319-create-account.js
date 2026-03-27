"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // aquí irá tipo binance y tal...
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false // si es cripto, banco, acciones...
      },
      balance: {
        type: Sequelize.DECIMAL(15,2),
        defaultValue: 0.00
      },
      userId: {  //IMPORTANTE. UNE EL USUARIO CON SUS CUENTAS
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
