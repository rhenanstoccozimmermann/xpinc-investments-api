'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('Assets',
    [
      {
        ticker: 'BLAU3',
        quantity: 100,
        price: 24.53,
      },
      {
        ticker: 'BTLG11',
        quantity: 100,
        price: 97.95,
      },
      {
        ticker: 'IVVB11',
        quantity: 100,
        price: 233.95,
      },
      {
        ticker: 'BBAS3',
        quantity: 100,
        price: 34.70,
      },
      {
        ticker: 'PVBI11',
        quantity: 100,
        price: 91.99,
      },
      {
        ticker: 'VGIP11',
        quantity: 100,
        price: 95.91,
      },
      {
        ticker: 'ENBR3',
        quantity: 100,
        price: 20.92,
      },
      {
        ticker: 'RBRP11',
        quantity: 100,
        price: 52.40,
      },
      {
        ticker: 'HGRU11',
        quantity: 100,
        price: 118.50,
      },
      {
        ticker: 'IMAB11',
        quantity: 100,
        price: 81.79,
      },      
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Assets', null, {}),
};
