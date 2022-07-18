const express = require('express');

const depositIntoAccount = require('../controllers/depositIntoAccount');
const withdrawFromAccount = require('../controllers/withdrawFromAccount');
const getBalanceFromAccount = require('../controllers/getBalanceFromAccount');

const validateJWT = require('../middlewares/validateJWT');

const accountsRoutes = express.Router();

accountsRoutes.put('/deposit', validateJWT, depositIntoAccount);
accountsRoutes.put('/withdraw', validateJWT, withdrawFromAccount);
accountsRoutes.get('/account/:id', validateJWT, getBalanceFromAccount);

module.exports = accountsRoutes;
