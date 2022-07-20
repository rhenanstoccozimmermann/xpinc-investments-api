'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(65, 2),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Assets');
  }
};
