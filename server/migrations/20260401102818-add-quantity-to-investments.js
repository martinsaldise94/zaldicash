'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // En la migración
await queryInterface.addColumn("investments", "quantity", {
  type: Sequelize.DECIMAL(16, 8), // Muchos decimales para criptos (0.0001 BTC)
  allowNull: true,
});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("investments", "quantity");
  }
};
