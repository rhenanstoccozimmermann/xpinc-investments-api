const express = require('express');

const depositIntoAccount = require('../controllers/depositIntoAccount');
const withdrawFromAccount = require('../controllers/withdrawFromAccount');
const getBalanceFromAccount = require('../controllers/getBalanceFromAccount');

const accountsRoutes = express.Router();

accountsRoutes.put('/deposit', depositIntoAccount);
accountsRoutes.put('/withdraw', withdrawFromAccount);
accountsRoutes.get('/account/:id', getBalanceFromAccount);

module.exports = accountsRoutes;
