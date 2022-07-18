const express = require('express');

const buyAsset = require('../controllers/buyAsset');
const sellAsset = require('../controllers/sellAsset');

const investmentsRoutes = express.Router();

investmentsRoutes.post('/buy', buyAsset);
investmentsRoutes.put('/sell', sellAsset);

module.exports = investmentsRoutes;
