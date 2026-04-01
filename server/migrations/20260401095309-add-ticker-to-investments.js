"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("investments", "ticker", {
      type: Sequelize.STRING,
      allowNull: true, // Esto porque ya hay inversiones viejas
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("investments", "ticker");
  },
};
