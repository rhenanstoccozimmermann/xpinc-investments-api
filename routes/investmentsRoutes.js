const express = require('express');

const buyAsset = require('../controllers/buyAsset');
const sellAsset = require('../controllers/sellAsset');

const validateJWT = require('../middlewares/validateJWT');

const investmentsRoutes = express.Router();

investmentsRoutes.post('/buy', validateJWT, buyAsset);
investmentsRoutes.put('/sell', validateJWT, sellAsset);

module.exports = investmentsRoutes;
