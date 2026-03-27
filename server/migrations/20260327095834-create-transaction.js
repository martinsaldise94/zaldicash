"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true, // No siempre pondremos descirpcion de la transacción
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW // La actual
      },
      type: {
        type: Sequelize.ENUM("income","expense","transfer"),
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
        allowNull: false
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable("Transactions");
  },
};
