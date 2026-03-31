"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transactions", "investmentId", {
      type: Sequelize.INTEGER,
      references: { model: "investments", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    async (queryInterface) => {
      await queryInterface.removeColumn("transactions", "investmentId");
    };
  },
};
