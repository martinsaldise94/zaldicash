"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("accounts", "currency", {
      type: Sequelize.STRING,
      defaultValue: "EUR",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("accounts", "currency");
  },
};
