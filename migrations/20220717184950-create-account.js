'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(65, 2),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};
